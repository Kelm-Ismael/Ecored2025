import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import WebLogin from '../screens/webLogin.js';
import WebStack from '../navigation/webStack.js';
import { AuthContext } from '../context/AuthContext.js';

export default function WebAuthWrapper() {
  const { loading, userToken } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return userToken ? <WebStack /> : <WebLogin />;
}
