import mongoose from 'mongoose';
import News from '../model/News';
import User from '../model/User';
export const getAllNews=async(req,res,next)=>{
    let news;
    try {
        news=await News.find();
    } catch (error) {
       return console.log(error); 
    }
    if(!news){
        return res.status(404).json({message:"No News Available"});
    }
    return res.status(200).json({news});
}
export const addNews=async(req,res,next)=>{
const {title,description,image,user}=req.body;
let existingUser;
try {
    existingUser=await User.findById(user);
} catch (error) {
    return console.log(error);
}
if(!existingUser){
    return res.status(400).json({message:"No User found"});
}
const news=new News({
    title,
    description,
    image,
    user,
});
try {
    const session=await mongoose.startSession();
    session.startTransaction();
   await news.save({session});
   existingUser.news.push(news);
   await existingUser.save({session});
   await session.commitTransaction();

} catch (error) {

    return res.status(500).json({error});
}
return res.status(200).json({news});
};
export const updateNews=async(req,res,next)=>{
const {title,description}=req.body;
const newsId=req.params.id;
let news;

 try {
    news=await News.findByIdAndUpdate(newsId,{
        title,
        description
        });
        
 } catch (error) {
    return console.log(error);

 }
 if (!news) {
    return res.status(500).json({message:"Unable to update"});
 }
 return res.status(200).json({news});
};
export const getNewsById=async(req,res,next)=>{
       const id=req.params.id;
       let news;
       try {
       news=await News.findById(id);
       } catch (error) {
        return console.log(error);
       }
    if(!news){
        return res.status(404).json({message:"No News Found"});
    }
    return res.status(200).json({news});
};
export const  deleteById=async(req,res,next)=>{
const id=req.params.id;
let news;
try {
    news=await News.findByIdAndRemove(id).populate('user');
    await news.user.news.pull(news);
    await news.user.save();
} catch (error) {
    return console.log(error);
}
if(!news){
    return res.status(404).json({message:"Invalid news"});
}
return res.status(200).json({message:true});
};
export const getByUserId=async (req,res,next)=>{
    const userId=req.params.id;
    let userNews;
    try {
        userNews=await User.findById(userId).populate("news");
    } catch (error) {
        return console.og(error);
        
    }
    if(!userNews){
        return res.status(404).json({message:"No News Found"});
    }
    return res.status(200).json({news:userNews});
}