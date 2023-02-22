const User = require('../models/user');
const Expence = require('../models/expence');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
