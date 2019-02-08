import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Bienvenue sur le Blind Test',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
                <View style={styles.container}>
                <Text style={styles.titre}>BLIND TEST</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigate('Quizz', {type: 'author'})}
                        >
                        <Text style={styles.text}>ARTISTE</Text>
                    </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigate('Quizz', {type: 'name'})}
                        >
                            <Text style={styles.text}>TITRE</Text>
                        </TouchableOpacity>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#012129',
        flexDirection:'column',
        flexWrap:'wrap',
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1ED760',
        marginBottom: 35,
        padding: 20,
        borderRadius: 50,
        width: '75%',
    },
    text: {
        color: '#fff',
        fontSize: 15,
    },
    titre: {
        paddingBottom: 30,
        color: '#fff',
        fontSize: 20,
    }
});