require("dotenv").config();

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const User = require("./models/user.model")
const Note = require("./models/note.model")

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities")


const port = process.env.PORT || 8000;

app.use(express.json());

app.use(
    cors({
        origin:"*",
    })
)

app.get('/',(req,res)=>{
    res.json({data:"hello"});
})


//create account
app.post("/create-account", async(req,res)=>{
    const {fullName, email, password} = req.body;
    if(!fullName){
        return res.status(400).json({error: true, message: "full name is required"})
    }
    if(!email){
        return res.status(400).json({error: true, message: "email is required"})
    }
    if(!password){
        return res.status(400).json({error: true, message: "password is required"})
    }
    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.json({error: true, message: "user already exist"})
    }
    const user = new User({
        fullName,
        email,
        password,
    });
    await user.save()
    
    const accessToken = jwt.sign({user},process.env.ACESS_TOKEN_SECRET,{
        expiresIn: "36000m",
    })
    
    return res.json({error: false, user, accessToken, message:"Registeration Succesfull",})
})

//login
app.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    if(!email){
        return res.status(400).json({message: "email is required"})
    }
    if(!password){
        return res.status(400).json({message:"password is required"})
    }

    const userInfo = await User.findOne({email: email})

    if(!userInfo){
        return res.status(400).json({message:"user not found"})
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET,{
            expiresIn: "36000m"
        });
        
        return res.json({
            error: false,
            message: "Login Succesfull",
            email,
            accessToken,
        })
    }else{
        return res.status(400).json({error: true,message:"Invalid Credentials"})
    }
})

//Get User
app.get("/get-user",authenticateToken, async(req,res)=>{
    const {user} = req.user;
    const isUser = await User.findOne({_id: user._id})
    
    if(!isUser){
        return res.status(401)
    }
    return res.json({
        user: {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdOn: isUser.createdOn},
        message: "",
    })
})

//Add Note
app.post("/add-note",authenticateToken, async(req,res)=>{
    const {title, content, tag} = req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({error: true, message: "title is required"})
    }
    if(!content){
        return res.status(400).json({error: true, message: "content is required"})
    }
    try{
        const note = new Note({
            title,
            content,
            tag: tag || "",
            userId: user._id,
        });

        await note.save();
        
        return res.json({
            error: false,
            note,
            message: "Note Added Succesfully",
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({error: true, message: "Internal Server Error"})
    }
})

//edit Note
app.put("/edit-note/:noteId",authenticateToken,async(req,res)=>{
    const noteId = req.params.noteId;
    const {title,content,tag} = req.body;
    const {user} = req.user;

    if(!title && !content && !tag){
        return req.status(400).json({error: true, message: "No Change Provided"})
    }
    try{
        const note = await Note.findOne({_id:noteId, userId: user._id});
        if(!note){
            return res.status(400).json({error:true, message: "Note not found"})
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tag) note.tag = tag;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated Succesfully"
        })
    }catch(error){
        return res.status(500).json({error: true, message: "Inernal Server Error"})
    }
})

//get all notes
app.get("/get-all-notes/",authenticateToken,async(req,res)=>{
    const {user} = req.user;

    try{
        const notes = await Note.find({userId: user._id})
        
        return res.json({
            error: false,
            notes,
            message: "All Notes reterived Succesfully"
        })
    }catch(error){
        return res.status(500).json({error: true, message: "Internal Server Error"})
    }
})

//Delter Note
app.delete("/delete-note/:noteId",authenticateToken,async(req,res)=>{
    const noteId = req.params.noteId;
    const {user} = req.user;

    try{
        const note = await Note.findOne({_id: noteId, userId: user._id})
        if(!note){
            return res.status(400).json({error: true, message: "Note Not found"})
        }

        await Note.deleteOne({_id: noteId, userId: user._id})

        return res.json({
            error: false,
            message: "Note Deleted Sucessfully"
        })
    }catch(error){
        return res.status(500).json({error: true, message: "Internal Server Error"})
    }

})

//search notes
app.get("/search-notes/", authenticateToken, async(req,res)=>{
    const {user} = req.user;
    const {query} = req.query;

    if(!query){
        return res.status(400).json({error: true, message: "search query is required"});
    }

    try {
        const searchingNotes = await Note.find({
            userId: user._id,
            $or: [
                {title: {$regex: new RegExp(query,"i")}},
                {content: {$regex: new RegExp(query, "i")}}
            ],
        })

        return res.json({
            error: false,
            notes: searchingNotes,
            message: "Notes seraching on searchquery seccesfully"
        })
    } catch (error) {
        return res.status(500).json({error: true, message:"internal server error"})
    }
})

app.listen(port,()=>{
    console.log(`app is listening on port https://localhost:${port}`)
})

module.exports = app;