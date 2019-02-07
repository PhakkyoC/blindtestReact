import { combineReducers } from 'redux'
export const GET_SONG = 'GET_SONG';
export const GET_SONG_SUCCESS = 'GET_SONG_SUCCESS';
export const GET_SONG_FAIL = 'GET_SONG_FAIL';

export const CHECK_SONG = 'CHECK_SONG';
export const INIT="INIT";

export const UPDATE_TEXT="UPDATE_TEXT";
export const UPDATE_ERRTEXT="UPDATE_ERRTEXT";


function formState(state = {inputText:"",errText:""},action) {
    switch (action.type) {
        case UPDATE_TEXT:
            state.inputText = action.text;
            return {...state};
        case UPDATE_ERRTEXT:
            state.errText = action.text;
            return { ...state};
        default:
            return state
    }
}


function game(state = {score:0,current:0,tryRep:10,err:false},action) {
    switch (action.type) {
        case INIT:
            state = {score:0,current:0,tryRep:10,err:false};
            return {...state};
        case CHECK_SONG:
            if (action.response.toLowerCase().trim() == action.userInput.toLowerCase().trim()){
                state.score = state.score+state.tryRep;
                state.tryRep=10;
                state.current=state.current+1;
                state.err = false
            }
            else{
                state.err = true;
                if (state.tryRep>1){
                    state.tryRep = state.tryRep-1;
                }
            }

            return { ...state};
        default:
            return state
    }
}

function songs(state = {songsList: []}, action) {
    switch (action.type) {
        case GET_SONG:
            return { ...state};
        case GET_SONG_SUCCESS:
            let i = 0;
            action.payload.data.tracks.items.map((t) =>{
                let tempObj = {};
                tempObj.name = t.track.name;
                tempObj.artist = t.track.artists[0].name;
                tempObj.preview_url = t.track.preview_url;
                state.songsList[i] = tempObj;
                i++;
            })
            return { ...state};
        case GET_SONG_FAIL:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

const QuizzAPP = combineReducers({
    game,
    songs,
    formState
});

export function getSongs() {
    return {
        type: GET_SONG,
        payload: {
            request: {
                url : "37i9dQZEVXbIPWwFssbupI",
            }
        }
    };
}

export function checkSong(inputValue,type) {
    let response="";
    if (type==="name"){
        response = this.songs[this.current].name;
    }
    else if (type==="author"){
        response = this.songs[this.current].artist;
    }

    return {type:CHECK_SONG,userInput:inputValue,response:response}
}

export function initGame() {
    return {type:INIT}
}

export function updateText(text) {
    return {type:UPDATE_TEXT,text:text}
}

export function updateErrText(text) {
    return {type:UPDATE_ERRTEXT,text:text}
}

export default QuizzAPP