import express from 'express';
import mongoose from 'mongoose';
import newsRouter from './routes/news-routes';
import router from './routes/user-routes';
import * as dotenv from 'dotenv'
dotenv.config();

const app=express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/news",newsRouter);


// mongodb+srv://pralay:ahgPWF79WDRQDCsL@cluster0.jifgatw.mongodb.net/News/?retryWrites=true&w=majority
// ahgPWF79WDRQDCsL
app.get('/',(req,res)=>{
    res.send('<!DOCTYPE html><html lang="en"><head><title>News Api</title></head><body><h1>Welcome to News Api</h1><br><h2>Freatures of this Api :</h2><ol><li>Get All News -(GET) https://news-app8102.herokuapp.com/api/news</li> <li>Get User News-(GET) https://news-app8102.herokuapp.com/api/news/user/:id</li><li>Get User List -(GET) https://news-app8102.herokuapp.com/api/user </li><li>Signin-(POST) https://news-app8102.herokuapp.com/api/user/login, End points- email,password</li><li>Signup-(POST) https://news-app8102.herokuapp.com/api/user/signup, End points- name,email,password</li><li>Add a News-(POST) https://news-app8102.herokuapp.com/api/news/add, End points- title,description,image,user</li><li>Update a News-(PUT) https://news-app8102.herokuapp.com/api/news/update/:id, End points-title,description</li><li>Delete a News-(DELETE) https://news-app8102.herokuapp.com/api/news/:id</li></ol></body></html>');
    res.end();
});
mongoose.connect("mongodb+srv://pralay:ahgPWF79WDRQDCsL@cluster0.jifgatw.mongodb.net/News/?retryWrites=true&w=majority"
)
.then(()=>app.listen(process.env.PORT||8080))
.then(()=>console.log('Example app listening on port ${port}!'))
.catch((err)=>console.log(err));

