const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const redis = require('redis');
const { promisify } = require('util');
const { Query } = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');
const express = require('express');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Practice');


const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = promisify(client.hget);



const complexModel = new  mongoose.model('complexModel' , {
    name : {
        type: String
    },

    address: {
        type : String
    },

    phone : [{
        countryCode : {
            type: Number
        },
        Number : {
            type: Number
        }
    }],

    skills :{
       type : new mongoose.Schema({
           name1 : {
               type: String
           },

           experiance : {
               type : Number
           }
       })
    }

});

const app = express();
app.use(bodyParser.json());

app.put('/complexModel', (req,res)=> {
    var anyModel = new complexModel({
        name : req.body.name,
        address : req.body.address,
        phone : req.body.phone,
        skills : req.body.skills
    });

    anyModel.save().then((doc) => {
        console.log(doc);
        res.send({doc});
    }).catch(e=> console.log(e));
});

app.listen(5000, ()=> {
    console.log('App is up on port 5000');
});

app.get('/complexModel', (req,res)=> {

    complexModel.find().then((docs) => {
        res.send({docs});
    }).catch(e => console.log(e));
});

app.delete('/complexModel/:id', (req,res) => {
    var id = req.params.id;
    complexModel.findByIdAndDelete(id).then((doc)=> {
        res.send({doc});
    }).catch(e=> console.log(e))
});

app.patch('/complexModel/:id' , (req,res)=> {
    var id = req.params.id;
    const body = _.pick(req.body, ['name','address','phone']);
complexModel.updateMany( {_id: new ObjectID(id) }, {
    $set : body,
    //$inc: { "phone.$[].countryCode" : -2 }
    
},{new : true}).then((docs)=> {
    res.send(docs);
}).catch(e=> console.log(e))

});