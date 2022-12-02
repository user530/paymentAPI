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
    form.addEventListener(`submit`, (e) => {
      e.preventDefault();
      payWithCard(stripe, card, data.clientSecret);
    });
  });

const payWithCard = (stripe, card, clientSecret) => {
  // Disable btn and show spinner
  loading(true);

  // Try to confirm payment with user card
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    })
    // Handle promise
    .then((res) => {
      // Show error if problem occured
      if (res.error) showError(res.error.message);
      // Show message on success
      else orderComplete(res.paymentIntent.id);
    });
};

// Function to show spinner on load
const loading = (isLoading) => {
  // Disable the btn and show spinner on load
  if (isLoading) {
    document.querySelector(`button`).disabled = true;
    document.querySelector(`#spinner`).classList.remove(`hidden`);
    document.querySelector(`#button-text`).classList.add(`hidden`);
  }
  // Vice versa
  {
    document.querySelector(`button`).disabled = false;
    document.querySelector(`#spinner`).classList.add(`hidden`);
    document.querySelector(`#button-text`).classList.remove(`hidden`);
  }
};

// Function to handle error in payment process
const showError = (errorText) => {
  // Stop loading process
  loading(false);

  // Select element and set error text
  const errBlock = document.querySelector(`#card-error`);
  errBlock.textContent = errorText;

  // Hide message after 5 sec
  setTimeout(() => (errBlock.textContent = ``), 5000);
};

// Function to handle successfull payment
const orderComplete = (paymentId) => {
  // Stop loading process
  loading(false);

  // Select element and set recepeit link
  const msgBlockLink = document.querySelector(`.result-message a`);
  msgBlockLink.setAttribute(
    `href`,
    `https://dashboard.stripe.com/test/payments/${paymentId}`
  );

  // Show message block and disable button
  msgBlockLink.parentElement.classList.remove(`hidden`);
  document.querySelector(`button`).disabled = true;
};
