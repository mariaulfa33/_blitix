function generateTix() {
  var text = ""
  let text2 = ""
  let text3 = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
    text += possible[(Math.floor(Math.random() * possible.length))]
    text2 += possible[(Math.floor(Math.random() * possible.length))]
  }
  text3 += possible[(Math.floor(Math.random() * possible.length-1))]
    

  return `TIX-${text}-${text2}-${text3}`;
}


module.exports = generateTix