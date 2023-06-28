const { NewTable } = require('../models/adminProduct') 
// const path = require('path');
// const fs = require('fs')
// get dashboard ejs file for dashboard
exports.getDashboard = (req, res, next) => {
    // get otgName from query which is imported from 'controllers/enterUser.js'
    const { orgName } = req.query;
    // render dashboard ejs file
    res.render('admin/dashboard', {
        path: `/dashboard`,
        pageTitle: 'Dashboard',
        orgName: orgName
    })
}
// get products from tables
exports.getProducts = async (req, res, next) => {
    try {
        // get otgName from query which is imported from 'controllers/enterUser.js'
        const { orgName } = req.query;
        // save NewTable function inside new variable to create new table of user outside of User table
        const Table = NewTable(orgName);
        // find all products that are available in this new user table and declare them in the ejs file as rows
        const rows = await Table.findAll()
        res.render('admin/products', {
            path: '/products',
            pageTitle: 'Products',
            orgName: orgName,
            rows: rows
        })
    } catch (err) {
        console.error(err);
    }
};
// get add products page
exports.getAddProducts = (req, res, next) => {
    const { orgName } = req.query;
    res.render('admin/add-products', {
        path: '/add-products',
        pageTitle: 'Add Products',
        orgName: orgName
    })
};
// add new products in table 
exports.postAddProducts = async (req, res, next) => {
    // get otgName from query which is imported from 'controllers/enterUser.js'
    const { orgName } = req.query;    
    // get name from input fields
    const { productName, productDescription, productPrice } = req.body;
    const image = req.file;
    try {
        // create variable for image
        const imagePath = image.path;
        // create new variable for user table 
        const Table = NewTable(orgName);
        // create new row inside current user table name 
        await Table.create({
            product_name: productName,
            product_description: productDescription,
            product_price: productPrice,
            Image: imagePath,
        });
        // after creating new product redirect to the products page
        res.redirect(`/products?orgName=${orgName}`)
        
    } catch (err) {
        console.log('some error',err);
    };
};
// get edit page
exports.getEditProducts = async (req, res, next) => {
    const { orgName, productId } = req.query;
    const editMode = req.query;
    try {
        const TableEditor = NewTable(orgName);
        // when click on the exact product open by id 
        const editSingleProduct = await TableEditor.findByPk(productId);
        // if editSingleProduct is not found then render product page
        if (!editSingleProduct) {
            return res.redirect('/products')
        }
        
        res.render('admin/edit-products', {
            path: '/edit-products',
            pageTitle: 'Edit Products',
            orgName: orgName,
            editing: editMode,
            product: editSingleProduct,
        });
    } catch (error) {
        console.log('some ');
    }
};
// edit products
exports.postEditProducts = (req, res, next) => {
    // get orgName and productId from request query
    const { orgName, productId } = req.query;
    // get names from input fields
    const { productName, productDescription, productPrice } = req.body;
    const image = req.file;
    // create new variable for exact table of user
    const UpdateTAble = NewTable(orgName)
    // find exact product to update by id
    UpdateTAble.findByPk(productId)
        .then(product => {
            // save new product values in table 
            product.product_name = productName;
            product.product_description = productDescription;
            product.product_price = productPrice;
            return product.save();
        })
        .then(result => {
            // then render updated product in product page
            res.redirect(`/products?orgName=${orgName}`)
        })
        .catch(err => {
            console.log(err);
        });   
};
// Delete exact product which clicked  
exports.postDeleteProduct = (req, res, next) => {
    // get orgName and productId from request query
    const { orgName, productId } = req.query;
    // create new variable for exact user table which is logged in
    const DeleteTable = NewTable(orgName)
    // delete row from table which is logged in with destroy method
    DeleteTable.destroy({ where: { id: productId } })
        .then(() => {
            // then redirect back to product page
            res.redirect(`/products?orgName=${orgName}`);
        })
        .catch((err) => {
            console.log(err);
            // if delete failed response status 500
            res.status(500).send('Failed to delete product');
        })
}
// get order details from clients
exports.getOrders = (req, res, next) => {
    const { orgName } = req.query;
    res.render('admin/orders', {
        path: '/orders',
        pageTitle: 'Orders',
        orgName: orgName
    })
}
// get customers details from client but it will work for one admin account not every
exports.getCustomers = (req, res, next) => {
    const { orgName } = req.query;
    res.render('admin/customers', {
        path: '/customers',
        pageTitle: 'Customers',
        orgName: orgName
    })
};
