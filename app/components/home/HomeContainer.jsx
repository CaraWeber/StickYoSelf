import {connect} from 'react-redux'
import Home from './Home'
import {messageNull} from 'APP/app/reducers/checkout'

const mapStateToProps = function(state) {
  return {
    message: state.message
  };

};

const mapDispatchToProps= function (dispatch) {
  return {
    setMessageToNull: function() {
      return dispatch(messageNull());
    }
  };
};

export default connect(
      mapStateToProps,
     mapDispatchToProps)
(Home)
