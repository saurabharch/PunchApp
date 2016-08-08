var Sequelize = require('sequelize');

var db = require('../server');

module.exports = db.define('TopScore', {
    Score: {
        type: Sequelize.INTEGER
    },
    Player:{
      type: Sequelize.STRING
    }
});
