import { supabase } from './supabase'

export const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'website-assets'

export async function uploadPublicImage(file, folder = 'uploads') {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.')

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`

  const { error: uploadError } = await supabase.storage.from(storageBucket).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(storageBucket).getPublicUrl(fileName)

  if (!data?.publicUrl) {
    throw new Error('Gagal mendapatkan public URL gambar.')
  }

  return data.publicUrl
}
