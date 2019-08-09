import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "0",
      displayResult: "0",
      previousButton: "",
    };
  }

  reset = () => {
    this.setState({
      result: "0",
      displayResult: "0"
    });
  }

  calculate = () => {
    var checkResult = "";
    if(this.state.result.includes('--')){
      checkResult = this.state.result.replace('--','+')
    }
    else {
      checkResult = this.state.result
    }
    try {
      this.setState({result: (eval(checkResult) || "" ) + ""}, function () {
        this.setState({displayResult: this.state.result});
      })
    }
    catch (e) {
      this.setState({result: "error"})
    }
  };

  onButtonPress = (val) => {
    if (val === this.state.previousButton && isNaN(this.state.previousButton)){
      return;
    }
    if(val === "="){
      this.calculate()
    }
    else if(val === "AC"){
      this.reset()
    }
    else {
      if (this.state.result === "0"){
        this.setState({result: val})
      }
      else {
        this.setState({result: this.state.result + val})
      }
    }
    this.setState({previousButton: val});
  };



  render(){
    return (
      <View style={styles.intialContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{this.state.displayResult}</Text>
        </View>
        <View style={styles.equationContainer}>
          <View style={styles.ac} >
            <Button color="#fff" title="AC" onPress={()=>this.onButtonPress("AC")}></Button>
          </View>
          <View style={styles.equation} >
            <Text style={styles.equationText}>{this.state.result}</Text>
          </View>
        </View>
        <View style={styles.operationsContainer}>
          <TouchableOpacity style={styles.operation} onPress={() => this.onButtonPress('+')}>
            <Text style={styles.operationText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => this.onButtonPress('-')}>
            <Text style={styles.operationText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => this.onButtonPress('*')}>
            <Text style={styles.operationText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => this.onButtonPress('/')}>
            <Text style={styles.operationText}>÷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberContainer}>
          <View style={styles.numberContainerRow}>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("7")}>
              <Text style={styles.numberText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("8")}>
              <Text style={styles.numberText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("9")}>
              <Text style={styles.numberText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberContainerRow}>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("4")}>
              <Text style={styles.numberText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("5")}>
              <Text style={styles.numberText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("6")}>
              <Text style={styles.numberText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberContainerRow}>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("1")}>
              <Text style={styles.numberText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("2")}>
              <Text style={styles.numberText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => this.onButtonPress("3")}>
              <Text style={styles.numberText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberContainerRow}>
            <TouchableOpacity style={styles.numberBottom} onPress={() => this.onButtonPress("0")}>
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numberBottom} onPress={() => this.onButtonPress(".")}>
              <Text style={styles.numberText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numberBottom} onPress={() => this.onButtonPress("=")}>
              <Text style={styles.numberText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  intialContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
  resultContainer: {
    flex: .35,
    flexDirection: 'row',
    backgroundColor: '#0e1111',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#fff',
  },
  result:{
    marginRight: 10,
    color: '#fff',
    fontSize: 30
  },
  equationContainer: {
    flex: .2,
    flexDirection: 'row',
    backgroundColor: '#232b2b',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  ac:{
    marginLeft: 10
  },
  equation:{
    marginRight: 10
  },
  equationText:{
    color: '#fff',
  },
  operationsContainer: {
    flex: .25,
    flexDirection: 'row',
  },
  operation: {
    flex: 1,
    backgroundColor: '#0e1111',
    borderWidth: 0.5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
  },
  operationText: {
    color: '#fff',
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
    backgroundColor: '#232b2b',
    borderWidth: 0.5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
  },
  numberText: {
    color: '#fff',
    fontSize: 18
  },
  numberBottom: {
    flex: 1,
    backgroundColor: '#232b2b',
    borderWidth: 0.5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    borderBottomWidth: 1
  }
});
