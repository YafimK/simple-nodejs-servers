"use strict"

var program_cmd_args = require('commander');

const https = require("https");
const fs = require('fs');
const qs = require('querystring');
const express = require("express");
const errorHandler = require('errorhandler'),


//Parse cmd args

program_cmd_args
    .version('0.1.0')
    .option('-p, --port', 'Listening port', 8888)
    .option('-H, --host', 'Host address binding', 'localhost')
    .option('-C, --cert', 'Certificate', 'unsafe_default_server_key.cert')
    .option('-K, --key', 'Private key', 'unsafe_default_server_key.key')
    .option('-SF, --publish-folder', 'static folder to server pages from', 'public')
    .parse(process.argv);

const https_server_options = {
    key: fs.readFileSync(program_cmd_args.key),
    cert: fs.readFileSync(program_cmd_args.cert)
};

const server_options = {
    port: program_cmd_args.port,
    host: program_cmd_args.host
};


const app = express();

if(program_cmd_args.publishFolder){
    app.use(express.static(program_cmd_args.publishFolder))
}

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));
https.createServer(https_server_options, app).listen(server_options);
console.log('Server Started at: https://',program_cmd_args.host,':', program_cmd_args.port);