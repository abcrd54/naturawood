import { useEffect, useState } from 'react'

const sectionIds = ['top', 'portfolio', 'ready-stock', 'about', 'contact']

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return undefined

    const findActiveSection = () => {
      const marker = window.scrollY + 140
      let current = 'top'

      sections.forEach((section) => {
        if (marker >= section.offsetTop) current = section.id
      })

      const pageBottom = window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      if (pageBottom >= docHeight - 8) current = 'contact'

      setActiveSection(current)
    }

    findActiveSection()
    window.addEventListener('scroll', findActiveSection, { passive: true })
    window.addEventListener('resize', findActiveSection)

    return () => {
      window.removeEventListener('scroll', findActiveSection)
      window.removeEventListener('resize', findActiveSection)
    }
  }, [])

  return activeSection
}
