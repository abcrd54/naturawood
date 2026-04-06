import { supabase } from './supabase'

export async function fetchReadyStock() {
  const { data, error } = await supabase
    .from('ready_stock')
    .select('id, code, title, size, condition, before_image, after_image, sort_order')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error

  return (data || []).map((item) => ({
    id: item.id,
    code: item.code,
    title: item.title,
    size: item.size,
    condition: item.condition,
    before: item.before_image,
    after: item.after_image,
    sortOrder: item.sort_order ?? 0,
  }))
}

export async function insertReadyStock(item) {
  const { error } = await supabase.from('ready_stock').insert({
    code: item.code,
    title: item.title,
    size: item.size,
    condition: item.condition,
    before_image: item.before,
    after_image: item.after,
    sort_order: item.sortOrder ?? 0,
  })

  if (error) throw error
}

export async function updateReadyStock(id, item) {
  const { error } = await supabase
    .from('ready_stock')
    .update({
      code: item.code,
      title: item.title,
      size: item.size,
      condition: item.condition,
      before_image: item.before,
      after_image: item.after,
      sort_order: item.sortOrder ?? 0,
    })
    .eq('id', id)

  if (error) throw error
}

export async function deleteReadyStock(id) {
  const { error } = await supabase.from('ready_stock').delete().eq('id', id)
  if (error) throw error
}
