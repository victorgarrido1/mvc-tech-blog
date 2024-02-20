const bcrypt = require('bcrypt');


const passwords = ["wonderful", "homehomehome","blueberrybot", "swordsdance", "orangestreet", "sunglasses" ];



const test = () => {
    passwords.forEach(async (password) => console.log(await bcrypt.hash(password, 12)));
  }
  
  test();