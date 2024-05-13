const errorHandler = require('./../utils/error.handler');
const db = require("../middleware/middleware");
require('dotenv').config();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const userSchema = db.user;
const { Op } = require('sequelize');


class UserController {

    async add(body) {
        try {
            let userCreate = await userSchema.create(body);
            let response = await userSchema.findByPk(userCreate.id);
            return {
                status: "success", msg:"data Created successfully", result: response
            }
        } catch (err) {
            console.log(err);
            return {
                status: 'error',
                msg: 'User creation failed'
            }
        }
    }

    async register(body) {
        try {
            const newUser = new userSchema({
                username : body.username,
                fullName : body.fullName,
                phone : body.phone,
                userFilter : body.userFilter,
                billEdit : body.billEdit,
                userLocation : body.userLocation,
                godown : body.godown,
                billSeries : body.billSeries,
                email : body.email,
                userType : body.userType,
                password : CryptoJS.AES.encrypt(body.password,process.env.SECRET).toString(),
            });

            let userCreate = await newUser.save();
            let response = await userSchema.findByPk(userCreate.id);
            return {
                status: "success", msg:"data Created successfully", result: response
            }
        } catch (err) {
            console.log(err);
            return {
                status: 'error',
                msg: 'User creation failed'
            }
        }
    }


    async login(responce){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

           if(!emailRegex.test(responce.email)){
               return {
                   status:false,
                   message :"Email is not Valid"
               }
           }

           const minPasswordLength =  4 ;

           if(responce.password < minPasswordLength){
               return {
                   status:false,
                   message :"Password should be at least " + minPasswordLength +" characters long"
               }
           }

       try{
        var condition = responce.email ? { email: responce.email.toLowerCase() } : null;
        console.log("condition",condition);
        let user = await userSchema.findOne({ where: condition });  
           if(!user){
               return {
                   status:false,
                   message :"User not found"
               }
           }

           const decryptpassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET);
           const depassword =  decryptpassword.toString(CryptoJS.enc.Utf8);

           if(depassword !==  responce.password){
               return {
                   status:false,
                   message :"Wrong Password"
               }
           }

            const userToken = jwt.sign({id:user.id,userType:user.userType,email:user.email},process.env.JWT_SECRET,{expiresIn:"21d"});



           const {password,otp,createdAt,updatedAt,__v,...others} =  user.dataValues;

           return {
               status: "1",
               msg: "Login Sucessfully",
               ...others,
               userToken
           };

       } catch(error){
        console.log(error);
           return {
               status: false,
               message: errorHandler.parseMongoError(error)
           };
       }
   }


    async fetch(username) {
        try {
            var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
            let response = await userSchema.findAll({ where: condition });
            let count = Object.keys(response).length;
            return { status: "success",   msg:"data get successfully", result: response };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }


    async fetchdata(id) {
        try {
            let response = await userSchema.findByPk(id);
            return response;
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async delete(id) {
        try {
            let response = await userSchema.destroy({
                where: { id: id }
            });
            return { status: "success",   msg:"data Deleted successfully", result: response };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async update(id, body) {
        try {
            let updateResponse = await userSchema.update(body, {
                where: { id: id }
            });
            let response = await userSchema.findByPk(id);
            return { status: "success", msg: "User Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}

module.exports = new UserController();