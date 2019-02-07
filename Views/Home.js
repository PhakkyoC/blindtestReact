import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Bienvenue sur le blindtest',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
                <View style={styles.container}>
                    <Button
                        title="Blind test par artist"
                        color="#841584"
                        accessibilityLabel="Blind test par artist"
                        onPress={() => navigate('Quizz', {type: 'name'})}
                    />
                    <Button
                        title="Blind test par titre"
                        color="#4286f4"
                        accessibilityLabel="Blind test par titre"
                        onPress={() => navigate('Quizz', {type: 'author'})}
                    />
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
});