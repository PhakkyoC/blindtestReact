import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { Provider, connect } from 'react-redux';
import QuizzAPP from '../Reducer';
import QuizzForm from './QuizzForm';

const token = "BQCZRFEKXCKuTRvauxDxgLt2P5WzivbwNhv0AgKtXtebYpsOmrMphTvOrzd6cq586B_zUna-4NupBYPXMbNvC_WRLL2ISZmlkDqlR2NlgA1zev-c0ZYL0Vn_fVAAPbhNYb6GfUh7Swy4Tcj1FZNQmWXAM3l_Il7b-R2ggv-BtLxYVVMXOzLDOjdj0RrD7aMvU9EyYypDJncKo8XiGbaUwjz9_7bYDUSxFBK0DC2WaeJIiTp35BKI6nfEgexEVsvX2EnIPU5zmcLF0LOIzw"

const client = axios.create({
    baseURL: 'https://api.spotify.com/v1/playlists/',
    responseType: 'json'
});

const axiosMiddlewareOptions = {
    interceptors: {
        request: [
            (getState, config) => {
                    config.headers['Authorization'] = "Authorization: Bearer "+token
                return config
            }
        ]
    }
}

const store = createStore(QuizzAPP, applyMiddleware(axiosMiddleware(client,axiosMiddlewareOptions)));

export default class QuizzScreen extends Component {
    render() {
        const type = this.props.navigation.state.params.type;
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <QuizzForm type={type}/>
                </View>
            </Provider>
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
    formText: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        padding: 10,
    }
});