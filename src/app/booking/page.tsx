'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookingForm } from '@/components/booking/BookingForm'
import Navigation from '@/components/Navigation'
// import { useSession, signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import FAQAccordion from '@/components/shared/FAQAccordion'
import { paymentFAQs } from '@/lib/faq/data'

export default function BookingPage() {
  const isTourist = true

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
          alt="Travelers planning their adventure together"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[4px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-ui-blue-primary/15 via-ui-purple-primary/10 to-ui-purple-accent/15" />
      </div>
      <div className="absolute inset-0 pattern-dots opacity-10" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation variant="tourist" />

        <main className="container mx-auto px-4 py-16 flex-1">
          <section aria-labelledby="booking-heading" className="max-w-4xl mx-auto mb-8 text-center">
            <h1 id="booking-heading" className="text-4xl font-bold mb-4 text-white text-shadow-lg">Book Your Local Guide</h1>
            <p className="text-white text-lg text-shadow">
              Tell us about your trip and we'll match you with the perfect local student
              guide
            </p>
          </section>

          <section aria-labelledby="disclaimer-booking-heading" className="glass-frosted bg-gradient-to-br from-amber-50/90 to-yellow-50/90 border-2 border-amber-600 rounded-2xl p-6 mb-8 max-w-4xl mx-auto shadow-premium hover-lift">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 rounded-xl bg-amber-600 text-white shadow-soft" aria-hidden="true">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 id="disclaimer-booking-heading" className="font-bold text-amber-900 mb-2 text-lg">Marketplace Notice</h2>
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>WanderNest is a connection platform only.</strong> We do not handle payments, guarantee service quality, or assume liability. All services and payments are arranged directly between you and your chosen guide.
                </p>
              </div>
            </div>
          </section>

          <div className="relative">
            <BookingForm />
          </div>

          <section aria-label="Frequently asked questions" className="mt-16">
            <FAQAccordion faqs={paymentFAQs} title="Common Questions" />
          </section>
        </main>
      </div>
    </div>
  )
}
