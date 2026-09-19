import { useEffect, useState } from 'react'

const EASE_ENTRANCE = 'cubic-bezier(0.16, 1, 0.3, 1)'

// 恋爱起始日期：2025年5月18日 00:00:00
const LOVE_START = new Date('2025-05-18T00:00:00').getTime()

function getLoveDuration() {
  const now = Date.now()
  const diff = now - LOVE_START
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [duration, setDuration] = useState(getLoveDuration())

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(getLoveDuration())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-end justify-center">
      {/* Background video */}
      <div
        className="absolute inset-0 transition-all duration-[1400ms]"
        style={{
          transitionTimingFunction: EASE_ENTRANCE,
          opacity: videoReady ? 1 : 0,
          transform: videoReady ? 'scale(1)' : 'scale(1.05)',
        }}
      >
        <video
          src="/media/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onDoubleClick={() => {
            const el = document.documentElement
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else {
              el.requestFullscreen?.()
            }
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Foreground — 恋爱计时 */}
      <div className="relative z-10 text-center px-6 pb-16 md:pb-24 max-w-4xl mx-auto">
        <h1
          className="font-art text-white text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 tracking-[0.2em] font-light transition-all duration-900"
          style={{
            transitionTimingFunction: EASE_ENTRANCE,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(2rem)',
            transitionDelay: mounted ? '400ms' : '0ms',
          }}
        >
          朝暮与共，行至天光
        </h1>

        <div
          className="flex items-center justify-center gap-3 md:gap-6 transition-all duration-900"
          style={{
            transitionTimingFunction: EASE_ENTRANCE,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(2rem)',
            transitionDelay: mounted ? '600ms' : '0ms',
          }}
        >
          <div className="text-center">
            <div className="font-instrument text-white text-4xl md:text-6xl lg:text-7xl leading-none">
              {duration.days}
            </div>
            <div className="text-white/50 text-xs md:text-sm mt-1 md:mt-2">天</div>
          </div>
          <div className="font-instrument text-white/40 text-3xl md:text-5xl lg:text-6xl leading-none">:</div>
          <div className="text-center">
            <div className="font-instrument text-white text-4xl md:text-6xl lg:text-7xl leading-none">
              {pad(duration.hours)}
            </div>
            <div className="text-white/50 text-xs md:text-sm mt-1 md:mt-2">时</div>
          </div>
          <div className="font-instrument text-white/40 text-3xl md:text-5xl lg:text-6xl leading-none">:</div>
          <div className="text-center">
            <div className="font-instrument text-white text-4xl md:text-6xl lg:text-7xl leading-none">
              {pad(duration.minutes)}
            </div>
            <div className="text-white/50 text-xs md:text-sm mt-1 md:mt-2">分</div>
          </div>
          <div className="font-instrument text-white/40 text-3xl md:text-5xl lg:text-6xl leading-none">:</div>
          <div className="text-center">
            <div className="font-instrument text-white text-4xl md:text-6xl lg:text-7xl leading-none">
              {pad(duration.seconds)}
            </div>
            <div className="text-white/50 text-xs md:text-sm mt-1 md:mt-2">秒</div>
          </div>
        </div>
      </div>
    </section>
  )
}
