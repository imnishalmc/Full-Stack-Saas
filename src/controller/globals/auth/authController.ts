//register/signup
//login//signin
//forget password
//logout
//otp

//username, password ,email,phonenmber 
//processing/check--> email valid,compulsory data aauna pro
//db query->table ,a insert deleting update


import { Request,Response } from "express"
import user from "../../../database/models/user.model"
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken"

//this is the functional approach so here we will bw doing the object based approach 

// const registerUser =async(req:Request,res:Response)=>{
//     const{username,password,email} =req.body

//     if(!username|| !password|| !email){
//         res.status(400).json({
//             message:"please provide the valid username,password,email"
//         })
//         return
//     }
//        await user.create({
//             username:username,
//             password:password,
//             email:email
//         })
//         res.status(200).json({
//             message:"user registered sucessfully"
//         })
//     }

//     export { registerUser}

class AuthController{
    static async registerUser(req:Request,res:Response){
        if(req.body==undefined){
            res.status(400).json({
                message:"no data was sent "
            })
            return
        }
        const{username,password,email}=req.body
        if(!username|| !password||!email){
            res.status(400).json({
                message:"please provide the  username,password,email "
            })
            return
        }
        await user.create({
            username:username,
            password: bcrypt.hashSync(password,12),//blowfish hash garne ho ani 12 bhaneko chai salt round ho
            email:email
        })
        res.status(200).json({
            message:"user registered sucessfully"
        })
    }
//static linu ko karan object creattion ko lagi uta router ma suggestion aauxa 
    //ani yo chai login garda feri ko scene
static async loginUser(req:Request,res:Response)
{
    const{email,password} =req.body
    if(!email || !password)
    {
        res.status(400).json({
            message:"please provide email and password"
        })
        return
    }
    const data= await user.findAll({//find all le chai array return garxa
        where:{
            email// yo bhaneko chai email bhanni key ko vlaue lai lainxa 
        }
    })

    if(data.length==0){
        res.status(404).json({
            message:"not registered"
        })
    }
    else{
      const isPasswordMatch=  bcrypt.compareSync(password,data[0].password)//yo bhanko mathi ko find all ma array ko form ma aako xa(normally hash) ani varibale chai data ho so tei ho data[0].password bhanneko ..ani password is the normal plain password ani yo bcrypt.comapreSync le tyo plin lai nai hash ma chamge garxa ani tyo array wala sanga compare garxa 

        //first parameter bhaneko chai k compare garni bhanni lura ani second 
        //kura chai aghi register gareko bela ma bhako password 
        if(isPasswordMatch){
            const token = Jwt.sign({id:data[0].id},"thisisasecretkey",{
                expiresIn:"10h"//yo chai 10 hour samma valid hunxa
            })
            res.status(200).json({
                token: token,
                message: "Login successful"
            })
        }   
        else{
            res.status(403).json({
                message:" invalid email or passwrod "
            })
        }
    }
}
}
export  {AuthController}
