import foodModel from "../models/foodModel.js";
import fs from "fs"



const addFood=async(req,res)=>{
    let image_filename= `${req.file.filename}`
    const food= new foodModel({
        name:req.body.name,
        image:image_filename,
        prices:req.body.prices,
        description:req.body.description,
        category:req.body.category
    })   

    try {
        await food.save();
        res.json({success:true,message:"Added Successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in Uploading"})
    }
}

const listFood=async(req,res)=>{
    try {
        const foods= await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
   
}


const removeFood=async(req,res)=>{
    try {
        const food= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}