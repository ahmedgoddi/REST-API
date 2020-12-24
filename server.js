const express = require("express")

const connectDB = require("./config/connectDB")

const app = express()

const users = require("./models/ContactListe")

//3-SETUP ENV VARIABLES
require("dotenv").config({path :"./config/.env"})
// PARSE THE DATA TO JSON
app.use(express.json())



//2-connect the DATABASE
connectDB()

//**************** START THE CRUD******** */

//GET ALL USERS
//PATH / /api/users

app.get("/api/users" , (req , res) => {
    users.find()
    .then((users) => res.send( {msg : "GET USERS " , users}  ))
    .catch((err) => res.send({msg : "ERROR" , err}))
})

//get user by id
//PATH/ /api/users/:userId 

app.get("/api/users/:userId" , (req , res) => {
    const userId = req.params.userId
    users.findById(userId)
    .then((user) => res.send({msg : "Get user BY ID" , user}))
    .catch((err) => res.send({msg : "ERROR" , err}))

})

//add a users
// PATH : /api/add_user

app.post("/api/add_user" , (req , res) => {
    const {name , lastName , email , phone} = req.body
    const newUsers = new users({name , lastName , email , phone })
    newUsers
    .save()
    .then((user) => res.send({msg : "User Added with success" , user}))
})


// edit user by id
//PATH : /api/users/:userId

app.put("/api/users/:userId" , (req , res) => {
    const id = req.params.userId
    users.findByIdAndUpdate(id , req.body , {new:true})
    .then((user) => res.send({msg : "user Upadted" , user}) )
    
    
})


//delet user by id 
//PATH: /api/users/:userId

app.delete("/api/users/:userId" , (req , res) => {
    const id = req.params.userId
    users.findByIdAndDelete(id)
    .then((user) => res.send({msg : "user deleted" , user}))
    .catch((err) => res.status(400).send({msg : "ERORE" , err}) )
})

//*****************END THE CRUD**************** */

//1- start the server
const port = 5000

app.listen(port , () => {
    console.log(`the server is reuunig on port ${port}`)
})