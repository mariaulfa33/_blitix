
const crypto = require('crypto');


function randomSecreten () {
  const buf = crypto.randomBytes(5);
  const secret = buf.toString('hex')
  return secret
}


module.exports = randomSecreten