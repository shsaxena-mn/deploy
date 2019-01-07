var mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
var express = require('express');
const _ =require('lodash');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Practice');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

var Product = new mongoose.model('Product' , {
    name : {
        require:true,
        type : String
    },
    address : {
        type: String,
        require: true
    }
});

app.post('/Product',(req,res)=> {
    var Prod = new Product({
        name: req.body.name,
        address : req.body.address
    });
    
    Prod.save().then((doc) => {
        console.log(JSON.stringify(doc));
    }).catch((e)=>{
            console.log(e);
    });
    
});

app.listen(port , () => {
    console.log(`App is up on ${port});
});

app.get('/Products' , (req, res) => {
    // Product.find().then((docs)=>{
    //     console.log(docs);
    //     res.send({docs});
    // }).catch((e)=> {
    //     res.status(404).send(e);
    // });
    Product.findById('5c32f67de6de030f045f4544').then((docs) => {
        res.send({docs}).catch((e)=>{
            res.status(404).send(e);
        });
    })

});

app.delete('/Products/:id',(req,res)=> {
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }
    Product.findByIdAndRemove(id).then((docs)=>{
        res.send({docs});
    })
});

app.patch('/Products/:id', (req,res)=> {
    var id = req.params.id;
    var body = _.pick(req.body,['name','address']);

    Product.findByIdAndUpdate(id,{ $set :body }, {new : true}).then((doc)=>{
        res.send({doc});
    });

})