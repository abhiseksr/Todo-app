const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/route");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(res=>console.log("successfully connected to MongoDB."))
.catch(err=>console.log(err));

const app = express();


app.use(express.json());
app.use(cors());
app.use('/',routes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT, ()=>{
    console.log("App listening on port: ", PORT);
})