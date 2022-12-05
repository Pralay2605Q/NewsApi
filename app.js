import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import * as dotenv from 'dotenv'
dotenv.config();

const app=express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);



app.get('/',(req,res)=>{
    res.send('<!DOCTYPE html><html lang="en"><head><title>Blog Api</title></head><body><h1>Welcome to Blog Api</h1><br><h2>Freatures of this Api :</h2><ol><li>Get All Blogs -(GET) https://blog-app8102.herokuapp.com/api/blog</li> <li>Get User Blogs-(GET) https://blog-app8102.herokuapp.com/api/blog/user/:id</li><li>Get User List -(GET) https://blog-app8102.herokuapp.com/api/user </li><li>Signin-(POST) https://blog-app8102.herokuapp.com/api/user/login, End points- email,password</li><li>Signup-(POST) https://blog-app8102.herokuapp.com/api/user/signup, End points- name,email,password</li><li>Add a Blog-(POST) https://blog-app8102.herokuapp.com/api/blog/add, End points- title,description,image,user</li><li>Update a Blog-(PUT) https://blog-app8102.herokuapp.com/api/blog/update/:id, End points-title,description</li><li>Delete a Blog-(DELETE) https://blog-app8102.herokuapp.com/api/blog/:id</li></ol></body></html>');
    res.end();
});
mongoose.connect("mongodb+srv://admin:5m3MSoLH8DtzCsnQ@pralay.txpgjxa.mongodb.net/News?retryWrites=true&w=majority"
)
.then(()=>app.listen(process.env.PORT||8080))
.then(()=>console.log('Example app listening on port ${port}!'))
.catch((err)=>console.log(err));

