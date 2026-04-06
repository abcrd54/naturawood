import { supabase } from './supabase'
import { storageBucket, uploadPublicImage } from './storageApi'

const heroSlidesFolder = 'hero-slides'

function normalizeSlide(item) {
  return {
    id: item.id,
    slideKey: item.slide_key,
    image: item.image_url,
    titleId: item.title_id,
    titleEn: item.title_en,
    subtitleId: item.subtitle_id,
    subtitleEn: item.subtitle_en,
    sortOrder: item.sort_order ?? 0,
    isActive: item.is_active ?? true,
  }
}

export async function fetchHeroSlides() {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('id, slide_key, image_url, title_id, title_en, subtitle_id, subtitle_en, sort_order, is_active')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error

  return (data || []).map(normalizeSlide)
}

export async function fetchHeroSlidesAdmin() {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('id, slide_key, image_url, title_id, title_en, subtitle_id, subtitle_en, sort_order, is_active')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error

  return (data || []).map(normalizeSlide)
}

export async function insertHeroSlide(item) {
  const { error } = await supabase.from('hero_slides').insert({
    slide_key: item.slideKey,
    image_url: item.image,
    title_id: item.titleId,
    title_en: item.titleEn,
    subtitle_id: item.subtitleId,
    subtitle_en: item.subtitleEn,
    sort_order: item.sortOrder ?? 0,
    is_active: item.isActive ?? true,
  })

  if (error) throw error
}

export async function updateHeroSlide(id, item) {
  const { error } = await supabase
    .from('hero_slides')
    .update({
      slide_key: item.slideKey,
      image_url: item.image,
      title_id: item.titleId,
      title_en: item.titleEn,
      subtitle_id: item.subtitleId,
      subtitle_en: item.subtitleEn,
      sort_order: item.sortOrder ?? 0,
      is_active: item.isActive ?? true,
    })
    .eq('id', id)

  if (error) throw error
}

export async function deleteHeroSlide(id) {
  const { error } = await supabase.from('hero_slides').delete().eq('id', id)
  if (error) throw error
}

export async function uploadHeroSlideImage(file) {
  return uploadPublicImage(file, heroSlidesFolder)
}

export { storageBucket as heroSlidesBucket }
