'use strict';
var knex = require('../knex_connection');
var moment = require('moment');
var fs = require('fs');

    class Log {

        constructor(type, fileName) {
            if(type == 'file') {
                this.log = this.fileLog;
                this.fileName = `${__dirname}/../logs/${fileName}.txt`;
            }
            else {
                this.log = this.dbLog;
            }
        }

        dbLog(data, type) {
            var dataObj = JSON.stringify(data);
            knex('logs')
            .insert({data: dataObj, type: type})
            .then((data)=>{
                var a;
            }).catch((err) => {
                var err;
            })
        }

        fileLog(data, type) {
            var dataObj = JSON.stringify(data);
            var str = `${moment().format("HH:mm:ss MM-DD-YYYY")} | ${type} | ${dataObj} \n`;
            fs.appendFile(this.fileName, str, function (err) {
              //if (err) return console.log(err);
              //console.log('Hello World > helloworld.txt');
            });
        }

    }


module.exports = Log;