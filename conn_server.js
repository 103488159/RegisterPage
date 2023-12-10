const express = require("express");
const bodyParser = require("body-parser");
// this is a change
const app = express();
//make app use body parser
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vuongquanngocminh:Themadwizzard01@cluster0.abnlgqt.mongodb.net/?retryWrites=true&w=majority";


app.use(bodyParser.urlencoded({ extended: true })); //take value from request by form
//Creates an Express application. The express() function is a top-level function exported by the express module.
const port = 4000;
//at the route send a function with req and res parameter

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function addtotable(target) {
    try {
        client.connect(a => {
            const database = client.db("registerpage_db");
            const usercollection = database.collection("users");
            const result = usercollection.insertOne(target);
        })


    } catch (error) {
        console.log(error);
    } finally {
        await client.close;
    }

}

const database = client.db("registerpage_db");
const usercollection = database.collection("users");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html"); //like print writer
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

//Ctr + C to close
// value get from body-parser is just a text type

//handle with post method
app.post("/iP_form", (req, res) => {
    const newuser = {
        _id: "",
        email: (req.body.mail),
        username: (req.body.name),
        password: (req.body.pass)
    }
    try {
        addtotable(newuser);

    } catch (error) {
        console.log(error);
        res.send("cannot create account")
    }
    console.log(newuser)
    res.send("Register successful");
})
