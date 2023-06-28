const path = require('path');

const express = require('express');
// touch controller folder for files inside controllers and save it in variable to use later
const controller = require('../controllers/admin')
// touch util folder for upload file to upload image files and use it later
const upload = require('../util/upload')

const router = express.Router();

router.get('/dashboard', controller.getDashboard)

router.get('/products', controller.getProducts)

router.get('/add-products', controller.getAddProducts)

router.post('/add-products', upload.uploadFile, controller.postAddProducts)

router.get('/edit-products', controller.getEditProducts)

router.post('/edit-products', upload.uploadFile, controller.postEditProducts)

router.post('/delete-products', controller.postDeleteProduct)

router.get('/orders', controller.getOrders)

router.get('/customers', controller.getCustomers)

module.exports = router;