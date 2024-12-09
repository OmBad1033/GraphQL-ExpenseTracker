import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = () => {
    passport.serializeUser((user, done) => {
        console.log("serializeUser", user);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("deserializeUser", id);
        try{
            const user = await User.findById(id);
            done(null, user);

        } catch(err){
            console.log(err);
            done(err);
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async(username, password, done) => {
          try{
            const user = await User.findOne({username});
            if(!user) throw new Error("Invalid Username or Password");
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword) throw new Error("Invalid Username or Password");
            return done(null, user);
          } catch(err){
            console.log(err);
            done(err);
          }
        })
      );
}