import React, {Fragment } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import Calculator from './components';

export default class App extends React.Component {
  render(){
    return (
      <Fragment>
        <SafeAreaView style={styles.top}/>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <Calculator/>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top:{
    flex: 0,
    backgroundColor: '#0e1111',
  }
});
