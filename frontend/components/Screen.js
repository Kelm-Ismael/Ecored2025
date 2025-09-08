// components/Screen.js
import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { colors } from '../styles/styles';

export default function Screen({ children, scroll = true, style, contentContainerStyle }) {
  const Container = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <Container
          style={[{ flex: 1, backgroundColor: colors.background }, style]}
          contentContainerStyle={scroll ? [{ padding: 16, gap: 12 }, contentContainerStyle] : undefined}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
