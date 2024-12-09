import { request } from "express"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const userResolver = {
    Query: {
        authUser: async(_, __, context) => {
            try{
                console.log("new user request 123334234");
                console.log(context.user);
                const user = await context.getUser();
                console.log(user);
                return user

            }catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
        },
        user: async(__, {userId}) =>{
            try{
                const user = await User.findById(userId);
                return user

            } catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
        }
    },
    Mutation:{
        signUp: async(_,{input}, context)=>{
            try{
                const {username, name, password, gender} = input;
                if(!username || !name || !password || !gender) throw new Error("All fields are required");

                const exsistingUser =  await User.findOne({username});
                if(exsistingUser) throw new Error("User already exists");

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                //https://avatar.iran.liara.run/public/{gender}?username={username}
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic
                });

                await newUser.save();
                await context.login(newUser);
                return newUser;
            }catch(err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }

        },

        login: async(_,{input}, context)=>{
            try{
                const {username, password} = input;
                const {user} = await context.authenticate('graphql-local', {username, password});
                await context.login(user);
                return user

            }catch (err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
            
        },

        logout: async(_, {}, context)=>{
            try{
                await context.logout();
                context.req.session.destroy((err)=>{
                    if(err) throw new Error(err.message || "Something went wrong");
                });
                context.res.clearCookie("connect.sid");
                return {message: "Logged out"}
            }catch(err){
                console.log(err);
                throw new Error(err.message || "Something went wrong");
            }
        }
    }
}

export default userResolver