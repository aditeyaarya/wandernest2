import Link from 'next/link'
import CTATileBase from './CTATileBase'

/**
 * Student CTA Tile Component
 *
 * Elegant, image-based CTA tile for students to become guides.
 * Links to the student landing page.
 *
 * Design features:
 * - Full-bleed background: Student-themed image (campus/studying)
 * - Minimal default state: Just the word "Student" in elegant serif
 * - Hover reveals: Description and explore arrow with smooth 150ms transition
 * - Fully clickable: Entire tile acts as navigation link
 *
 * Background image source: Unsplash - Students studying on university campus
 */

export default function StudentCTA() {
  return (
    <Link href="/student" className="block">
      <CTATileBase
        backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=85"
        imageAlt="University students walking on campus with books and backpacks"
        headline="Student"
        description="Earn by guiding travelers. Show your city and share local insights."
        gradientFrom="from-purple-600/40"
        gradientVia="via-purple-700/50"
        gradientTo="to-pink-600/40"
      />
    </Link>
  )
}
