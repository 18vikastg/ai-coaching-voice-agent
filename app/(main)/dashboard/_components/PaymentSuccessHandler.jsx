"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '@/app/_context/UserContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

export default function PaymentSuccessHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get('success');
  const sessionId = searchParams.get('session_id');
  const { userData, setUserData } = useContext(UserContext);
  
  // Usar useRef para rastrear procesamiento
  const processingRef = useRef(false);
  const processedSessionsRef = useRef(new Set());
  
  const updateUserSubscription = useMutation(api.users.updateUserSubscription);

  useEffect(() => {
    const verifyPayment = async () => {
      // Condiciones para evitar reprocesamiento
      if (
        success !== 'true' || 
        !sessionId || 
        !userData?._id || 
        processingRef.current || 
        processedSessionsRef.current.has(sessionId)
      ) {
        return;
      }

      // Bloquear procesamiento
      processingRef.current = true;
      processedSessionsRef.current.add(sessionId);

      try {
        const response = await fetch('/api/update-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            userId: userData._id
          }),
        });

        const data = await response.json();
        
        if (data.success && data.subscriptionId) {
          // Actualizar suscripción en Convex
          await updateUserSubscription({
            id: userData._id,
            subscriptionId: data.subscriptionId,
            credits: 50000
          });
          
          // Actualizar contexto de usuario
          setUserData(prev => ({
            ...prev,
            subscriptionId: data.subscriptionId,
            credits: 50000
          }));
          
          // Mostrar mensaje de éxito
          toast.success('¡Suscripción activada! Ahora tienes acceso al Plan Pro con 50,000 tokens.');

          // Redirigir para prevenir bucle
          router.replace('/dashboard');
        } else {
          toast.error('No se pudo verificar la suscripción');
        }
      } catch (error) {
        console.error('Error al verificar el pago:', error);
        toast.error('Error al verificar el estado de la suscripción');
      } finally {
        // Liberar bloqueo
        processingRef.current = false;
      }
    };

    verifyPayment();
  }, [success, sessionId, userData, updateUserSubscription, setUserData, router]);

  return null;
}