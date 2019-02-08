import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Bienvenue sur le blindtest',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate('Quizz', {type: 'name'})}
                    >
                    <Text>Blind test par artist</Text>
                </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate('Quizz', {type: 'author'})}
                    >
                        <Text>Blind test par titre</Text>
                    </TouchableOpacity>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        marginTop: 50,
        flexDirection:'column',
        flexWrap:'wrap',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
});