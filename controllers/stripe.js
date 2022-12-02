const stripe = require(`stripe`)(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => total_amount + shipping_fee;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total_amount,
    currency: `usd`,
  });

  return res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
