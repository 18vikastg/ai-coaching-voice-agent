import { UserContext } from '@/app/_context/UserContext'
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@stackframe/stack';
import { Wallet2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

function Credits() {
    const { userData } = useContext(UserContext);
    const user = useUser();
    const [loading, setLoading] = useState(false);

    const calculateProgress = () => {
        if (userData?.subscriptionId) {
            return (userData.credits / 50000) * 100;
        } else {
            return (userData.credits / 5000) * 100;
        }
    }

    const handleUpgrade = async () => {
        try {
            setLoading(true);
            
            const response = await fetch('/api/get-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: user?.primaryEmail,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                console.error('Error:', data.error);
                toast.error('Error al crear sesión de pago');
                setLoading(false);
                return;
            }

            // Redirige a la página de pago de Stripe
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No se recibió URL de redirección');
            }
            
        } catch (error) {
            console.error('Error al procesar la actualización:', error);
            toast.error('Ha ocurrido un error. Inténtalo de nuevo.');
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex gap-5 items-center'>
                <Image src={user?.profileImageUrl || '/placeholder-avatar.png'} alt='user' width={60} height={60}
                    className='rounded-full'
                />
                <div>
                    <h2 className='text-lg font-bold'>{user?.displayName || 'Usuario'}</h2>
                    <h2 className='text-gray-500'>{user?.primaryEmail || 'correo@ejemplo.com'}</h2>
                </div>
            </div>
            <hr className='my-3' />
            <div>
                <h2 className='font-bold'>Token Usage</h2>
                <h2>{userData?.credits || 0}/{userData?.subscriptionId ? '50,000' : '5,000'}</h2>
                <Progress value={calculateProgress()} className='my-3' />

                <div className='flex justify-between items-center mt-3'>
                    <h2 className='font-bold'>Current Plan</h2>
                    <h2 className='p-1 bg-secondary rounded-lg px-2'>
                        {userData?.subscriptionId ? 'Pro Plan' : 'Free Plan'}
                    </h2>
                </div>

                {!userData?.subscriptionId && (
                    <div className='mt-5 p-5 border rounded-2xl'>
                        <div className='flex justify-between'>
                            <div>
                                <h2 className='font-bold'>Pro Plan</h2>
                                <h2>50,000 Tokens</h2>
                            </div>
                            <h2 className='font-bold'>$10/Month</h2>
                        </div>
                        <hr className='my-3' />
                        <Button 
                            className='w-full' 
                            onClick={handleUpgrade}
                            disabled={loading}
                        > 
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Wallet2 className="mr-2" /> Upgrade $10
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Credits