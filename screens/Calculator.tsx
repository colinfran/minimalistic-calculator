import React, {useState} from 'react';
import { StyleSheet, Button, SafeAreaView } from 'react-native';

import { Text, View, TouchableHighlight } from '../components/Themed';
import { useTheme } from '@react-navigation/native';
import Colors from "../constants/Colors"

const Calculator = () => {
  const [result, setResult] = useState("0");
  const [displayResult, setDisplayResult] = useState("0");
  const [previousButton, setPreviousButton] = useState("");

  const {dark} = useTheme();
  const color = dark ? "dark" : "light";
  const {background1, background2, borderColor} = Colors[color];

  const reset = () => {
    setResult("0")
    setDisplayResult("0")
    setPreviousButton("")
  }

  const calculate = () => {
    var checkResult = "";
    if(result.includes('--')){
      checkResult = result.replace('--','+')
    }
    else {
      checkResult = result
    }
    let evalutedStr = "";
    try {
      evalutedStr = (eval(checkResult) || "" ) + ""
    } catch (e) {
      evalutedStr = "Error"
    }
    setResult(evalutedStr)
    setDisplayResult(evalutedStr)
  };

  const onButtonPress = (val: string) => {
    if (val === previousButton && isNaN(Number(previousButton))){
      return;
    }
    if(val === "="){
      calculate()
    }
    else if(val === "AC"){
      reset()
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
      <View style={[styles.equationContainer, {backgroundColor: background2, borderColor}]}>
        <View style={styles.ac} >
          <Button title="AC" onPress={() => onButtonPress("AC")}></Button>
        </View>
        <View style={styles.equation} >
          <Text style={styles.equationText}>{result}</Text>
        </View>
      </View>
      <View style={[styles.operationsContainer, {backgroundColor: background1}]}>
        <TouchableHighlight style={[styles.operation, {borderColor}]} onPress={() => onButtonPress('+')}>
          <Text style={styles.operationText}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.operation, {borderColor}]} onPress={() => onButtonPress('-')}>
          <Text style={styles.operationText}>-</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.operation, {borderColor}]} onPress={() => onButtonPress('*')}>
          <Text style={styles.operationText}>×</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.operation, {borderColor}]} onPress={() => onButtonPress('/')}>
          <Text style={styles.operationText}>÷</Text>
        </TouchableHighlight>
      </View>
      <View style={[styles.numberContainer, {backgroundColor: background2}]}>
        <View style={styles.numberContainerRow}>
          <TouchableHighlight style={[styles.number,{borderColor}]} onPress={() => onButtonPress("7")}>
            <Text style={styles.numberText}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.number,{borderColor}]}  onPress={() => onButtonPress("8")}>
            <Text style={styles.numberText}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.number,{borderColor}]}  onPress={() => onButtonPress("9")}>
            <Text style={styles.numberText}>9</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.numberContainerRow}>
          <TouchableHighlight style={[styles.number,{borderColor}]}  onPress={() => onButtonPress("4")}>
            <Text style={styles.numberText}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.number,{borderColor}]}  onPress={() => onButtonPress("5")}>
            <Text style={styles.numberText}>5</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.number,{borderColor}]}  onPress={() => onButtonPress("6")}>
            <Text style={styles.numberText}>6</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.numberContainerRow}>
          <TouchableHighlight style={[styles.number,{borderColor}]} onPress={() => onButtonPress("1")}>
            <Text style={styles.numberText}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.number,{borderColor}]}  onPress={() => onButtonPress("2")}>
            <Text style={styles.numberText}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.number,{borderColor}]}  onPress={() => onButtonPress("3")}>
            <Text style={styles.numberText}>3</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.numberContainerRow}>
          <TouchableHighlight style={[styles.numberBottom,{borderColor}]}  onPress={() => onButtonPress("0")}>
            <Text style={styles.numberText}>0</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.numberBottom,{borderColor}]}  onPress={() => onButtonPress(".")}>
            <Text style={styles.numberText}>.</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.numberBottom,{borderColor}]}  onPress={() => onButtonPress("=")}>
            <Text style={styles.numberText}>=</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  intialContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  resultContainer: {
  },
  result:{
    marginRight: 10,
    fontSize: 30,
  },
  equationContainer: {
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  ac:{
    marginLeft: 10,
    backgroundColor:'transparent'
  },
  equation:{
    marginRight: 10,
    backgroundColor:'transparent'
  },
  equationText:{
    backgroundColor:'transparent'

  },
  operationsContainer: {
    flex: .25,
    flexDirection: 'row',
  },
  operation: {
    flex: 1,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationText: {
    fontSize: 18
  },
  numberContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  numberContainerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  number: {
    flex: 1,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 18
  },
  numberBottom: {
    flex: 1,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1
  }
});

export default Calculator;