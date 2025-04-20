// /app/api/get-subscription/route.js
import { NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe-client";

export async function POST(req) {
  try {
    // Obtiene el cliente de Stripe
    const stripe = getStripeInstance();
    
    // Procesa los datos de la solicitud
    const { userEmail } = await req.json();
    
    if (!userEmail) {
      return NextResponse.json({ 
        error: 'Email de usuario requerido' 
      }, { status: 400 });
    }

    console.log('Procesando solicitud de suscripción para:', userEmail);

    // Crea un cliente en Stripe
    const customer = await stripe.customers.create({
      email: userEmail,
    });

    // Crea una sesión de pago
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Plan Pro - 50,000 Tokens',
              description: 'Suscripción mensual al Plan Pro'
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 1000, // 10 EUR
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
      metadata: {
        customerEmail: userEmail,
      },
    });

    // Devuelve la información de la sesión
    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      customerId: customer.id
    });
  } catch (error) {
    console.error('Error al procesar la suscripción:', error);
    return NextResponse.json({ 
      error: error.message || 'Error desconocido' 
    }, { status: 500 });
  }
}