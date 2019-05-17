import React, { Component } from 'react'
import { View, Text, TextInput, Picker, StyleSheet } from 'react-native'
// import console = require('console')

export default class MortgageInfoInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 100000,
      rate: 4,
      period: 30,
      taxes: ''
    }
  }

  getMonthlyPayment() {
    console.warn('getMonthlyPayment', this.state)
    if (this.state.rate !== '' && !isNaN(this.state.rate) &&
        this.state.period !== '' && !isNaN(this.state.period) &&
        this.state.amount !== '' && !isNaN(this.state.amount)) {
      const rate = this.state.rate / 1200
      const numMonthlyPayments = this.state.period * 12
      const principal = this.state.amount

      let monthlyPayment = (rate * principal * Math.pow(1 + rate, numMonthlyPayments)) / (Math.pow(1 + rate, numMonthlyPayments) - 1)
      if (this.state.taxes !== '') {
        monthlyPayment += (this.state.taxes / 12)
      }

      monthlyPayment = Math.round(monthlyPayment * 100) / 100

      return monthlyPayment
    }
    
    return ''
  }

  numCharAfterDecimal = number => {
    const locationOfDecimal = number.indexOf('.')
    return locationOfDecimal === -1 ? 0 : number.length - 1 - number.indexOf('.')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.monthlyPayment}>
          <Text style={{ fontSize: 20, margin: 10 }}>{this.getMonthlyPayment()}</Text>
        </View>
        <View style={styles.inputs}>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder='Amount'
              keyboardType='number-pad'
              value={this.state.amount.toString()}
              onChangeText={amount => !isNaN(amount) && this.setState({ amount })}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Interest Rate'
              keyboardType='numeric'
              value={this.state.rate.toString()}
              onChangeText={rate => this.numCharAfterDecimal(rate) <= 3 && this.setState({ rate })}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Taxes'
              keyboardType='numeric'
              value={this.state.taxes !== null ? this.state.taxes.toString() : ''}
              onChangeText={taxes => this.numCharAfterDecimal(taxes) <= 2 && this.setState({ taxes })}
            />
          </View>
          <Picker
            selectedValue={this.state.period}
            style={styles.picker}
            onValueChange={period => this.setState({ period })}>
            <Picker.Item label="5 Years" value={5} />
            <Picker.Item label="10 Years" value={10} />
            <Picker.Item label="15 Years" value={15} />
            <Picker.Item label="20 Years" value={20} />
            <Picker.Item label="25 Years" value={25} />
            <Picker.Item label="30 Years" value={30} />
          </Picker>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  monthlyPayment: {
    height: 40
  },
  inputs: {
    flex: 1,
    flexDirection: 'row'
  },
  textInput: {
    width: 300,
    height: 40
  },
  picker: {
    height: 25,
    width: 100
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
