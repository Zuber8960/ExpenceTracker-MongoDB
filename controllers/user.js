const User = require('../models/user');
const Expence = require('../models/expence');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const AWS = require('aws-sdk');

exports.signUp = async (req, res, next) => {
    const data = req.body;

    if (data.name == "" || data.email == "" || data.password == "") {
        // console.log(`name`);
        return res.status(200).json({ message: "Please fill all feilds !" })
    }
    const userEmail = await User.findOne({ email : data.email});
    if(userEmail){
        return res.status(400).json({success : false, message: 'email is already exist !'})
    }
    const saltRounds = 10;
    bcrypt.hash(data.password, saltRounds, async (err, hash) => {
        try {
            console.log(err);
            
            const user = new User({
                name: data.name,
                email: data.email,
                isPremiumUser: false,
                password: hash
            })
            console.log(user);
            await user.save()
            return res.status(201).json({ success: true, user })
        } catch (err) {
            console.log(`error ==>`, err);
            return res.status(400).json({ success: false, error: err });
        }
    })

}

function generateAccessToken(id) {
    return jwt.sign( id , process.env.secretKey );
}


exports.login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (email == "" || password == "") {
            return res.status(204).json({ success: false, message: `Please fill all feilds !` });
        }
        // console.log(email, password);

        const user = await User.find({ email: email })

        console.log(user);
        if (user.length == 0) {
            return res.status(404).json({ success: false, message: `Error(404) : User ${email} does not exist` });
        } else {
            bcrypt.compare(password, user[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                }
                if (response) {
                    // console.log(`responce ===>` ,response);
                    console.log(`user ==>`, user[0].id,user[0].name);
                    console.log(`secretkey ==>`, process.env.secretKey);
                    let token = generateAccessToken(user[0].id);
                    
                    console.log(`token===>` , token);
                    return res.status(201).json({ success: true, message: `User : ${user[0].name} logged in successfully.`, token: token });
                } else {
                    return res.status(401).json({ success: false, message: `Error(401) : Entered wrong password !` });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}

updloadToS3 = (data, filename) => {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    })
    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err, s3responce) => {
            if (err) {
                console.log(`Something went wrong`, err);
                reject(err);
            } else {
                console.log(`work has done ===>`, s3responce);
                resolve(s3responce.Location);
            }
        })
    })
}

const Filedownload = require('../models/filedownloaded');

exports.download = async (req, res, next) => {
    try {
        // console.log(`123` , req.user);
        const expences = await Expence.find({userId : req.user._id});
        // console.log(`abc` , expences);
        const stringifiedExpences = JSON.stringify(expences);
        const filename = `Expence-${req.user.id}/${new Date()}.txt`;
        const fileURL = await updloadToS3(stringifiedExpences, filename);

        // console.log(fileURL);
        const file = await new Filedownload({
            fileURL: fileURL,
            userId : req.user._id
        })
        await file.save();
        return res.status(200).json({ fileURL, success: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
    }
}

exports.getOldFiles = async (req, res, next) => {
    // console.log(`===========>`, req.user);
    try {
        const allFiles = await Filedownload.find({userId : req.user._id});
        // console.log(result);
        return res.status(200).json({success : true, allFiles})
    } catch (err) {
        console.log(err);
        return res.status(400).json({success : false, error : err})
    }
}


