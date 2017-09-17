// enable cookie
var request = require('request');
request = request.defaults({jar: true});

require('dotenv').config();

function login(params) {
    var options = {
        method: 'POST',
        url:  process.env.SERVER_URL + '/pos/signin/',
        form: {
            username:  process.env.SWEET_USER,
            password:  process.env.SWEET_PASS
        },
    }
    request(options, function callback(err, res, body) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(body);
        }
    })


    
}

function checkout(event, orders, tableStr) {
    console.log('checkout', orders);
    if (!tableStr) tableStr = '1';
    var options = {
        method: 'POST',
        url: process.env.SERVER_URL + '/pos/newOrder/',      
        withCredentials: true,
        form: JSON.stringify( {
            table: tableStr,
            orders: orders
        }),
        json: true
    }
    request(options, function callback(err, res, body) {
        console.log(res.statusCode);
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("success order", body);

        }
    })
}

function getProduct() {
    var options = {
        method: 'GET',
        url: process.env.SERVER_URL + '/pos/product/',

        json: {
            entity: "latte",
            values: [{ value: "拿鐵" }]
        }
    }

    request(options, function callback(err, res, body) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(body);
        }
    })

}

function init() {
    login();
    // getProduct();
}

exports.init = init
exports.login = login
exports.checkout = checkout
exports.getProduct = getProduct