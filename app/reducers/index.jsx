import { combineReducers } from 'redux'
import stickerReducer from './stickers'
import {userReducer} from './user'

const rootReducer = combineReducers({
	stickers: stickerReducer,
    currentUser: userReducer

})

export default rootReducer
