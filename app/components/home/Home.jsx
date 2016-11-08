import React, { Component } from 'react';
import {Link} from 'react-router';
import store from 'APP/app/store'

export default class Home extends Component {
  render() {
    let checkoutMessage;
    if (this.props.message) {
        window.setTimeout(() => {
            console.log('STORE', store)
            $('#msg').fadeOut('slow')
            this.props.setMessageToNull();
        },3000);

    }
    return (
     <div className="home-cover">
      <a name="about"></a>
        <div className="intro-header">
            <div className="container">
            <div id="msg">{this.props.message}</div>

                <div className="row text-center vertical-center">
                    <div className="col-lg-12">
                        <div className="intro-message">
                            <h1 className='center-block'>Make A Swish</h1>
                            <h3>And Watch It Come True</h3>
                            <hr className="intro-divider"/>
                            <ul className="list-inline intro-social-buttons">
                                <li>
                                    <Link to="/stickers" className="btn btn-default btn-lg"><i className="fa fa-github fa-fw"></i> <span className="network-name">View Swishes</span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    )
  }
}


