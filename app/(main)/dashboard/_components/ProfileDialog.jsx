"use client";
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Credits from './Credits';

function ProfileDialog({ children }) {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            console.log("Dialog state changing to:", newOpen);
            setOpen(newOpen);
        }}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent onEscapeKeyDown={() => setOpen(false)} onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Perfil</DialogTitle>
                    <DialogDescription asChild>
                        <Credits />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileDialog;