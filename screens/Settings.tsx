import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions, Button } from 'react-native';
import { Text, View, TouchableHighlight } from '../components/Themed';
import Colors from "../constants/Colors"
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import WebViewer from "./WebViewer"
const SettingsList = ({navigation, close}) => {
  const {dark} = useTheme();
  const color = dark ? "light" : "dark";
  const {background1, background2, borderColor, text} = Colors[color];
  return(
    <View style={{flex: 1}}>
      <View style={{position:'absolute', top: 5, right: 15, zIndex: 20}}>
        <Button title="Close" onPress={close}></Button>
      </View>
      <View style={{padding: 40, marginTop: 30}}>
        <View style={{backgroundColor: "#fff", borderRadius: 10, }}>
          <TouchableOpacity activeOpacity={.1} style={{flexDirection:'row'}} onPress={()=>navigation.navigate("WebView", {uri: "https://docs.google.com/forms/d/e/1FAIpQLSfe9zudYw7BSy_HBjyx3DZMiSDQTmgHN73NWvd1zLeOqc6WDw/viewform?usp=sf_link"})}>
            <View style={{width: "20%", justifyContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons name="star-circle-outline" size={24} color="black" />
            </View>
            <View style={{width: "80%",}}>
              <View style={{paddingTop: 20, paddingBottom: 20, borderBottomWidth: .8}}>
                <Text style={{color:'#000'}}>Rate this app</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.1} style={{flexDirection:'row'}} onPress={()=>navigation.navigate("WebView", {uri: "https://colinfran.github.io/calculator-for-minimalists/license.html"})}>
            <View style={{width: "20%", justifyContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons name="copyright" size={24} color="black" />
            </View>
            <View style={{width: "80%",}}>
              <View style={{paddingTop: 20, paddingBottom: 20, borderBottomWidth: .8}}>
                <Text style={{color:'#000'}}>License</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.1} style={{flexDirection:'row'}} onPress={()=>navigation.navigate("WebView", {uri: "https://colinfran.github.io/calculator-for-minimalists/privacy-policy.html"})}>
            <View style={{width: "20%", justifyContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
            </View>
            <View style={{width: "80%"}}>
              <View style={{paddingTop: 20, paddingBottom: 20,  }}>
                <Text style={{color:'#000'}}>Privacy Policy</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{padding: 40, paddingTop: 10}}>
        <View style={{backgroundColor:"#fff", borderRadius: 10, padding: 50, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:12, color:'#000'}}>Designed, developed, and built</Text>
          <Text style={{fontSize:12, color:'#000'}}>by Colin Franceschini</Text>
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator()

const Settings = ({close}) =>{
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Settings'>
          {props => <SettingsList close={close} {...props}/>}
        </Stack.Screen>
        <Stack.Screen name='WebView'>
          {props => <WebViewer {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Settings;