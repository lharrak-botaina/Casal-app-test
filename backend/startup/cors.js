const cors = require('cors')

module.exports = function(app){
    app.use(cors({credentials : true , origin: ['http://localhost:4200']}))
}