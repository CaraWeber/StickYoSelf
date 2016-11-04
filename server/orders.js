const Order = require('APP/db/models/order');
const User = require('APP/db/models/user');
const Sticker = require('APP/db/models/sticker')

const orders = require('express').Router()

    .get('/users/:userId', function(req, res, next){  //get pending items (cart items)
        Order.findAll({
            where: {user_id: req.params.userId,
                    completed: false},
            include: [{model: Sticker,
                       as: 'product'}]
            })
        .then(items => res.send(items))
        .catch(next)
    })
    .get('/:orderId/:userId', (req, res, next) =>
        Order.findAll({where: {
            orderNumber: req.params.orderId
                }
            })
            .then(items =>
                res.send(items)
            )
            .catch(next))

    .post('/users/:userId/:productId', function(req, res, next){
        Order.findAll({
            where: {
                user_id: req.params.userId,
                completed: false
            }
        })
        .then(function(items){
          req.body.user_id = req.params.userId;
          req.body.product_id = req.params.productId;
            if (items.length) {
              req.body.orderNumber = items[0].orderNumber;
              Order.findOne({
                where: {
                  user_id: req.params.userId,
                  completed: false,
                  product_id: req.params.productId
                }
              })
              .then((item) => {
                if (item) {
                  item.update({quantity: item.quantity +1})

                }
                else {
                  req.body.quantity = 1;
                  Order.create(req.body)
                  .then(function(item){
                      res.status(201).json(item)
                      }
                    )
                }
             })
               .catch(next)

            }
            //add new item to current cart
            else {
              let lastOrder;
              User.findById(req.params.userId)
              .then(function(user){
                lastOrder = user.lastCompletedOrder
                req.body.orderNumber = lastOrder+1;
                req.body.quantity = 1;
                Order.create(req.body)
                .then(item => res.status(201).json(item))
              })
              .catch(next)
            } //make new cart
        })
    })
    .put('/users/:userId', function(req, res, next){
      let currentOrder;
      Order.findAll({where: {
        user_id: req.params.userId,
        completed: false
      }})
      .then(function(items){
        currentOrder = items[0].orderNumber
        Promise.all(
        items = items.map(function(item){
          item.update({completed: true})
        }))
      .then(function(items){
        User.findById(req.params.userId)
        .then(function(user){
          user.update({lastCompletedOrder: currentOrder})
        })
        .then(user => res.send(201))

      })
      .catch(next)
      })
    })
    .delete('/users/:orderId', function(req, res, next) {
      Order.findOne({where: {
        id: req.params.orderId}})
      .then(function(item){
        console.log("----", item)
        if(item.quantity > 1) {
          item.update({quantity: item.quantity - 1})
          .then(item => res.send(204))
        } else {
           item.destroy()
           .then(item => res.send(204))
        }

      })


    })


module.exports = orders
