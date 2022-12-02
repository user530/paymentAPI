const stripe = require(`stripe`)(process.env.STRIPE_KEY);
const { BadRequestError } = require(`../errors`);

const stripeController = async (req, res) => {
  try {
    const { purchase, shipping_fee } = req.body;

    const total_amount = purchase.reduce((prev, cur) => {
      return prev + cur.amount * cur.price * 100;
    }, 0);

    const calculateOrderAmount = () => total_amount + shipping_fee;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: `usd`,
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch {
    throw new BadRequestError(`Incorrect purchase data provided!`);
  }
};

module.exports = stripeController;
