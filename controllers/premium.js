const User = require('../models/user');
const Expence = require('../models/expence');

exports.getAllExpence = async (req, res, next) => {
    // console.log('getAllExpences');
    try {
        const allUsersExpences = await Expence.aggregate([
            {
                $lookup: {
                  from: "users",
                  localField: "userId",
                  foreignField: "_id",
                  as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $group : {
                    _id: {
                        _id: "$userId",
                        name: "$user.name",
                        email: "$user.email"
                      },
                    total_amount : { $sum : "$amount" }
                },
            },
            {
                $sort : { total_amount : -1}
            }
        ])
        
        console.log('==============================================')
        console.log(allUsersExpences);

        let data = allUsersExpences.map(expence => {
            return {name : expence._id.name, total_amount : expence.total_amount}
        })
        console.table(data);
        return res.status(201).json({ success: true, data: data });
        
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: err });
    }
}


const AWS = require('aws-sdk');

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
                // console.log(`work has done ===>`, s3responce);
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
        const filename = `Expence-${req.user._id}/${new Date()}.txt`;
        const fileURL = await updloadToS3(stringifiedExpences, filename);

        // console.log(fileURL);
        const file = new Filedownload({
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
        // console.log(allFiles);
        return res.status(200).json({success : true, allFiles})
    } catch (err) {
        console.log(err);
        return res.status(400).json({success : false, error : err})
    }
}



































































// sort(data);

// function sort(array) {
//     let i = 0;
//     while (i < array.length - 1) {
//         if (array[i].total_amount < array[i + 1].total_amount) {
//             [array[i], array[i + 1]] = [array[i + 1], array[i]];
//             i = 0;
//             continue;
//         }
//         i++;
//     }
// }




// let bag = [];
    // User.findAll()
    // .then((users) => {
    //     // console.log(users);
    //     users.forEach((user) => {
    //         user.getExpences()
    //         .then( async (exp) => {
    //             let expTotal = 0;
    //             await exp.forEach(data => {
    //                 expTotal += data.amount;
    //             });
    //             // console.log(`expense of user =>${user.name}` , expTotal);
    //             bag.push({
    //                 id : user.id,
    //                 name : user.name,
    //                 total_amount : expTotal
    //             });
    //             if(bag.length == users.length){
    //                 sort(bag);
    //                 console.log(bag);
    //                 res.status(201).json({success : true, data : bag})
    //             }
    //         })

    //     });
    // })