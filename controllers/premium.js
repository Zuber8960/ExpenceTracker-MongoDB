const User = require('../models/user');
const Expence = require('../models/expence');

exports.getAllExpence = async (req, res, next) => {
    console.log('getAllExpences');

    try {
        const users = await User.find().select('name _id')
        console.log('==============================================')
        // console.log(users)
        // users.forEach(user => console.log(user._id));
        const expences = await Expence.find().select('_id amount userId');
        console.log('==============================================')
        // console.log(expences);
        let data = users.map(user => {
            let total = 0;
            expences.map(expence => {
                if(expence.userId.toString() == user._id.toString()){
                    total+= expence.amount
                    return total;
                }
            })
            return {name : user.name, total_amount : total};
        })

        data.sort((a,b) => b.total_amount - a.total_amount);
        // console.log(data);
        return res.status(201).json({ success: true, data: data });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: err });
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