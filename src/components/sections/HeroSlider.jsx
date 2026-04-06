import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides as fallbackSlides } from '../../data/siteData'
import { useLang } from '../../context/LanguageContext'
import { fetchHeroSlides } from '../../lib/heroSlidesApi'
import { hasSupabaseEnv } from '../../lib/supabase'

const HERO_SLIDES_CACHE_KEY = 'naturawood-hero-slides-cache-v1'

function readHeroSlidesCache() {
  if (typeof window === 'undefined') return fallbackSlides

  try {
    const raw = window.sessionStorage.getItem(HERO_SLIDES_CACHE_KEY)
    if (!raw) return fallbackSlides

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : fallbackSlides
  } catch {
    return fallbackSlides
  }
}

function normalizeSlides(data = []) {
  return data.map((slide, slideIndex) => ({
    id: slide.slideKey || slide.id || `hero-${slideIndex + 1}`,
    image: slide.image || slide.image_url || '',
    titleId: slide.titleId || '',
    titleEn: slide.titleEn || '',
    subtitleId: slide.subtitleId || '',
    subtitleEn: slide.subtitleEn || '',
  }))
}

function HeroSliderSkeleton() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/60" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-12 pt-28 md:px-10 md:pb-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 h-3 w-28 rounded-full bg-white/20" />
            <div className="h-14 w-full max-w-2xl rounded-2xl bg-white/20 md:h-20" />
            <div className="mt-4 h-14 w-4/5 rounded-2xl bg-white/15 md:h-20" />
            <div className="mt-6 h-4 w-full max-w-xl rounded-full bg-white/15" />
            <div className="mt-3 h-4 w-3/4 rounded-full bg-white/10" />

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="h-12 w-40 rounded-full bg-white/20" />
              <div className="h-12 w-36 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="justify-self-end">
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full border border-white/15 bg-white/10" />
                <div className="h-11 w-11 rounded-full border border-white/15 bg-white/10" />
              </div>
              <div className="mt-6 flex gap-2">
                <div className="h-1.5 w-10 rounded-full bg-white/30" />
                <div className="h-1.5 w-4 rounded-full bg-white/20" />
                <div className="h-1.5 w-4 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HeroSlider() {
  const { t } = useLang()
  const cachedSlides = readHeroSlidesCache()

  const [slidesData, setSlidesData] = useState(() => cachedSlides)
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(() => !cachedSlides?.length)

  useEffect(() => {
    let isMounted = true

    async function loadSlides() {
      if (!hasSupabaseEnv) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(!cachedSlides?.length)

        const data = await fetchHeroSlides()
        if (!isMounted) return

        if (Array.isArray(data) && data.length) {
          const nextSlides = normalizeSlides(data)
          setSlidesData(nextSlides)
          window.sessionStorage.setItem(HERO_SLIDES_CACHE_KEY, JSON.stringify(nextSlides))
        }
      } catch {
        // tetap pakai cache/fallback
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadSlides()

    return () => {
      isMounted = false
    }
  }, [])

  const slides = useMemo(() => {
    return slidesData.map((slide, slideIndex) => ({
      ...slide,
      title:
        slide.titleId ||
        slide.titleEn ||
        t.hero.slides?.[slideIndex]?.title ||
        '',
      subtitle:
        slide.subtitleId ||
        slide.subtitleEn ||
        t.hero.slides?.[slideIndex]?.subtitle ||
        '',
    }))
  }, [slidesData, t])

  useEffect(() => {
    if (!slides.length) return

    const firstImage = slides[0]?.image
    if (!firstImage) return

    const img = new Image()
    img.src = firstImage
  }, [slides])

  useEffect(() => {
    if (!slides.length) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    if (!slides.length) return
    setIndex((current) => (current >= slides.length ? 0 : current))
  }, [slides.length])

  if (isLoading && !slides.length) {
    return <HeroSliderSkeleton />
  }

  if (!slides.length) return null

  const active = slides[index]
  const goPrev = () => setIndex((current) => (current - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((current) => (current + 1) % slides.length)

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <AnimatePresence mode="wait">
        <motion.img
          key={active.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          src={active.image}
          alt={active.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/60" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-12 pt-28 md:px-10 md:pb-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-content`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/75">
                {t.hero.brand}
              </p>

              <h1 className="text-4xl font-medium leading-tight tracking-tight md:text-6xl">
                {active.title}
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/82 md:text-base">
                {active.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#archive"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium !text-black transition hover:bg-gray-100"
                >
                  {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="justify-self-end"
          >
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:p-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  className="rounded-full border border-white/15 p-3 text-white/90 transition hover:bg-white/10"
                  aria-label="Previous slide"
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={goNext}
                  className="rounded-full border border-white/15 p-3 text-white/90 transition hover:bg-white/10"
                  aria-label="Next slide"
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 flex gap-2">
                {slides.map((slide, slideIndex) => (
                  <button
                    key={slide.id}
                    onClick={() => setIndex(slideIndex)}
                    className={`h-1.5 rounded-full transition ${
                      index === slideIndex ? 'w-10 bg-white' : 'w-4 bg-white/35'
                    }`}
                    aria-label={slide.title}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}