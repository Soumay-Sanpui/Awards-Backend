 Payment Integration Documentation

Payment Integration with Stripe: Complete Walkthrough
=========================================================

Overview
--------

This document outlines the process of integration of Stripe payments in a trooph.co, including both frontend and backend components.Also discussing the challenges faced, such as compliance with Indian regulations.

Frontend Implementation
-----------------------

### React Components

The frontend is implemented using React. The main components involved are `Payment.tsx` and `CheckoutForm.tsx`.

#### Payment Component

The Payment component initiates the payment process. When a user visits the payment page, this component sends a request to the backend to create a PaymentIntent, which is a representation of the payment to be processed.

    
    // Payment Component
    const Payment = () => {
        useEffect(() => {
            const createPaymentIntent = async () => {
                const res = await fetch("create-payment-intent", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        description: "Payment for order #12345",
                        customerName: "John Doe",
                        customerAddress: {
                            line1: "123 Main Street",
                            city: "New York",
                            state: "NY",
                            postal_code: "10001",
                            country: "US"
                        }
                    })
                });
                const data = await res.json();
                setClientSecret(data.data);
            };
            createPaymentIntent();
        }, []);
    };
        

#### CheckoutForm Component

The CheckoutForm component handles the actual payment submission. When the user clicks the "Pay Now" button, this component interacts with the Stripe API to confirm the payment using the provided payment details.

    
    // CheckoutForm Component
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: "payment-completion-page" },
        });
        if (error) setMessage(error.message);
    };
        
Stripe Components
-----------------

### loadStripe

The `loadStripe` function is used to asynchronously load the Stripe.js library. It takes the publishable key as a parameter and returns a Promise that resolves with the Stripe object.

    
    import { loadStripe } from '@stripe/stripe-js';
    
    const stripePromise = loadStripe('STRIPE PUBLISHABLE KEY');
    

### Elements

The `Elements` component is a higher-order component provided by the `@stripe/react-stripe-js` library. It wraps the Stripe Elements and injects the Stripe object created by `loadStripe` into its child components.

    
    import { Elements } from '@stripe/react-stripe-js';
    
    
### PaymentElement

The `PaymentElement` component is a pre-built Stripe Element provided by the `@stripe/react-stripe-js` library. It renders a payment input field, such as a credit card element, that securely collects payment information from the user.

    
    import { PaymentElement } from '@stripe/react-stripe-js';
    
    const CheckoutForm = () => {
        return (
               <button>
                    Pay Now
               </button>   
        );
    };

Backend Implementation
----------------------

### Express Server Setup

The backend is implemented using Express.js. We have two main routes: one for fetching the Stripe publishable key and another for creating a PaymentIntent.

### Create a Stripe Instance

To initialize Stripe for payment processing, you'll need to create a Stripe instance in your frontend code. Below is an example of how to create a Stripe instance using the Stripe.js library.

    
    // Secret key obtained from your backend
    const STRIPE_SECRET_KEY = "your_stripe_secret_key";
    // Create Stripe instance
    const stripe = Stripe(STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10" (your api version)
    });
    // Now you can use the 'stripe' object for payment processing

#### Fetching Publishable Key

This route sends the Stripe publishable key to the frontend. This key is required by the frontend to initialize Stripe and securely communicate with the Stripe API.

    
    // Fetch publishable key
    const getSTPConfig = (req, res) => {
        res.status(200).send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
    };
        

#### Creating PaymentIntent

This route creates a PaymentIntent and a customer with the provided details. It calculates the payment amount, associates it with the customer, and generates a client secret, which is used by the frontend to confirm the payment.

    
    // Create PaymentIntent
    const STcreatePayIntent = async (req, res) => {
        try {
            const { description, customerName, customerAddress } = req.body;
            const customer = await stripe.customers.create({
                name: customerName,
                address: customerAddress
            });
            const paymentIntent = await stripe.paymentIntents.create({
                currency: "inr",
                amount: 8000,
                description,
                customer: customer.id,
                automatic_payment_methods: { enabled: true }
            });
            res.status(200).json({ data: paymentIntent.client_secret });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };
        

Payment Flow
------------

Now, let's walk through the payment flow :

1.  **User Clicks "Pay Now":** The user navigates to the payment page and clicks the "Pay Now" button.


2.  **Backend Creates PaymentIntent:** When the "Pay Now" button is clicked, the frontend sends a request to the backend to create a PaymentIntent. This request includes the details of the customer and the payment amount.


3.  **Backend Responds with Client Secret:** The backend processes the request, calculates the payment amount, and generates a client secret for the PaymentIntent. This client secret is sent back to the frontend.

4.  **Frontend Confirms Payment:** With the client secret received from the backend, the frontend confirms the payment using Stripe Elements. It securely collects payment details from the user and sends them to Stripe for processing.


5.  **Payment Processing:** Stripe processes the payment using the provided payment details. If the payment is successful, Stripe returns a confirmation to the frontend.


6.  **Payment Completion:** The frontend receives the payment confirmation from Stripe. Depending on the result, it displays a success message to the user or handles any errors encountered during the payment process.

Challenges and Considerations
-----------------------------

### Compliance with Indian Regulations

Indian regulations require export transactions to include a customer name and address. To comply with these regulations, we ensure that customer details are included when creating the PaymentIntent.

### Error Handling

Proper error handling is essential for a smooth user experience. We handle errors gracefully and provide informative messages to the user in case of payment failures or other issues.

### Testing and Debugging

We utilize Stripe's testing tools and logs to debug issues. By checking the Stripe dashboard for payment details and using test card numbers provided by Stripe, we ensure that the payment system functions correctly under various scenarios.

Conclusion
----------

By following these steps and considering the outlined challenges, you can implement a robust payment system that provides a seamless experience for users.