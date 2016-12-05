var path = require('path');
module.exports = {
    http : {
        port : 8080
    },
    paths : {
        publ : path.join(__dirname, '../../public'),
        index : path.join(__dirname, '../../public/index.htm')
    }
};