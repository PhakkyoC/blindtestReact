import React, { Component } from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
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
            this.props.updateText()
        }
    }
    render() {
        const {songs,current,score,err,isFinished} = this.props;
        let textError =  <Text></Text>
        let url = "";
        if(songs.length>0 && !isFinished){
            url = songs[current].preview_url;
            if (err){
                textError = <Text>{this.props.errText} n'est pas la bonne réponse</Text>
            }
            return (
                <View style={styles.container}>

                    {/*à center et ajouter un margin bottom*/}
                    
                    <Text>Trouver le nom du</Text>

                    {/*à mettre en haut a droite*/}
                    <Text>Votre score : {score}</Text>

                    {/*à mettre en haut a droite*/}
                    {textError}

                     {/*center width 80%*/}
                     <TextInput style={styles.formText}
                               onChangeText={(text) => this.props.updateText(text)}
                               value={this.props.text}
                    />

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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.sendResponse}
                    >
                        <Text style={{ color: '#fff'}}>Vérifier</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (isFinished) {
            return (
                <View style={styles.container}>
                    <Text> Bravo vous avez fini votre socre est : {score}</Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        flexDirection:'column',
        flexWrap:'wrap',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    formText: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        width: 300,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 50,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1ED760',
        padding: 20,
        marginTop: 20,
        borderRadius: 50,
        width: 200,
    },
});

const mapStateToProps = state => {
    let storedSongs = state.songs.songsList.map(s => ({...s}));
    return {
        songs: storedSongs,
        current: state.game.current,
        score : state.game.score,
        err : state.game.err,
        isFinished:state.game.isFinished,
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
