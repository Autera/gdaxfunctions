const Gdax = require('gdax');

const publicClient = new Gdax.PublicClient();

module.exports = function (context, req) {
   context.log('JavaScript HTTP trigger function processed a request.');
   
   
   var tempErr = "";
   try
   {  
       
       var gdaxURI = process.env["GdaxURI"];
       var b64secret = process.env["b64secret"];
       var passphrase = process.env["passphrase"];
       var ApiKey = req.body.apikey;  
       
       var authedClient = new Gdax.AuthenticatedClient(
           ApiKey, b64secret, passphrase, gdaxURI);

       var callback = function(err, response, data) {
           try
           {            
               context.res = {
                   body: response.body,
                   status: response.statusCode
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

       authedClient.getOrder(req.body.id,callback);
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
