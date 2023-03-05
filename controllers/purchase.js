const Razorpay = require('razorpay');
const User = require('../models/user');
const Order = require('../models/order');

exports.premiumMembership = async (req, res, next) => {
    // console.log('rzr pay ==>' , req.body);
    // console.log('rzr pay user ==>' , req.user);
    try {        
        // console.log('=============================================================')
        // console.log('line num = 8 in puchase')
        let rzp = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret
        })
        const amount = 10000;

        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            try {
                if (err) {
                    throw new Error(JSON.stringify(err));
                }
                const successOrder = new Order({ orderId: order.id, status: 'PENDING' , userId : req.user._id , paymentId: 'null'} );
                await successOrder.save();
                console.log(`user's orderID ==> ${order.id}`);
                return res.status(201).json({ success : true , order, key_id: rzp.key_id });
            } catch (err) {
                console.log(`error ==>`, err);
                return res.status(404).json({success : false , message : 'Something went wrong' });
            }
        })
    } catch (err) {
        console.log(`error ==>`, err);
        return res.status(404).json({success : false , message : 'Something went wrong' });
    }
}

exports.updateTransection = async (req, res, next) => {
    console.log('=============================================================')
    console.log(`line 35 in controller ==>` , req.body);
    const { order_id, payment_id, transaction } = req.body;

    try {
        if (transaction) {
            const order = Order.findOneAndUpdate({ orderId: order_id } , { paymentId: payment_id, status: 'SECCESSFULL'});
            const premium = User.findByIdAndUpdate({_id : req.user.id}, { isPremiumUser : true});
            await Promise.all([order, premium]);

            return res.status(201).json({ success: true, message: 'Transaction Successful' });
        } else {
            await Order.findOneAndUpdate({ orderId: order_id } ,{ paymentId: 'FAILED', status: 'FAILED' });
            return res.status(201).json({ success: false, message: 'Transaction Failed' });
        }

    } catch (err) {
        console.log(err);
        return res.status(404).json({success : false , message : 'Something went wrong' });
    }
}