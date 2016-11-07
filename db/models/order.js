
const db = require('APP/db')
const Sequelize = require('sequelize')
const Sticker = require('./sticker');

module.exports = db.define('orders', {
  quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
  orderNumber: Sequelize.INTEGER,  // What's this?
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},

{
	instanceMethods: {
		totalPrice: function() {
			Sticker.findAll({
				where: {id: this.product_id}
			})
			.then(sticker =>{
				return sticker.price * this.quantity
			})
		}
	}
}
)

