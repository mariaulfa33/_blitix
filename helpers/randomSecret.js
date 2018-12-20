const crypto = require('crypto');
function randomSecrete () {
  // let  random = Math.floor(Math.random()*100 + 10)
  const buf = crypto.randomBytes(5);
  const secret = buf.toString('hex')
  return secret
}


module.exports = randomSecrete

