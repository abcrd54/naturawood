import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from '../components/layout/Header'
import MobileMenu from '../components/layout/MobileMenu'
import Footer from '../components/layout/Footer'
import HeroSlider from '../components/sections/HeroSlider'
import PortfolioSection from '../components/sections/PortfolioSection'
import ReadyStockSection from '../components/sections/ReadyStockSection'
import AboutSection from '../components/sections/AboutSection'
import OrderFlowSection from '../components/sections/OrderFlowSection'
import ContactSection from '../components/sections/ContactSection'
import ProductDialog from '../components/ui/ProjectDialog'
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp'
import { hasSupabaseEnv } from '../lib/supabase'
import { fetchProducts } from '../lib/productsApi'
import useActiveSection from '../hooks/useActiveSection'
import { useLang } from '../context/LanguageContext'

const PRODUCTS_CACHE_KEY = 'naturawood-products-cache-v1'
const PRODUCTS_SCROLL_KEY = 'naturawood-scroll-y-v1'

function readProductsCache() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.sessionStorage.getItem(PRODUCTS_CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function NaturawoodWebsite() {
  const { lang, t } = useLang()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dialogItemSlug, setDialogItemSlug] = useState(null)
  const [productItems, setProductItems] = useState(() => readProductsCache())
  const [loadingProducts, setLoadingProducts] = useState(() => readProductsCache().length === 0)
  const [productsError, setProductsError] = useState('')
  const activeSection = useActiveSection()

  useEffect(() => {
    async function load() {
      if (!hasSupabaseEnv) {
        setProductsError('Missing Supabase environment variables.')
        setLoadingProducts(false)
        return
      }

      try {
        const items = await fetchProducts()
        setProductItems(items)
        window.sessionStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(items))
        setProductsError('')
      } catch (error) {
        setProductsError(error.message || 'Failed to load products.')
      } finally {
        setLoadingProducts(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    const savedScrollY = window.sessionStorage.getItem(PRODUCTS_SCROLL_KEY)
    if (!savedScrollY) return

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: Number(savedScrollY) || 0, behavior: 'instant' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const saveScrollPosition = () => {
      window.sessionStorage.setItem(PRODUCTS_SCROLL_KEY, String(window.scrollY || 0))
    }

    saveScrollPosition()
    window.addEventListener('scroll', saveScrollPosition, { passive: true })
    window.addEventListener('pagehide', saveScrollPosition)
    window.addEventListener('visibilitychange', saveScrollPosition)

    return () => {
      window.removeEventListener('scroll', saveScrollPosition)
      window.removeEventListener('pagehide', saveScrollPosition)
      window.removeEventListener('visibilitychange', saveScrollPosition)
    }
  }, [])

  const mappedProducts = useMemo(
    () =>
      productItems.map((item) => ({
        ...item,
        displayTitle: lang === 'id' ? item.titleId || item.titleEn : item.titleEn || item.titleId,
        displayCondition: lang === 'id' ? item.conditionId || item.conditionEn : item.conditionEn || item.conditionId,
      })),
    [lang, productItems]
  )

  const readyStockItems = mappedProducts.filter((item) => item.status === 'ready')
  const soldOutItems = mappedProducts.filter((item) => item.status === 'sold_out')

  const soldOutArchiveItems = useMemo(
    () =>
      soldOutItems.map((item, index) => ({
        slug: `product-${item.id || item.code || index}`,
        category: 'Sold Out Product',
        categoryLabel: t.portfolio.soldOutCategory,
        title: item.displayTitle,
        size: item.size,
        material: item.displayCondition || 'Naturawood Product',
        after: item.after,
        before: item.before || item.after,
        description: t.portfolio.dialogDescription,
        longDescription: t.portfolio.dialogLongDescription,
      })),
    [soldOutItems, t]
  )

  const dialogItem = useMemo(
    () => soldOutArchiveItems.find((item) => item.slug === dialogItemSlug) ?? null,
    [dialogItemSlug, soldOutArchiveItems]
  )

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900">
      <Header onOpenMenu={() => setMobileMenuOpen(true)} activeSection={activeSection} />

      <main className="w-full overflow-x-hidden">
        <HeroSlider />
        <PortfolioSection items={soldOutArchiveItems} onOpen={setDialogItemSlug} />
        <ReadyStockSection items={readyStockItems} loading={loadingProducts} error={productsError} />
        <AboutSection />
        <OrderFlowSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <AnimatePresence>
        {mobileMenuOpen ? (
          <MobileMenu
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            activeSection={activeSection}
          />
        ) : null}
      </AnimatePresence>

      <ProductDialog project={dialogItem} onClose={() => setDialogItemSlug(null)} />
    </div>
  )
}
