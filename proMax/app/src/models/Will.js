"use strict";

const Willstorage = require("./Willstorage");

class Will {
  constructor(body) {
    this.body = body;
  }

  async will() {
    const client = this.body;
    try {
      const response = await Willstorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
  async willrt(X) {
    
    try {
      const user = await Willstorage.getWillInfo(X);
      return user;
      
    } catch (err) {
      return { success: false, err };
    }
  }
  async willsave2() {
    const cli = this.body;
    console.log(cli);
    try {
      const response = await Willstorage.update(cli);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = Will;
