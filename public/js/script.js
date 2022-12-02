const stripe = Stripe(
  `pk_test_51MAE1cHv0pbL7m6zgMSR1MKhlJSXUbxf8RnFMY3MLBKFif0bsZmtoZZJiuCqHbPTOxiyzyXVcBjLEke4229momWm00I66W6DrC`
);

const testPurchaseData = [
  { id: 1, name: `t-shirt`, price: 14.99, amount: 2 },
  { id: 2, name: `shoes`, price: 100, amount: 1 },
];

const shipping_fee = 20;

// Disable the button until Stripe set up
document.querySelector(`button`).disabled = true;

// Make a request to the Stripe service
fetch(`/stripe`, {
  method: `POST`,
  headers: { "Content-Type": `application/json` },
  body: JSON.stringify({ purchase: testPurchaseData, shipping_fee }),
})
  // Get result JSON from the response stream
  .then((result) => result.json())
  // Proceed using stripe response data
  .then((data) => {
    // Stripe frame elements
    const elements = stripe.elements();

    // Stripe frame styles
    const styles = {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };

    // Create credit card Stripe iFrame
    const card = elements.create(`card`, { style: styles });
    console.log(card);

    // Inject Stripe iFrame into the placeholder div
    card.mount(`#card-element`);

    // Disable the pay btn if there are no card details entered
    card.on(`change`, (e) => {
      document.querySelector(`button`).disabled = e.empty;
      document.querySelector(`#card-error`).textContent = e.error
        ? e.error.message
        : ``;
    });

    // Add payment logic on button click
    const form = document.getElementById(`payment-form`);
    form.onsubmit((e) => {
      e.preventDefault();
      payWithCard(stripe, card, data.clientSecret);
    });
  });
