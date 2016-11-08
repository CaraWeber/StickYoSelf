import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Cart extends Component {

    componentDidMount() {
        const user = this.props.user;
    }

    render () {
        return (
            <div id="cart-container">
                <div className="main-content">
                    <h2 className="full-line">
                    {this.props.user.name? this.props.user.name + "'s Cart" : 'Your Cart'}
                    </h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="cart-table-hdg"></th>
                                <th className="cart-table-hdg">swish</th>
                                <th className="cart-table-hdg">price</th>
                               {/* } <th className="cart-table-hdg">qty</th>
                                <th className="cart-table-hdg">total price</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.items && this.props.items.map((item, idx) => (
                            <tr className="cart-list" key={idx}>
                            <td>
                            <Link to={"/stickers/" + item.product.id}>
                                <img src={item.product.picture} className="cart-pic" />
                            </Link>
                            </td>
                            <td className="cart-item">{item.product.name}</td>
                            <td className="cart-item">{item.product.price}</td>
                            {/* <td className="cart-item">{item.quantity}</td>
                            <td className="cart-item">{item.quantity * item.product.price}</td> */}
                            <td>
                            <button onClick = {() => this.props.deleteItem(item.product.id, this.props.user.id)}
                            className= "btn-cart-remove">
                                <img src ="https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_12-512.png" />
                            </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Link to="/checkout"><button type="button" className="btn btn-success">Checkout</button></Link>
                </div>
            </div>
        );
    }
}
