import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';

import { Text, View, TouchableHighlight } from '../components/Themed';
import { useTheme } from '@react-navigation/native';
import Colors from "../constants/Colors"
import resp from "rn-responsive-font";

import info from "../assets/images/info.png"
import RBSheet from "react-native-raw-bottom-sheet";
import stringMath from "string-math";
import Settings from "./Settings"

const Calculator = () => {
  const refRBSheet = useRef(null);
  const [result, setResult] = useState("0");
  const [previousButton, setPreviousButton] = useState("");
  const [viewHeight, setViewHeight] = useState(0)
  const [textHeight, setTextHeight] = useState(0)
  const [fontSize, setFontSize] = useState(50)
  const {dark} = useTheme();
  const color = dark ? "dark" : "light";
  const {background1, background2, borderColor, text} = Colors[color];

  useEffect(() => {
    if (textHeight >= viewHeight) {
      setFontSize(fontSize - 1)
    }
  }, [textHeight])

  const reset = (): void => {
    setResult("0")
    setPreviousButton("")
    setFontSize(50)
    setIsCalculated(false)
  }

  const calculate = (): void => {
    var checkResult = "";
    if(result.includes('--')){
      checkResult = result.replace('--','+')
    }
    else {
      checkResult = result
    }
    let evalutedStr = "";
    try {
      evalutedStr = stringMath(checkResult)
    } catch (e) {
      evalutedStr = "Error"
    }
    setResult(evalutedStr)
  };

  const onButtonPress = (val: string): void => {
    if(val === "AC"){
      return reset()
    }
    else if (val === previousButton && isNaN(previousButton) && (val !== "(" && val !== ")")){
      return;
    }
    else if(val === "="){
      setIsCalculated(true)
      calculate()
    }
    else if (result === "Error") return;
    else if (val === "←" && previousButton !== "="){
      setResult(result.slice(0, -1))
    }
    else {
      if (result === "0"){
        setResult(val)
      }
      else {
        setResult(result + val)
      }
    }
    setPreviousButton(val)
  };

  return (
    <SafeAreaView style={styles.intialContainer}>
      <View style={[styles.equationContainer, {backgroundColor: background1, borderColor}]}>
        <View style={styles.info} >
          <TouchableOpacity onPress={() => refRBSheet?.current?.open()}>
            <Image source={info} style={{width:24, height: 24, tintColor: text}}/>
          </TouchableOpacity>
        </View>
        <View 
          style={styles.equation} 
          onLayout={(event) => {
            var {height } = event.nativeEvent.layout;
            setViewHeight(height)
          }}  
        >
          <Text 
            style={[styles.equationText, {fontSize: resp(fontSize)}]}
            onLayout={(event) => {
              var {height } = event.nativeEvent.layout;
              setTextHeight(height)
            }}
          >{result}</Text>
        </View>
      </View>
      <View style={[styles.buttonContainer, styles.bottomLeft, styles.bottomRight, {backgroundColor: background2}]}>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{width:'100%'}}>
            <View style={[styles.buttonContainerRow, {borderColor}]}>
              <TouchableHighlight style={[styles.button, {borderColor}]} onPress={() => onButtonPress('%')}>
                <Text style={styles.buttonText}>%</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button, {borderColor}]} onPress={() => onButtonPress('(')}>
                <Text style={styles.buttonText}>(</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button, {borderColor}]} onPress={() => onButtonPress(')')}>
                <Text style={styles.buttonText}>)</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("/")}>
                <Text style={styles.buttonText}>÷</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.buttonContainerRow, {borderColor}]}>
              <TouchableHighlight style={[styles.button,{borderColor}]} onPress={() => onButtonPress("7")}>
                <Text style={styles.buttonText}>7</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("8")}>
                <Text style={styles.buttonText}>8</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("9")}>
                <Text style={styles.buttonText}>9</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("*")}>
                <Text style={styles.buttonText}>×</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.buttonContainerRow, {borderColor}]}>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("4")}>
                <Text style={styles.buttonText}>4</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("5")}>
                <Text style={styles.buttonText}>5</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("6")}>
                <Text style={styles.buttonText}>6</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("-")}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.buttonContainerRow, {borderColor}]}>
              <TouchableHighlight style={[styles.button,{borderColor}]} onPress={() => onButtonPress("1")}>
                <Text style={styles.buttonText}>1</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("2")}>
                <Text style={styles.buttonText}>2</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("3")}>
                <Text style={styles.buttonText}>3</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("+")}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.buttonContainerRow,styles.bottomLeft, styles.bottomRight, {borderColor}]}>
              <TouchableHighlight style={[styles.button, {borderColor}]}  onPress={() => onButtonPress("AC")}>
                <Text style={styles.buttonText}>AC</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress("0")}>
                <Text style={styles.buttonText}>0</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button,{borderColor}]}  onPress={() => onButtonPress(".")}>
                <Text style={styles.buttonText}>.</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.buttonBottom, {borderColor}]}  onPress={() => onButtonPress("=")}>
                <Text style={styles.buttonText}>=</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask
        dragFromTopOnly
        height={Dimensions.get('window').height*.88}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor:background2
          },
          draggableIcon: {
            backgroundColor: background2,
            height: 0,
            padding: 0,
            margin: 0,
            flex: 0,
          }
        }}
      >
        <Settings close={()=> refRBSheet?.current?.close()}/>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  intialContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  result:{
    marginRight: 10,
    fontSize: 30,
  },
  equationContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: .3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  info:{
    width: "15%",
    height: '100%',
    left: 10,
    top: 10
  },
  equation:{
    width: "85%",
    marginRight: 10,
    justifyContent:'flex-end',
    flex: 1, 
    flexDirection:'row',
    height:'100%',
    flexWrap:'wrap',
  },
  equationText:{
    textAlign:'right',
    // flexWrap:'wrap',
    
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainerRow: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: 0,
  },
  
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: .5,
  },
  buttonRight: {
    borderRightWidth: 1,
    borderBottomWidth: .5,
  },
  buttonText: {
    fontSize: 18
  },
  buttonBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeft: {
    borderBottomLeftRadius: 20,
    backgroundColor:'transparent'
  },
  bottomRight: {
    borderBottomRightRadius: 20,
    backgroundColor:'transparent', 
    borderBottomWidth: .5,
    borderRightWidth: .5
  },
});

export default Calculator;