import React from 'react';
import {connect} from 'react-redux'
import User from './User'

const mapStateToProps = function (state) {
    return {
        user: state.currentUser
    }
} 

// const mapDispatchToProps = function (dispatch) {
//     return {

//     }
// }

export default connect(
    mapStateToProps, 
    null
)(User)
