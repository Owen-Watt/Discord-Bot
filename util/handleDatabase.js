const mongoose = require('mongoose');
const { mongo } = require("../config.json")

module.exports = (client) => {
    client.handleDatabase = async () =>{
        mongoose.connect(mongo,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            console.log("Connected to database");
        }).catch((err) =>{
            console.log(err);
        })
    }
}
