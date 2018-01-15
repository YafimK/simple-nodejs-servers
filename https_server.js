"use strict"

var program_cmd_args = require('commander');

const https = require("https");
const fs = require('fs');
const qs = require('querystring');
var express = require("express");


//Parse cmd args

program_cmd_args
    .version('0.1.0')
    .option('-p, --port', 'Listening port', 8888)
    .option('-H, --host', 'Host address binding', 'localhost')
    .option('-C, --cert', 'Certificate', 'unsafe_default_server_key.cert')
    .option('-K, --key', 'Private key', 'unsafe_default_server_key.key')
    .parse(process.argv);


const https_server_options = {
    key: fs.readFileSync(program_cmd_args.key),
    cert: fs.readFileSync(program_cmd_args.cert)
};
