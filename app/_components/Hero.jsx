import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { AuroraText } from '@/components/magicui/aurora-text'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Hero() {
    return (
        <div className='flex flex-col items-center mt-20 px-10 md:px-20 lg:px-36 xl:px-52'>
            <div className="group max-w-md relative mx-auto flex items-center justify-center rounded-full px-4 
            py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
                <span
                    className={
                        "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                    }
                    style={{
                        WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "destination-out",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "subtract",
                        WebkitClipPath: "padding-box",
                    }}
                />
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <AnimatedGradientText className="text-sm font-medium">
                    Introducing Magic UI
                </AnimatedGradientText>
                <ChevronRight
                    className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
                />
            </div>

            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl text-center mt-5 lg:text-7xl">
                Revolutionize Learning with <AuroraText> AI-Powered Voice Agent </AuroraText>🎙️📚
            </h1>

            <Link href={'/dashboard'}>
                <RainbowButton className="bg-black mt-7" variant="default">Get Started!</RainbowButton>
            </Link>
            <div className='max-w-2xl'>
                <HeroVideoDialog
                    className="block dark:hidden mt-8 h-[200px]"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="/image.png"
                    thumbnailAlt="Hero Video"
                />
            </div>

        </div>
    )
}

export default Hero