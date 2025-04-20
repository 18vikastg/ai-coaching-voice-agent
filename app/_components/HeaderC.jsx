import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HeaderC() {
    return (
        <div className='p-4 flex justify-between items-center shadow-sm'>
            <Image src={'/logo.svg'} alt='logo' width={140} height={100} />
            <Link href={'/dashboard'}>
                <Button className={'cursor-pointer'}
                >Get Started</Button>
            </Link>
        </div>
    )
}

export default HeaderC