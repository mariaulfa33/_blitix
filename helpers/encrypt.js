const crypto = require('crypto');

function encrypt (input, inputSecret) {
  const secret = inputSecret;
  const hash = crypto.createHmac('sha256', secret)
                     .update(input)
                     .digest('hex');
  return hash
  
}


module.exports = encrypt