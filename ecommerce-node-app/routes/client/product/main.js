const path = require('path');

const express = require('express');

const clientController = require('../../../controllers/client/product/main')

const router = express.Router();

router.get('/', clientController.getClientProduct)

router.post('/add-cart', clientController.postAddProduct)

router.post('/decrease-cart', clientController.postDecreaseProduct)

router.get('/cart', clientController.addToCart)

router.post('/delete-cartProducts', clientController.postDeleteCartProduct)


module.exports = router;