const Order = require('APP/db/models/order');
const User = require('APP/db/models/user');
const Sticker = require('APP/db/models/sticker');
const OrderMaster = require('APP/db/models/orderMaster');

const cart = require('express').Router()
  // Hydrate the cart from the session
  // Untested, but this is the general idea:
  .use((res, req, next) => {
    if (req.user && !req.session.cartId) {      
      return OrderMaster.findOrCreate({
        where: {user_id: req.user.id, completed: false}
      }).then(cart => {
        req.session.cartId = cart.id
        req.cart = cart
      }).then(next)
    }

    // We have a cart ID on the session
    if ('cartId' in req.session) {
      return OrderMaster.findById(req.session.cartId)
        .then(cart => {
          req.cart = cart
          if (req.user && !req.cart.user_id) {
            // Adopt a previously anonymous cart
            return req.cart.setUser(req.user)
          }
        }).then(next)
    }
    
    OrderMaster.create({user: req.user})
      .then(cart => {
        req.cart = cart
        // Put the cart in the session.        
        req.session.cartId = cart.id         
      }).then(next)  
  })

    .get('/', function(req, res, next){  //get pending items (cart items)
        if (!req.user) {
          return res.status(401).send()          
        }
        Order.findAll({
            where: {user_id: req.user.id,
                    completed: false},
            include: [{model: Sticker,
                       as: 'product'}]
            })
        .then(items => res.send(items))
        .catch(next)
    })
    // Add a product
    .post('/products/:productId', function(req, res, next){
        Order.findOrCreate({
          where: {user: req.user, product_id: req.params.product_id, completed: false},
        })
        .then(order => order.increment('quantity'))
        .catch(next)

    })
    .delete('/products/:productId', function(req, res, next) {
        Order.find({
          where: {user: req.user, product_id: req.params.product_id, completed: false},
        })
        .then(order => order.decrement('quantity'))
        .catch(next)
    })

module.exports = cart
