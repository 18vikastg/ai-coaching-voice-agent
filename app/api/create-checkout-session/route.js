// /app/api/create-checkout-session/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Inicializa Stripe con tu clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Usa una versión que esté disponible actualmente
});

export async function POST(req) {
  try {
    const { userEmail } = await req.json();  // Recibimos el correo electrónico del cliente

    console.log('Creando sesión para:', userEmail);

    // Crea un cliente en Stripe utilizando el correo proporcionado
    const customer = await stripe.customers.create({
      email: userEmail,
    });

    // Crear una sesión de pago para que el cliente pague
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,  // Asocia la sesión con el cliente
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Plan Pro - 50,000 Tokens',
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 1000,  // 10 EUR (en centavos)
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/workflow?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?canceled=true`,
      metadata: {
        customerEmail: userEmail,
      },
    });

    // Devuelve la URL de la sesión para redireccionar al cliente
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id,
      customerId: customer.id
    });
  } catch (error) {
    console.error('Error al crear la suscripción:', error);
    return NextResponse.json({ 
      error: error.message || 'Error desconocido' 
    }, { 
      status: 500 
    });
  }
}