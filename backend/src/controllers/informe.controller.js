import { 
    informeEntregasPorFechas
} from "../models/informe.model.js";
import PDFDocument from 'pdfkit';

export async function getEntregasPorFecha(req, res) {
    try {
        const { fecha_inicio, fecha_fin } = req.body;

        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ error: 'Fechas no enviadas al servidor.' });
        }

        // console.log('📥 Fechas recibidas:', fecha_inicio, fecha_fin);
        const entregas = await informeEntregasPorFechas(fecha_inicio, fecha_fin);

        res.json(entregas);
    } catch (err) {
        console.error('Error al obtener entregas:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function descargarPDFEntregasPorFecha(req, res) {
    try {
        const { fecha_inicio, fecha_fin } = req.body;

        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ error: 'Fechas no enviadas al servidor.' });
        }

        const entregas = await informeEntregasPorFechas(fecha_inicio, fecha_fin);

        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        let buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);

            const fechaInicioStr = new Date(fecha_inicio).toISOString().split('T')[0];
            const fechaFinStr = new Date(fecha_fin).toISOString().split('T')[0];
            const filename = `informe_entregas(${fechaInicioStr}_${fechaFinStr}).pdf`;

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(pdfData);
        });

        // Título
        doc.fontSize(18).text('Informe de Entregas', { align: 'center' });

        // Subtítulo con las fechas
        const fechaInicioFormat = new Date(fecha_inicio).toLocaleDateString('es-AR');
        const fechaFinFormat = new Date(fecha_fin).toLocaleDateString('es-AR');
        doc.moveDown(0.5);
        doc.fontSize(12).text(`Desde: ${fechaInicioFormat} hasta: ${fechaFinFormat}`, { align: 'center' });

        doc.moveDown(1.5);

        // Tabla
        const headers = ['ID', 'Locación', 'Tipo', 'Fecha', 'Usuario', 'Receptor'];
        const columnWidths = [30, 100, 80, 120, 100, 100];
        const rowHeight = 20;
        const tableTop = doc.y;
        const startX = doc.x;

        // Dibujar cabecera
        headers.forEach((header, i) => {
            const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
            doc
                .font('Helvetica-Bold')
                .fontSize(10)
                .text(header, x + 2, tableTop + 5, { width: columnWidths[i] - 4, align: 'left' });

            // Línea de borde cabecera
            doc.rect(x, tableTop, columnWidths[i], rowHeight).stroke();
        });

        let y = tableTop + rowHeight;

        // Dibujar filas
        entregas.forEach((entrega, index) => {
            const fechaFormateada = new Date(entrega.fecha_hora).toLocaleString('es-AR');

            const values = [
                entrega.id,
                entrega.locacion || entrega.nombre_locacion || entrega.id_locacion || '—',
                entrega.tipo || '',
                fechaFormateada,
                entrega.nombre_usuario || '',
                entrega.nombre_receptor || '',
            ];

            values.forEach((value, i) => {
                const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
                doc
                    .font('Helvetica')
                    .fontSize(9)
                    .text(value.toString(), x + 2, y + 5, {
                        width: columnWidths[i] - 4,
                        align: 'left',
                    });

                doc.rect(x, y, columnWidths[i], rowHeight).stroke(); // Dibujar borde de celda
            });

            y += rowHeight;

            // Salto de página si es necesario
            if (y + rowHeight > doc.page.height - 50) {
                doc.addPage();
                y = doc.y;
            }
        });

        // Total de entregas
        doc.moveTo(startX, y + 10);
        doc.fontSize(12).font('Helvetica-Bold').text(`Total de entregas: ${entregas.length}`, startX, y + 10);

        doc.end();
    } catch (err) {
        console.error('Error al generar PDF:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
