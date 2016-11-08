import axios from 'axios'


//maybe we don't need have an action that adds an order because we can just get all the orders when we need them?

export function checkoutReducer (state = null, action) {
  switch(action.type) {
    case SET_CHECKOUT_MESSAGE:
      return action.message;
    case SET_MESSAGE_NULL:
      return null
    default: return state;
  }
}


//-------------------------ACTION TYPES-----------------------------//
export const SET_CHECKOUT_MESSAGE = 'SET_CHECKOUT_MESSAGE';
export const SET_MESSAGE_NULL = 'SET_MESSAGE_NULL'

//-------------------------ACTION CREATORS-----------------------------//

export const checkoutMessage = function (message) {
  return {
    type: SET_CHECKOUT_MESSAGE,
    message
  };
};

export const messageNull = function () {
  return {
    type: SET_MESSAGE_NULL
  }
}

//-------------------------ASYNC ACTION CREATORS (THUNK)---------------------------//
export const sendEmail= function (email,order,total){
  axios.post('/api/orders/sendmail',{email,order,total})
  .then(()=>{});
}
//parallel ajaxs request ok?
export const addOrderAsync = function (order, masterId, userId) {
  console.log('DA STUFF',order, masterId, userId)
  return function(dispatch) {
    axios.put(`/api/orders/users/${userId}`)
    .then(()  => {});

    axios.put(`/api/orders/orderMaster/${masterId}`, order)
    .then( () => {
      // dispatch(addOrder(updatedOrder))
    })
    .catch(err => console.error(err))
  }
}





