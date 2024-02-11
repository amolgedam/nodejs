import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';

import config from '../config/index.js';
import UserModel from "../models/User.model.js";

/* middleware */
export async function verifyUser(req, res, next){
    try {
        const { username } = req.method=='GET' ? req.query : req.body;

        /* check user exists */
        let exist = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error:"Can't find User!"});

        next();

    } catch (error) {
        return res.status(404).send({error:"Authentication error"});
    }
}


/* POST */
export async function register(req, res){
    try {
        const { username, password, profile, email } = req.body;

        /* Check existing username  */
        const existUsername = new Promise((resolve, reject)=>{
            /* UserModel.findOne({username}, function(err, username){

                if(err) reject(new {error: 'Please error username'});
                if(username) reject({error: 'Please use unique username'});

                resolve(1);
            }); */

            UserModel.findOne({ username })
                .then((existingUser) => {
                    if (existingUser) {
                        reject({ error: 'Please use a unique username' });
                    } else {
                        resolve(1);
                    }
                })
                .catch((err) => {
                    reject({ error: 'Error checking username', details: err });
                });
        });

        /* Check existing email */
        const existEmail = new Promise((resolve, reject)=>{
            /* UserModel.findOne({email}, function(err, email){

                if(err) reject(new {error: 'Please error email'});
                if(email) reject({error: "Please use unique email"})

                resolve(1);
            }); */
            UserModel.findOne({ email })
                .then((existingUser) => {
                    if (existingUser) {
                        reject({ error: 'Please use a unique email' });
                    } else {
                        resolve(1);
                    }
                })
                .catch((err) => {
                    reject({ error: 'Error checking email', details: err });
                });
        });

        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    const saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);

                    bcrypt.hash(password, salt)
                        .then( hashedPassword =>{
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            /* return save result as a response */
                            user.save()
                                .then(result => {
                                    res.status(200).send({ msg: "User registered successfully" })
                                })
                                .catch(error=>{
                                    return res.status(500).send({ error });
                                });

                        }).catch(error=>{
                            console.log(error)

                            return res.status(500).send({
                                error: 'Enable to hashed password'
                            });
                        })
                }
            })
            .catch((error) => {
                return res.status(500).send({ error });
            });

    } catch (error) {
       return res.status(500).send(error); 
    }
}


/* POST */
export async function login(req, res){
    const { username, password } = req.body;

    try {
        UserModel.findOne({ username }).then((user)=>{
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);

            bcrypt.compare(password, user.password)
                .then((passwordChecked)=>{
                    
                    if(!passwordChecked) return res.status(404).send({error:"Don't have Password"});

                    /* Create JWT Token */
                    const token = jwt.sign({
                        userId: user._id,
                        username: user.username
                    }, config.JWT_TOKEN, { expiresIn: "24h" });

                    return res.status(200).send({
                        msg: "Login successfull...!",
                        username: user.username,
                        token: token
                    })

                }).catch(error=>{
                    console.log(error);
                    res.status(400).send({error: "Password not match!"});
                })

        }).catch(error=>{
            res.status(404).send({error: "Username not found!"});
        })
    } catch (error) {
        res.status(500).send({error});
    }
}


/* GET */
export async function getUser(req, res){
    const { username } = req.params;

    try {
        if(!username) return res.status(501).send({error: "Invalid Username"});
        
        UserModel.findOne({username}).then((user)=>{
            if(!user) return res.status(404).send({error:"Can't find User"});

            /* remove password from user variable */
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(200).send(rest);

        }).catch(error=>{
            return res.status(404).send({error})
        })
    } catch (error) {
        return res.status(404).send({error:"Con't find user data!"})
    }
}


/* POST */
export async function updateUser(req, res){
    try {
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            /* Update record */
            UserModel.updateOne({ _id: userId }, { $set: body })
                .then((result) => {
                    if (result.nModified === 0) {
                    return res.status(401).send({ error: "User not updated" });
                    }

                    return res.status(200).send({ msg: "Record updated!" });
                })
                .catch((error) => {
                    return res.status(401).send({ error });
                });
        }
        else{
            return res.status(401).send({error:"User not found!"})
        }
        
    } catch (error) {
        return res.status(404).send({error:"Con't find user data!"})
    }
}

/* GET */
export async function generateOTP(req, res){
    req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false});

    res.status(200).send({code: req.app.locals.OTP });
}

/* GET */
export async function verifyOTP(req, res, next){
    const { code } = req.query;

    console.log(code, req.app.locals.OTP);

    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;

        return res.status(200).send({msg: 'Verify successfully!'});
    }

    return res.status(400).send({error: 'Invalid OTP'});
}

/* GET */
export async function createResetSession(req, res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;

        return res.status(200).send({msg: 'Access granted!'});
    }

    return res.status(400).send({error: 'Session expired!'});
}

/* PUT */
export async function resetPassword(req, res){
    try {
        if(!req.app.locals.resetSession) return res.status(400).send({error: 'Session expired!'});

        const { username, password } = req.body;

        try {
            UserModel.findOne({ username }).then((user)=>{
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);

                bcrypt.hash(password, salt)
                    .then((hashedPassword) => {

                        UserModel.updateOne({ username: user.username }, { password: hashedPassword })
                            .then((result) => {
                                if (result.nModified === 0) {
                                    return res.status(401).send({ error: "Unable to update password!" });
                                }

                                return res.status(200).send({ msg: "Password changed successfully!" });
                            })
                            .catch((error) => {
                                return res.status(401).send({ error });
                            });
                    })
                    .catch((e) => {
                        return res.status(500).send({ error: "Unable to hash password!" });
                    });

            }).catch(error=>{
                return res.status(500).send({ error: "username not found!"});
            });

        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(400).send({ error });
    }
}