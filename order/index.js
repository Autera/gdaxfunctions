const Gdax = require('gdax');
const uuid = require('node-uuid');
const publicClient = new Gdax.PublicClient();

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    
    var tempErr = "";
    try
    { 
		//'BTC-USD'
		var buyParams = {'client_oid' : req.query.client_oid, 'type': 'market', 'side' : 'buy', 'funds': req.query.funds, 'product_id':req.query.product_id}
		 
		var gdaxURI = process.env["GdaxURI"];
		var b64secret = process.env["b64secret"];
		var passphrase = process.env["passphrase"];
		var ApiKey = req.query.apikey;
		var tempTest = process.env["test"];
		
		
		var authedClient = new Gdax.AuthenticatedClient(
			ApiKey, b64secret, passphrase, gdaxURI);
 
		var callback = function(err, response, data) {
			try
			{            
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: response.body
                    //"Successfully processed order Funds:" + req.query.funds + " Product: "+ req.query.funds 
                };
			    context.done();
			}
			catch(err)
			{
                tempErr = err.message;
                context.res = {
                    status: 400,
                    body:  tempErr
                };
                context.done();
			}        
        };

		authedClient.buy(buyParams, callback);
    }
    catch(err)
    {
        tempErr = err.message;
        context.res = {
            status: 400,
            body: tempErr
        };
        context.done();
    }
     
};
