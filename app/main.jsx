'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'

import store from './store'
import HomeContainer from './components/home/HomeContainer'
import StickersContainer from './components/stickers/StickersContainer'
import UserContainer from './components/user/UserContainer'
import LoginContainer from './components/login/LoginContainer'
import App from './components/App'
//import {getUser} from 'APP/reducers/user'

//onEnter function needs to be finished (decision needs to be made)


render (
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRedirect to='home'/>
              <Route path='home' component={HomeContainer} />
              <Route path='login' component={LoginContainer}/>
              <Route path='user' component={UserContainer}/>
              <Route path='stickers' component={StickersContainer}/>

        </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
