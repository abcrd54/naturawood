import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp() {
  const whatsappNumber = '6281234567890'
  const message = encodeURIComponent('Hello Naturawood, I would like to ask about your table or ready stock.')

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(37,211,102,0.35)] transition hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(37,211,102,0.45)]"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  )
}
