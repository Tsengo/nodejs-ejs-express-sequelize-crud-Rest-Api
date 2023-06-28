const { NewTable } = require('../../../models/adminProduct');
const { CartTable } = require('../../../models/cartOfClient')
const { User } = require('../../../models/userRegister');

// get all products for a client
exports.getClientProduct = async (req, res, next) => {
    // get client name
    const { clientName } = req.query;

    try {
        // get users from user.table
        const users = await User.findAll({
            attributes: ['org_name'],
        });
        // map users table to get all users products
        const productPromises = users.map(async (user) => {
            const table = NewTable(user.org_name)
            const products = await table.findAll();
            return {orgName: user.org_name, products: products}
        });
        // save a Promise in rows
        const rows = await Promise.all(productPromises);

        // render the product
        res.render('client/main', {
            path: '/main',
            pageTitle: 'Main',
            // map the row to get orgName and products
            orgName: rows.map((user) => user.orgName),
            rows: rows.flatMap((row) => row.products.map((product) => ({
                // save mapping products to import in ejs file (client/main)
                productId: product.id,
                productImg: product.Image,
                productName: product.product_name,
                productDescription: product.product_description,
                productPrice: product.product_price,
                seller: row.orgName
            }))),
            clientName: clientName,
        });
    } catch (err) {
        console.error(err);
    }
};


// Increase Post Cart Order
exports.postAddProduct = async (req, res, next) => {
    // get names for input fields
    const { productImage, productId, productName, productPrice } = req.body
    // get clientName from query string
    const { clientName } = req.query;
    
    // generate clientName to create a new client table
    const tableOfClient = clientName.replaceAll(' ', '_') + "_cart";
    try {
        // if client is not log in redirect to login
        if (!clientName) {
            res.redirect('/client-login')
        }
        // save CartTable object inside new variable 
        const Cart = CartTable(tableOfClient)
        // create existProductInRow variable for Cart object to find product in cart table
        const existProductInRow = await Cart.findOne({
            where: {
                product_name: productName,
                Image: productImage,
            }
        })
        // if current product exists in cart table then update product price and quantity
        if (existProductInRow) {
            const updateQty = existProductInRow.product_qty + 1;
            const updatePrice = productPrice * updateQty;
            // Cart Table update quantity and price of total product price 
            await Cart.update(
                {
                    // update qty, price and total product price with new values
                    product_qty: updateQty,
                    one_product_price: productPrice,
                    total_product_price: updatePrice
                },
                {
                    // save them where product id and product name is productId and productName
                    where: {
                        product_id: productId,
                        product_name: productName
                    }
                }
            );
        }
        else {
            // if the product is not exist create a new row in table 
            await Cart.create({
                product_id: productId,
                product_name: productName,
                Image: productImage,
                product_qty: 1,
                one_product_price: productPrice,
                total_product_price: productPrice
            })
        }
        // save CartTable object in cartTable variable
        const cartTable = CartTable(tableOfClient);
        // get all cartTable items and save them in getCartItems variable
        const getCartItems = await cartTable.findAll();
        // sum total productPrice from table and save them in totalPrice variable
        const totalPrice = await cartTable.sum('total_product_price');
        // map items to use in cart ejs file and save them in row variable
        const rows = getCartItems.map((cartProd) => ({
            productId: cartProd.product_id,
            productImg: cartProd.Image,
            productName: cartProd.product_name,
            productPrice: cartProd.one_product_price,
            product_qty: cartProd.product_qty,
            id: cartProd.id
    
        }));
        // render client.carts
        res.render('client/carts', {
            path: `/cart?${clientName}`,
            pageTitle: 'Cart',
            rows: rows,
            totalPrice: totalPrice,
            clientName: clientName
        })
        // res.redirect(`/?clientName=${clientName}`)
    } catch (err) {
        console.error(err);
    }
}
// Decrease Post Cart Order
exports.postDecreaseProduct = async (req, res, next) => {
    // get names for input fields
    const { productImage, productId, productName, productPrice } = req.body
    // get clientName from query string
    const { clientName } = req.query;
    
    // generate clientName to create a new client table
    const tableOfClient = clientName.replaceAll(' ', '_') + "_cart";
    try {
        // if client is not log in redirect to login
        if (!clientName) {
            res.redirect('/client-login')
        }
        // save CartTable object inside new variable 
        const Cart = CartTable(tableOfClient)
        // create existProductInRow variable for Cart object to find product in cart table
        const existProductInRow = await Cart.findOne({
            where: {
                product_name: productName,
                Image: productImage,
            }
        })
            
        // if current product exists in cart table then update product price and quantity
        if (existProductInRow) {
            // calculate quantity of product and price in total
            const updateQty = existProductInRow.product_qty - 1;
            const updatePrice = productPrice * updateQty;
            // if new quantity is at least 1 then update price and quantity
            if (updateQty > 0) {
                
                // Cart Table update quantity and price of total product price 
                await Cart.update(
                    {
                        // update qty, price and total product price with new values
                        product_qty: updateQty,
                        one_product_price: productPrice,
                        total_product_price: updatePrice
                    },
                    {
                        // save them where product id and product name is productId and productName
                        where: {
                            product_id: productId,
                            product_name: productName
                        }
                    }
                    );
            } else {
                // otherwise remove it from the table
                await Cart.destroy({
                    where: {
                        product_id: productId,
                        product_name: productName
                    }
                })  
            }
        }
        else {
            // if the product is not exist create a new row in table 
            await Cart.create({
                product_id: productId,
                product_name: productName,
                Image: productImage,
                product_qty: 1,
                one_product_price: productPrice,
                total_product_price: productPrice
            })
        }
        // save CartTable object in cartTable variable
        const cartTable = CartTable(tableOfClient);
        // get all cartTable items and save them in getCartItems variable
        const getCartItems = await cartTable.findAll();
        // sum total productPrice from table and save them in totalPrice variable
        const totalPrice = await cartTable.sum('total_product_price');
        // map items to use in cart ejs file and save them in row variable
        const rows = getCartItems.map((cartProd) => ({
            productId: cartProd.product_id,
            productImg: cartProd.Image,
            productName: cartProd.product_name,
            productPrice: cartProd.one_product_price,
            product_qty: cartProd.product_qty,
            id: cartProd.id
    
        }));
        // render client.carts
        res.render('client/carts', {
            path: `/cart?${clientName}`,
            pageTitle: 'Cart',
            rows: rows,
            totalPrice: totalPrice,
            clientName: clientName
        })
        // res.redirect(`/?clientName=${clientName}`)
    } catch (err) {
        console.error(err);
    }
}
    
// get method for getting the cart ejs file 
exports.addToCart = async (req, res, next) => {
    // get clientName from request query string
    const { clientName } = req.query;
    // generate table name for client cart 
    const tableOfClient = clientName.replaceAll(' ', '_') + "_cart";
    try {
        // save CArtTable object in variable cartTable 
        const cartTable = CartTable(tableOfClient)
        // get all cart items from cartTable and save them in variable getCartItems
        const getCartItems = await cartTable.findAll();
        // sum all total Price in current client cart table and save it in new variable totalPrice
        const totalPrice = await cartTable.sum('total_product_price');
        // render client/cart ejs file and map getCartItems inside to import client cart items in ejs
        res.render('client/carts', {
            path: `/cart?${clientName}`,
            pageTitle: 'Cart',
            rows: getCartItems.map((cartProd) => ({
                productId: cartProd.product_id,
                productImg: cartProd.Image,
                productName: cartProd.product_name,
                productPrice: cartProd.one_product_price,
                // seller: rows.orgName,
                product_qty: cartProd.product_qty,
                id: cartProd.id
            })),
            totalPrice: totalPrice,
            clientName: clientName,
        })
    }
    catch (err) {
        console.error(err);
    }
}

// delete current item with id
exports.postDeleteCartProduct = async (req, res, next) => { 
    // get clientName and productId from query
    const { clientName, productId } = req.query;
    // generate client cart table name
    const tableOfClient = clientName.replaceAll(' ', '_') + "_cart";
    // create new variable for CartTable objet named DeleteTable for delete row from table of client cart
    const DeleteTable = CartTable(tableOfClient)
    // find product with id productId inside client cart table and delete row
    DeleteTable.destroy({ where: { id: productId } })
    .then(() => {
        // after delete row stay in same page to continue movement
        res.redirect(`/cart?clientName=${clientName}`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to delete product');
    });
}

