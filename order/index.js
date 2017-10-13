const Gdax = require('gdax');
 
const publicClient = new Gdax.PublicClient();

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    
    var tempErr = "";
    try
    {  
		var buyParams = {'client_oid' : req.body.client_oid, 'type': 'market', 'side' : 'buy', 'funds': req.body.funds, 'product_id':req.body.product_id}
		 
		var gdaxURI = process.env["GdaxURI"];
		var b64secret = process.env["b64secret"];
		var passphrase = process.env["passphrase"];
		var ApiKey = req.body.apikey;
		var tempTest = process.env["test"];
		
		
		var authedClient = new Gdax.AuthenticatedClient(
			ApiKey, b64secret, passphrase, gdaxURI);
 
		var callback = function(err, response, data) {
			try
			{            
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: response.body 
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
