var express = require('express');

module.exports = function(app, dir){
    app.use(express.static(dir));
}


