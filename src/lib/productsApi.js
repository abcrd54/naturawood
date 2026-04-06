import { supabase } from './supabase'
import { storageBucket, uploadPublicImage } from './storageApi'

function normalizeItem(item) {
  return {
    id: item.id,
    code: item.code,
    titleId: item.title_id,
    titleEn: item.title_en,
    size: item.size,
    conditionId: item.condition_id,
    conditionEn: item.condition_en,
    status: item.status ?? 'ready',
    before: item.before_image,
    after: item.after_image,
    sortOrder: item.sort_order ?? 0,
  }
}

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, code, title_id, title_en, size, condition_id, condition_en, status, before_image, after_image, sort_order')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error

  return (data || []).map(normalizeItem)
}

export async function insertProduct(item) {
  const { error } = await supabase.from('products').insert({
    code: item.code,
    title_id: item.titleId,
    title_en: item.titleEn,
    size: item.size,
    condition_id: item.conditionId,
    condition_en: item.conditionEn,
    status: item.status,
    before_image: item.before,
    after_image: item.after,
    sort_order: item.sortOrder ?? 0,
  })

  if (error) throw error
}

export async function updateProduct(id, item) {
  const { error } = await supabase
    .from('products')
    .update({
      code: item.code,
      title_id: item.titleId,
      title_en: item.titleEn,
      size: item.size,
      condition_id: item.conditionId,
      condition_en: item.conditionEn,
      status: item.status,
      before_image: item.before,
      after_image: item.after,
      sort_order: item.sortOrder ?? 0,
    })
    .eq('id', id)

  if (error) throw error
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function uploadProductImage(file, variant = 'before') {
  const folder = variant === 'after' ? 'ready-stock/after' : 'ready-stock/before'
  return uploadPublicImage(file, folder)
}

export { storageBucket as productsBucket }
