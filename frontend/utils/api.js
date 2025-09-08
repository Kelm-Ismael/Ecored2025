// utils/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAN_IP = '192.168.0.7';      // ← cambia a tu IP LAN: ej '192.168.0.7'
export const BASE_URL = `http://${LAN_IP}:3000`;

async function authHeaders(extra = {}) {
  const token = await AsyncStorage.getItem('token');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extra };
}

export async function apiGet(path){ const h=await authHeaders(); const r=await fetch(`${BASE_URL}${path}`,{headers:h}); const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||`GET ${path} falló`); return d; }
export async function apiPost(path, body){ const h=await authHeaders(); const r=await fetch(`${BASE_URL}${path}`,{method:'POST',headers:h,body:JSON.stringify(body)}); const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||`POST ${path} falló`); return d; }
export async function apiPut(path, body){ const h=await authHeaders(); const r=await fetch(`${BASE_URL}${path}`,{method:'PUT',headers:h,body:JSON.stringify(body)}); const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||`PUT ${path} falló`); return d; }
export async function apiUpload(path, formData){ const token=await AsyncStorage.getItem('token'); const r=await fetch(`${BASE_URL}${path}`,{method:'PUT',headers:{...(token?{Authorization:`Bearer ${token}`}:{})},body:formData}); const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||`UPLOAD ${path} falló`); return d; }
