const Gdax = require('gdax');
//const uuid = require('node-uuid');
const publicClient = new Gdax.PublicClient();
const uuidv1 = require('uuid/v1');


module.exports = function (context, req) {

context.log('JavaScript HTTP trigger function processed a request.');
  

    var callback = function(err, response, data) {
        var temp = "";
        temp = uuidv1();
        temp = data[0].id;
        context.res.body = context.res.body + temp;       
        context.done();
      };

  


if (req.query.name || (req.body && req.body.name)) {

context.res = {

// status: 200, /* Defaults to 200 */

body: "Hellllloooo " + (req.query.name || req.body.name)

};

}

else {

context.res = {

status: 400,

body: "Please pass a name on the query string or in the request body"

};

}

    publicClient.getProducts(callback)

};

