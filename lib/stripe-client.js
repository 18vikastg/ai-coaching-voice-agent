// /lib/stripe-client.js
import Stripe from "stripe";

// Singleton para el cliente de Stripe
let stripeInstance = null;

export function getStripeInstance() {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });
  }
  return stripeInstance;
}