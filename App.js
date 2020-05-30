/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import construct from '@babel/runtime/helpers/esm/construct';

class Application extends React.Component {

    constructor() {
        super();
        this.state = {
            expression: '',
            answer: '',
        }
    }

    buttonPressed(button) {
        this.setState({
            expression: this.state.expression + button
        });

        if (button === ('+' || '-' || '*' || '/')) {}
        else {
            const memory = this.state.expression;
            console.log(memory);

            // This part looks for every single character and splits the screen text into numbers
            // and operands and store then in array[] in arriving order
            let array = [];
            let part = '';
            for (let i = 0 ; i < memory.length ; i++){
                let char = memory[i];

                // If char is operand then it means that the previous number is complete so it
                // pushes the part into the array then pushes the operand to array and reset part
                if (isNaN(char)){
                    array.push(part);
                    array.push(char);
                    part = '';
                }
                else {
                    part += char;
                }
            }
            array.push(part);

            // This part takes each element of array and calculates the expression
            // If the array[index] is operand then stores in let operand
            // If it is number then it check the operand that is stored and calculate the previous
            // results with new number
            let answer = parseFloat(array[0]);
            let operand = '';
            for (let i = 1 ; i < array.length ; i++){
                if (isNaN(array[i])){
                    operand = array[i];
                }
                else {
                    let num = parseFloat(array[i]);
                    if (operand === '+') {
                        answer = answer + num;
                    }
                    else if (operand === '-') {
                        answer -= num;
                    }
                    else if (operand === '/') {
                        answer /= num;
                    }
                    else if (operand === '*') {
                        answer *= num;
                    }
                    operand = '';
                }
            }
            this.setState({
                answer: answer
            })
        }
    }

    delete() {
        let new_memory = '';
        let exp = this.state.expression;
        for (let i = 0; i < exp.length - 1; i++) {
            new_memory += exp[i]
        }
        this.setState({
            expression: new_memory
        })
    }

    clear() {
        this.setState({
            expression: '',
            answer: ''
        })
    }

    render() {
        return(
            <View style={styles.body}>
                <View style={styles.expression}><Text style={{textAlign: 'right', fontSize: 50}}>{this.state.expression}</Text></View>
                <View style={styles.answer}><Text style={{textAlign: 'right', fontSize: 30}}>{this.state.answer}</Text></View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        <View style={styles.number_row}>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('1')}><Text style={styles.button_text}>1</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('2')}><Text style={styles.button_text}>2</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('3')}><Text style={styles.button_text}>3</Text></TouchableOpacity>
                        </View>
                        <View style={styles.number_row}>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('4')}><Text style={styles.button_text}>4</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('5')}><Text style={styles.button_text}>5</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('6')}><Text style={styles.button_text}>6</Text></TouchableOpacity>
                        </View>
                        <View style={styles.number_row}>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('7')}><Text style={styles.button_text}>7</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('8')}><Text style={styles.button_text}>8</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('9')}><Text style={styles.button_text}>9</Text></TouchableOpacity>
                        </View>
                        <View style={styles.number_row}>
                            <TouchableOpacity style={styles.button} onPress={() => this.clear()}><Text style={styles.button_text}>C</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('0')}><Text style={styles.button_text}>0</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.delete()}><Text style={styles.button_text}>D</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.operators}>
                        <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('+')}><Text style={styles.button_text}>+</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('-')}><Text style={styles.button_text}>-</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('*')}><Text style={styles.button_text}>*</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed('/')}><Text style={styles.button_text}>/</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const App: () => React$NoHARRYde = () => {

    return (
        <Application/>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    expression: {
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    answer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    button_text: {
        fontSize: 30,
    },
    buttons: {
        flexGrow: 7,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: '#888',
    },
    number_row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    operators: {
        flex: 1,
        backgroundColor: '#ddd',
    }
});

export default App;
