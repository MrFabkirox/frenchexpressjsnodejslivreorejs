let connection = require('../config/db');

class Message {

  // static create (content) {
  static create async (content, cb) {
    let mess = req.mess
    // mess.title = "req.body.title"
    mess.title = "content"
    try {
      mess = await mess.save()
    } catch (e) {
      console.log('_____e [%o]', e);
    }
  }
}

module.exports = Message
