const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync( __dirname + '/private.key', 'utf8');
var publicKEY  = fs.readFileSync( __dirname + '/public.key', 'utf8');
module.exports = {
    sign: (payload, $Options) => {
        /*
         sOptions = {
          issuer: "Authorizaxtion/Resource/This server",
          subject: "iam@user.me",
          audience: "Client_Identity" // this should be provided by client
         }
        */
        // Token signing options
        var signOptions = {
            issuer:  $Options.issuer,
            subject:  $Options.subject,
            audience:  $Options.audience,
            algorithm:  "RS256"
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify: (token, $Option) => {
        /*
         vOption = {
          issuer: "Authorization/Resource/This server",
          subject: "iam@user.me",
          audience: "Client_Identity" // this should be provided by client
         }
        */
        var verifyOptions = {
            issuer:  $Option.issuer,
            subject:  $Option.subject,
            audience:  $Option.audience,
            algorithm:  ["RS256"]
        };
        try{
            return jwt.verify(token, publicKEY, verifyOptions);
        }catch (err){
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
}