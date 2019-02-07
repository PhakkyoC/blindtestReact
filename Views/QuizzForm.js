import React, { Component } from 'react';
import {View, StyleSheet, TextInput, Text, Button} from 'react-native';
import { getSongs,checkSong,initGame,updateErrText,updateText } from '../Reducer';
import { connect } from 'react-redux';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

class QuizzForm extends React.Component {

    constructor(props){
        super(props);
        this.sendResponse = this.sendResponse.bind(this)
    }
    componentWillMount() {
        this.props.initGame();
        this.props.getSongs();
    }
    sendResponse(){
        if (this.props.text.length>0){
            this.props.updateErrText(this.props.text);
            this.props.checkSong(this.props.text,this.props.type);
        }
    }
    render() {
        const {songs,current,score,err} = this.props;
        let textError =  <Text></Text>
        let url = "";
        if(songs.length>0){
            url = songs[current].preview_url;
            if (err){
                textError = <Text>{this.props.errText} n'est pas la bonne réponse</Text>
            }
            return (
                <View style={styles.container}>

                    {/*à center et ajouter un margin bottom*/}
                    <Text>Trouver le nom de la musique</Text>

                    {/*à mettre en haut a droite*/}
                    <Text>Votre score : {score}</Text>

                    {/*à mettre en haut a droite*/}
                    {textError}

                    {/*ajouter un margin bottom*/}
                    <VideoPlayer
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {
                                uri: url,
                            },
                        }}
                        isPortrait={true}
                        playFromPositionMillis={0}
                        showFullscreenButton={false}
                        debug={false}
                    />

                    {/*center width 80%*/}
                    <TextInput style={styles.formText}
                               onChangeText={(text) => this.props.updateText(text)}
                               value={this.props.text}
                    />

                    {/*center width 80%*/}
                    <Button
                        title="Vérifier"
                        color="#841584"
                        accessibilityLabel="Vérifier"
                        onPress={this.sendResponse}
                    />
                </View>
            );
        }
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        flexDirection:'column',
        flexWrap:'wrap',
    },
    formText: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        padding: 10,
    },
});

const mapStateToProps = state => {
    let storedSongs = state.songs.songsList.map(s => ({...s}));
    return {
        songs: storedSongs,
        current: state.game.current,
        score : state.game.score,
        err : state.game.err,
        text : state.formState.inputText,
        errText:state.formState.errText,
    };
};

const mapDispatchToProps = {
    getSongs,
    checkSong,
    initGame,
    updateText,
    updateErrText
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizzForm);