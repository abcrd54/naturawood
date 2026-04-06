import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe2, ImagePlus, LogIn, LogOut, Plus, RefreshCcw, Save, Trash2 } from 'lucide-react'
import { supabase, hasSupabaseEnv } from '../lib/supabase'
import {
  fetchProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  productsBucket,
} from '../lib/productsApi'
import {
  fetchHeroSlidesAdmin,
  insertHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  uploadHeroSlideImage,
  heroSlidesBucket,
} from '../lib/heroSlidesApi'
import { useLang } from '../context/LanguageContext'

function createEmptyItem(index) {
  return {
    id: `draft-product-${Date.now()}-${index}`,
    code: `NW-PR-${String(index + 1).padStart(3, '0')}`,
    titleId: '',
    titleEn: '',
    size: '',
    conditionId: '',
    conditionEn: '',
    status: 'ready',
    before: '',
    after: '',
    sortOrder: index + 1,
    isNew: true,
  }
}

function createEmptySlide(index) {
  return {
    id: `draft-slide-${Date.now()}-${index}`,
    slideKey: `hero-${index + 1}`,
    image: '',
    titleId: '',
    titleEn: '',
    subtitleId: '',
    subtitleEn: '',
    sortOrder: index + 1,
    isActive: true,
    isNew: true,
  }
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  )
}

function Notice({ children }) {
  if (!children) return null
  return <div className="mb-6 rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{children}</div>
}

export default function AdminPanelPage() {
  const { lang, toggleLang, t } = useLang()
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [items, setItems] = useState([])
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [uploadingSlideId, setUploadingSlideId] = useState('')
  const [uploadingProductImage, setUploadingProductImage] = useState('')

  const totalItems = useMemo(() => items.length, [items])
  const totalReady = useMemo(() => items.filter((item) => item.status === 'ready').length, [items])
  const totalSoldOut = useMemo(() => items.filter((item) => item.status === 'sold_out').length, [items])
  const totalSlides = useMemo(() => slides.length, [slides])

  useEffect(() => {
    if (!hasSupabaseEnv || !supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  const clearNotice = (timeout = 3000) => {
    window.setTimeout(() => setNotice(''), timeout)
  }

  const loadDashboard = async () => {
    if (!session || !hasSupabaseEnv) {
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const [productsData, slidesData] = await Promise.all([fetchProducts(), fetchHeroSlidesAdmin()])
      setItems(productsData)
      setSlides(slidesData)
      setNotice('')
    } catch (error) {
      setNotice(error.message || 'Gagal memuat data admin.')
      clearNotice()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [session])

  const updateItemField = (id, field, value) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const updateSlideField = (id, field, value) => {
    setSlides((current) => current.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)))
  }

  const addItem = () => setItems((current) => [...current, createEmptyItem(current.length)])
  const addSlide = () => setSlides((current) => [...current, createEmptySlide(current.length)])

  const removeItem = async (item) => {
    if (item.isNew) {
      setItems((current) => current.filter((entry) => entry.id !== item.id))
      return
    }

    try {
      await deleteProduct(item.id)
      setItems((current) => current.filter((entry) => entry.id !== item.id))
      setNotice('Produk berhasil dihapus.')
    } catch (error) {
      setNotice(error.message || 'Gagal menghapus produk.')
    } finally {
      clearNotice()
    }
  }

  const removeSlide = async (slide) => {
    if (slide.isNew) {
      setSlides((current) => current.filter((entry) => entry.id !== slide.id))
      return
    }

    try {
      await deleteHeroSlide(slide.id)
      setSlides((current) => current.filter((entry) => entry.id !== slide.id))
      setNotice('Slide berhasil dihapus.')
    } catch (error) {
      setNotice(error.message || 'Gagal menghapus slide.')
    } finally {
      clearNotice()
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoginError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setLoginError(error.message)
      return
    }

    setEmail('')
    setPassword('')
    setNotice(t.admin.notices.loginSuccess)
    clearNotice(2500)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setItems([])
    setSlides([])
    setNotice(t.admin.notices.loggedOut)
    clearNotice(2500)
  }

  const handleRefresh = async () => {
    await loadDashboard()
    setNotice('Data produk dan slider berhasil diperbarui.')
    clearNotice(2500)
  }

  const handleProductImageUpload = async (itemId, variant, file) => {
    if (!file) return

    const uploadKey = `${itemId}-${variant}`
    setUploadingProductImage(uploadKey)
    try {
      const publicUrl = await uploadProductImage(file, variant)
      updateItemField(itemId, variant, publicUrl)
      setNotice(`Upload gambar produk berhasil. Bucket: ${productsBucket}`)
    } catch (error) {
      setNotice(error.message || 'Upload gambar produk gagal.')
    } finally {
      setUploadingProductImage('')
      clearNotice()
    }
  }

  const handleSlideImageUpload = async (slideId, file) => {
    if (!file) return

    setUploadingSlideId(slideId)
    try {
      const publicUrl = await uploadHeroSlideImage(file)
      updateSlideField(slideId, 'image', publicUrl)
      setNotice(`Upload gambar berhasil. Bucket: ${heroSlidesBucket}`)
    } catch (error) {
      setNotice(error.message || 'Upload gambar slider gagal.')
    } finally {
      setUploadingSlideId('')
      clearNotice()
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index]
        const payload = { ...item, sortOrder: index + 1 }
        if (item.isNew) await insertProduct(payload)
        else await updateProduct(item.id, payload)
      }

      for (let index = 0; index < slides.length; index += 1) {
        const slide = slides[index]
        const payload = {
          ...slide,
          sortOrder: index + 1,
          slideKey: slide.slideKey || `hero-${index + 1}`,
        }

        if (slide.isNew) await insertHeroSlide(payload)
        else await updateHeroSlide(slide.id, payload)
      }

      await loadDashboard()
      setNotice('Produk dan slider berhasil disimpan.')
    } catch (error) {
      setNotice(error.message || 'Gagal menyimpan data.')
    } finally {
      setSaving(false)
      clearNotice()
    }
  }

  if (!hasSupabaseEnv) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-10 text-gray-900 md:px-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-red-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-medium tracking-tight md:text-4xl">{t.admin.panel}</h1>
            <Link to="/" className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50">
              {t.admin.backToWebsite}
            </Link>
          </div>
          <p className="mt-5 text-sm leading-7 text-gray-600">{t.admin.notices.missingEnv}</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-gray-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-500">{t.admin.panel}</p>
              <h1 className="mt-3 text-3xl font-medium tracking-tight text-gray-900">Naturawood Admin</h1>
              <p className="mt-4 text-sm leading-7 text-gray-600">{t.admin.signInHelp}</p>
            </div>
            <button onClick={toggleLang} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"><Globe2 className="h-4 w-4" />{lang === 'id' ? 'ID / EN' : 'EN / ID'}</button>
          </div>

          <form onSubmit={handleLogin} className="mt-8 grid gap-4">
            <Field label={t.admin.email}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900" placeholder="admin@naturawood.com" required />
            </Field>
            <Field label={t.admin.password}>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900" placeholder="••••••••" required />
            </Field>

            {loginError ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loginError}</div> : null}

            <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
              <LogIn className="h-4 w-4" />
              {t.admin.signIn}
            </button>
          </form>

          <Link to="/" className="mt-4 inline-flex text-sm text-gray-600 underline underline-offset-4">
            {t.admin.backToWebsite}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.06)] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">{t.admin.panel}</p>
            <h1 className="mt-3 text-3xl font-medium tracking-tight text-gray-900 md:text-5xl">Kelola produk & hero slider</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
              Sekarang slider homepage dan gambar ready stock bisa diatur dari admin panel. Upload gambar ke Supabase Storage, lalu simpan detail produk, title, dan subtitle langsung dari dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={toggleLang} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"><Globe2 className="h-4 w-4" />{lang === 'id' ? 'ID / EN' : 'EN / ID'}</button>
            <Link to="/" className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50">{t.admin.backToWebsite}</Link>
            <button onClick={handleRefresh} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"><RefreshCcw className="h-4 w-4" />{t.admin.refresh}</button>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"><LogOut className="h-4 w-4" />{t.admin.logout}</button>
            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"><Save className="h-4 w-4" />{saving ? t.admin.saving : t.admin.save}</button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-5">
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"><p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.admin.products}</p><p className="mt-3 text-3xl font-medium text-gray-900">{totalItems}</p></div>
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"><p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.admin.ready}</p><p className="mt-3 text-3xl font-medium text-gray-900">{totalReady}</p></div>
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"><p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.admin.soldOut}</p><p className="mt-3 text-3xl font-medium text-gray-900">{totalSoldOut}</p></div>
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"><p className="text-xs uppercase tracking-[0.25em] text-gray-500">Hero Slides</p><p className="mt-3 text-3xl font-medium text-gray-900">{totalSlides}</p></div>
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"><p className="text-xs uppercase tracking-[0.25em] text-gray-500">Storage Bucket</p><p className="mt-3 text-lg font-medium text-gray-900">{heroSlidesBucket}</p><p className="mt-2 text-xs text-gray-500">Dipakai untuk slider dan ready stock</p></div>
        </div>

        <Notice>{notice}</Notice>

        {loading ? (
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 text-sm text-gray-600 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">Memuat data admin...</div>
        ) : (
          <div className="grid gap-8">
            <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Section 01</p>
                  <h2 className="mt-2 text-2xl font-medium text-gray-900">Ready stock products</h2>
                  <p className="mt-2 text-sm text-gray-600">URL gambar bisa diisi manual atau upload langsung ke Supabase Storage. Folder produk akan tersimpan di bucket <strong>{productsBucket}</strong>.</p>
                </div>
                <button onClick={addItem} className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                  {t.admin.addProduct}
                </button>
              </div>

              <div className="grid gap-6">
                {items.map((item, index) => (
                  <div key={item.id} className="rounded-[2rem] border border-gray-200 bg-gray-50/60 p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t.admin.products} #{index + 1}</p>
                        <h3 className="mt-1 text-xl font-medium text-gray-900">{item.titleId || item.titleEn || item.code}</h3>
                      </div>
                      <button onClick={() => removeItem(item)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"><Trash2 className="h-4 w-4" />{t.admin.delete}</button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      <Field label={t.admin.code}><input value={item.code} onChange={(e) => updateItemField(item.id, 'code', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label={t.admin.titleId}><input value={item.titleId} onChange={(e) => updateItemField(item.id, 'titleId', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label={t.admin.titleEn}><input value={item.titleEn} onChange={(e) => updateItemField(item.id, 'titleEn', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label={t.admin.size}><input value={item.size} onChange={(e) => updateItemField(item.id, 'size', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label={t.admin.conditionId}><textarea value={item.conditionId} onChange={(e) => updateItemField(item.id, 'conditionId', e.target.value)} rows={3} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label={t.admin.conditionEn}><textarea value={item.conditionEn} onChange={(e) => updateItemField(item.id, 'conditionEn', e.target.value)} rows={3} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label={t.admin.before}>
                        <div className="grid gap-3">
                          <input value={item.before} onChange={(e) => updateItemField(item.id, 'before', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" />
                          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50">
                            <ImagePlus className="h-4 w-4" />
                            {uploadingProductImage === `${item.id}-before` ? 'Uploading...' : 'Upload before image'}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleProductImageUpload(item.id, 'before', e.target.files?.[0])} />
                          </label>
                        </div>
                      </Field>
                      <Field label={t.admin.after}>
                        <div className="grid gap-3">
                          <input value={item.after} onChange={(e) => updateItemField(item.id, 'after', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" />
                          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50">
                            <ImagePlus className="h-4 w-4" />
                            {uploadingProductImage === `${item.id}-after` ? 'Uploading...' : 'Upload after image'}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleProductImageUpload(item.id, 'after', e.target.files?.[0])} />
                          </label>
                        </div>
                      </Field>
                      <Field label={t.admin.status}>
                        <select value={item.status} onChange={(e) => updateItemField(item.id, 'status', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900">
                          <option value="ready">{t.admin.statusReady}</option>
                          <option value="sold_out">{t.admin.statusSoldOut}</option>
                        </select>
                      </Field>
                    </div>

                    {(item.before || item.after) ? (
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {item.before ? (
                          <div className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white">
                            <img src={item.before} alt={`${item.titleId || item.titleEn || item.code} before`} className="h-56 w-full object-cover" />
                            <div className="border-t border-gray-100 px-4 py-3 text-xs uppercase tracking-[0.2em] text-gray-500">Before image</div>
                          </div>
                        ) : null}
                        {item.after ? (
                          <div className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white">
                            <img src={item.after} alt={`${item.titleId || item.titleEn || item.code} after`} className="h-56 w-full object-cover" />
                            <div className="border-t border-gray-100 px-4 py-3 text-xs uppercase tracking-[0.2em] text-gray-500">After image</div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Section 02</p>
                  <h2 className="mt-2 text-2xl font-medium text-gray-900">Hero slider</h2>
                  <p className="mt-2 text-sm text-gray-600">Upload gambar langsung ke Supabase Storage. Pastikan bucket <strong>{heroSlidesBucket}</strong> dibuat sebagai public bucket.</p>
                </div>
                <button onClick={addSlide} className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                  Tambah slide
                </button>
              </div>

              <div className="grid gap-6">
                {slides.map((slide, index) => (
                  <div key={slide.id} className="rounded-[2rem] border border-gray-200 bg-gray-50/60 p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Hero Slide #{index + 1}</p>
                        <h3 className="mt-1 text-xl font-medium text-gray-900">{slide.titleId || slide.titleEn || slide.slideKey}</h3>
                      </div>
                      <button onClick={() => removeSlide(slide)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"><Trash2 className="h-4 w-4" />Hapus</button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      <Field label="Slide key"><input value={slide.slideKey} onChange={(e) => updateSlideField(slide.id, 'slideKey', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" placeholder="hero-1" /></Field>
                      <Field label="Title (ID)"><input value={slide.titleId} onChange={(e) => updateSlideField(slide.id, 'titleId', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label="Title (EN)"><input value={slide.titleEn} onChange={(e) => updateSlideField(slide.id, 'titleEn', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label="Subtitle (ID)"><textarea value={slide.subtitleId} onChange={(e) => updateSlideField(slide.id, 'subtitleId', e.target.value)} rows={4} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label="Subtitle (EN)"><textarea value={slide.subtitleEn} onChange={(e) => updateSlideField(slide.id, 'subtitleEn', e.target.value)} rows={4} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" /></Field>
                      <Field label="Image URL">
                        <div className="grid gap-3">
                          <input value={slide.image} onChange={(e) => updateSlideField(slide.id, 'image', e.target.value)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900" />
                          <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50">
                            <ImagePlus className="h-4 w-4" />
                            {uploadingSlideId === slide.id ? 'Uploading...' : 'Upload ke Storage'}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSlideImageUpload(slide.id, e.target.files?.[0])} />
                          </label>
                        </div>
                      </Field>
                      <Field label="Aktif di website?">
                        <select value={slide.isActive ? 'yes' : 'no'} onChange={(e) => updateSlideField(slide.id, 'isActive', e.target.value === 'yes')} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900">
                          <option value="yes">Aktif</option>
                          <option value="no">Nonaktif</option>
                        </select>
                      </Field>
                    </div>

                    {slide.image ? (
                      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white">
                        <img src={slide.image} alt={slide.titleId || slide.titleEn || 'Hero Slide'} className="h-56 w-full object-cover" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
