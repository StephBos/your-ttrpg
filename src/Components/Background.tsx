import React, { useEffect, useState } from 'react'

type BackgroundProps = {
   interval?: number
   transitionDuration?: number
   children?: React.ReactNode
}

export default function Background({
   interval = 5000,
   transitionDuration = 1000,
   children = null,
}: BackgroundProps) {
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const [isTransitioning, setIsTransitioning] = useState(false)

   const images = ['/background1.jpg', '/background2.jpg', '/background3.jpg']

   useEffect(() => {
      const intervalId = setInterval(() => {
         setIsTransitioning(true)
         const timeoutId = setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
            setIsTransitioning(false)
         }, transitionDuration)
         return () => clearTimeout(timeoutId)
      }, interval)

      return () => clearInterval(intervalId)
   }, [images.length, interval, transitionDuration])

   return (
      <div className="absolute inset-0 w-full h-full">
         {images.map((image, index) => (
            <div
               key={image}
               className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity ease-in-out ${
                  index === currentImageIndex && !isTransitioning
                     ? 'opacity-100'
                     : 'opacity-0'
               }`}
               style={{
                  backgroundImage: `url('${image}')`,
                  transitionDuration: `${transitionDuration}ms`,
               }}
            />
         ))}

         {children && <div className="relative z-10">{children}</div>}
      </div>
   )
}
