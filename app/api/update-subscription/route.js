// /app/api/update-subscription/route.js
import { NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe-client";

// Caché para rastrear sesiones ya procesadas
const processedSessions = new Set();

export async function POST(req) {
  try {
    // Parseo seguro del cuerpo de la solicitud
    const body = await req.text();
    const { sessionId, userId } = body ? JSON.parse(body) : {};
    
    // Validaciones iniciales
    if (!sessionId || !userId) {
      return NextResponse.json({ 
        error: 'Session ID y User ID son requeridos' 
      }, { status: 400 });
    }

    // Prevenir procesamiento duplicado
    if (processedSessions.has(sessionId)) {
      return NextResponse.json({
        success: false,
        message: 'Sesión ya procesada'
      });
    }

    console.log('Verificando sesión:', sessionId, 'para usuario:', userId);
    
    const stripe = getStripeInstance();
    
    // Verificar el estado de la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Verificar si la sesión fue pagada exitosamente
    if (session.payment_status === 'paid' && session.status === 'complete') {
      // Obtener el ID de suscripción
      const subscriptionId = session.subscription;
      
      // Si hay una suscripción, devolver la información para actualizar en Convex
      if (subscriptionId) {
        // Marcar sesión como procesada
        processedSessions.add(sessionId);

        // Limpiar caché periódicamente para evitar memory leak
        if (processedSessions.size > 100) {
          processedSessions.clear();
        }

        return NextResponse.json({
          success: true,
          subscriptionId,
          userId
        });
      }
    }
    
    // Si no se completó el pago o no hay suscripción
    return NextResponse.json({
      success: false,
      message: 'La sesión no está completa o no tiene una suscripción asociada'
    });
    
  } catch (error) {
    console.error('Error al actualizar estado de suscripción:', error);
    return NextResponse.json({ 
      error: error.message || 'Error desconocido' 
    }, { status: 500 });
  }
}