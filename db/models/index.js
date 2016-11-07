'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Sticker = require('./sticker');
const Order = require('./order');
const OrderMaster = require('./orderMaster');

Order.belongsTo(User);

Order.belongsTo(Sticker, {as: 'product'});

Order.belongsTo(OrderMaster);

OrderMaster.hasMany(Order);

// Shouldn't OrderMaster.belongsTo(User)?

module.exports = {User, Sticker, Order, OrderMaster}
