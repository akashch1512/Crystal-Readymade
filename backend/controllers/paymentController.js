import dotenv from 'dotenv';
dotenv.config();

const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;
        const options = {
            amount: amount * 100,
            currency,
            receipt: `rcptid_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error creating Razorpay order', error: err });
    }
};

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(order_id + '|' + payment_id)
        .digest('hex');

    if (expectedSignature === signature) {
        res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
};
