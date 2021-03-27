import React from 'react'
import { WebView } from 'react-native-webview'
import { Button } from 'react-native'
import { View } from '../components/Themed'

const WebViewer = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}): JSX.Element => {
  const { uri } = route.params
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 25 }}>
        <View style={{ position: 'absolute', top: 5, left: 15, zIndex: 20 }}>
          <Button
            title="Back"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </View>
      <WebView
        scalesPageToFit={false}
        source={{
          uri,
        }}
      />
    </View>
  )
}

export default WebViewer
