import React, { useLayoutEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native';
import { Icon 
 } from 'native-base';
import { Text, View } from '../components/Themed';

export default function WebViewer({ navigation, route }) {
  const {uri} = route.params;
  return (
    <View style={{flex: 1}}>
      <View style={{padding: 25}}>
        <View style={{position:'absolute', top: 5, left: 15, zIndex: 20}}>
          <Button title="Back" onPress={()=> navigation.navigate("Settings")}></Button>
        </View>
      </View>
      <WebView
        scalesPageToFit={false}
        source={{
          uri
        }}
      />
    </View>
  );
}
