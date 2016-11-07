import React, { Component } from 'react';

export default class Checkout extends Component {
  constructor (){
    super();
    this.state={
      sendToEmail: '',
      purchaseMsg: ''
    }
    this.updateSendToEmail= this.updateSendToEmail.bind(this);
    this.updateMessage= this.updateMessage.bind(this);
  }

  updateSendToEmail (evt){this.setState({sendToEmail: evt.target.value})}
  updateMessage (evt){this.setState({purchaseMsg: evt.target.value})}
  

  render () {
    const orderId = this.props.items[0].order_master_id
    const total = this.props.items.reduce((prev, curr) => {
        return prev + (curr.quantity * curr.product.price);
          }, 0);
    return (
      <div className='center_div container '>
        <form onSubmit={(evt)=> {
          evt.preventDefault()
          console.log(this.props.items)
          const orderInfo = Object.assign({}, this.state, {purchaserEmail: this.props.auth.email, total: total})
          this.props.sendEmail(this.state.sendToEmail,this.props.items, total)
          this.props.placeOrder(orderInfo, orderId, this.props.auth.id)

        }}>
          <div className="form-group">
            <label>Email My Swish To:</label>
            <input onChange={this.updateSendToEmail}type="email" className="form-control" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label >Tell us in a few words why you want to order this swish/these swishes</label>
            <input onChange={this.updateMessage}type="text" className="form-control" aria-describedby="MsgBlock"/>
          </div>
          <p>Order Total</p>
          <p>${total.toFixed(2)}</p>
          <button type="submit" className="btn btn-default">Place Order</button>
        </form>
      </div>
    )
  }
}
