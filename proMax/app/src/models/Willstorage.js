"use strict";

const db = require("../config/db");

class Willstorage {
  static async save(willinfo) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO will( name, vname, meta, vmeta, ownermeta, message, adr, time) VALUES(?, ?, ?, ?, ?, ?, ?, now());";
      db.query(
        query,
        [
          willinfo.name,
          willinfo.vname,
          willinfo.meta,
          willinfo.vmeta,
          willinfo.ownermeta,
          willinfo.message,
          willinfo.adr,
        ],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }

  static getWillInfo(addr) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM will WHERE ownermeta = ?;";
      db.query(query, [addr], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  static async update(willinfo) {
    return new Promise((resolve, reject) => {

      //   const query1 ="UPDATE will set ";
      // const query2 =" WHERE ownermeta = ?;";
      //const msgquery = query1 + "`message` = "+msgmsg+" "+query2;
      const msgtest ="UPDATE will set `message` = ? WHERE ownermeta = ?; ";
      const nametest ="UPDATE will set `name` = ? WHERE ownermeta = ?; ";
      const metatest ="UPDATE will set `meta` = ? WHERE ownermeta = ?; ";
      const vnametest ="UPDATE will set `vname` = ? WHERE ownermeta = ?; ";
      const vmetatest ="UPDATE will set `vmeta` = ? WHERE ownermeta = ?; ";
      const adrtest ="UPDATE will set `adr` = ? WHERE ownermeta = ?; ";
      const timesql= "UPDATE will set `time` = now() WHERE ownermeta = ?;";
      // const namesql ="UPDATE will set `name` = `"+willinfo.name+"` WHERE ownermeta = '"+willinfo.ownermeta+"';";
      // const vnamesql ="UPDATE will set `vname` = `"+willinfo.vname+"` WHERE ownermeta = '"+willinfo.ownermeta+"';";
      // const metasql ="UPDATE will set `meta` = `"+willinfo.meta+"` WHERE ownermeta = '"+willinfo.ownermeta+"';";
      const mergesql =msgtest+nametest+metatest+vnametest+vmetatest+adrtest+timesql;
      db.query(
        mergesql,[
          willinfo.message,willinfo.ownermeta,
          willinfo.name,willinfo.ownermeta,
          willinfo.meta,willinfo.ownermeta,
          willinfo.vname,willinfo.ownermeta,
          willinfo.vmeta,willinfo.ownermeta,
          willinfo.adr,willinfo.ownermeta,
          willinfo.ownermeta
        ],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
        // db.query(
        //   msgtest,[willinfo.message,willinfo.ownermeta],
        //   (err) => {
        //     if (err) reject(`${err}`);
        //     else resolve({ success: true });
        //   }
        // );
        
      // for (let i=0; i < 5; i++){
      
      //   const sql2=query1 + culArray[i] + " = " + updateArray[i]+query2;
      //   db.query(
      //     sql2,[willinfo.ownermeta],
      //     (err) => {
      //       if (err) reject(`${err}`);
      //       else resolve({ success: true });
      //     }
      //   );
      // }
      
     });
    }
}


module.exports = Willstorage;
