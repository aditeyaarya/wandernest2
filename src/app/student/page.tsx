import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import ModernFAQ from '@/components/student/ModernFAQ'
import { DollarSign, Clock, Users } from 'lucide-react'

export default function StudentLandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80"
          alt="Beautiful Paris street scene with classic architecture"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[4px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-ui-purple-primary/20 via-ui-purple-accent/15 to-ui-blue-primary/20" />
      </div>
      <div className="absolute inset-0 pattern-grid opacity-15" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation variant="student" />

        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-16">

            <section aria-labelledby="student-hero-heading" className="text-center space-y-6 animate-slide-up-fade">
              <h1 id="student-hero-heading" className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white text-shadow-lg">
                Earn More Than{' '}
                <span className="text-gradient-vibrant animate-gradient-shift inline-block bg-white/10 px-4 py-2 rounded-2xl">
                  Campus Jobs
                </span>
                <br />
                While Sharing Your City
              </h1>

              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium text-shadow">
                Host visitors from your home country in Paris or London and earn more than typical student jobs.
                Choose your schedule, meet interesting people, and share your local knowledge.
              </p>

              <div className="flex justify-center gap-4 pt-4">
                <Link href="/student/onboarding">
                  <Button size="lg" className="text-lg px-10 py-7 gradient-vibrant hover:shadow-glow-purple shadow-premium text-white font-semibold group hover-lift">
                    Explore Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">→</span>
                  </Button>
                </Link>
              </div>
            </section>

            <section aria-labelledby="benefits-heading" className="backdrop-blur-md rounded-3xl shadow-xl border-2 border-white/40 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80"
                  alt="Arc de Triomphe and Paris landmarks"
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-white/85 backdrop-blur-md" />
              <div className="relative z-10 p-8 md:p-12">
                <h2 id="benefits-heading" className="text-4xl font-bold text-center mb-12">Why Guide with WanderNest?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <article className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 shadow-soft hover:shadow-premium hover-lift-lg group border-2 border-ui-blue-primary/60 hover:border-ui-blue-accent/60 transition-all">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-ui-blue-primary to-ui-blue-secondary text-white mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg" aria-hidden="true">
                    <DollarSign className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Earn More</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    Make significantly more than standard campus jobs with flexible hours
                  </p>
                </article>

                <article className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 shadow-soft hover:shadow-premium hover-lift-lg group border-2 border-ui-purple-primary/60 hover:border-ui-purple-accent/60 transition-all">
                  <div className="inline-flex p-3 rounded-xl gradient-vibrant text-white mb-4 group-hover:scale-110 transition-all duration-300 shadow-glow-purple" aria-hidden="true">
                    <Clock className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Fully Flexible</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    Choose your own time slots and work around your class schedule
                  </p>
                </article>

                <article className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 shadow-soft hover:shadow-premium hover-lift-lg group border-2 border-ui-success/60 hover:border-ui-success/60 transition-all">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-ui-success to-ui-success text-white mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg" aria-hidden="true">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Cultural Connection</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    Meet visitors from your home country and share your culture
                  </p>
                </article>
                </div>
              </div>
            </section>

            <section aria-labelledby="how-it-works-student-heading" className="space-y-8">
              <h2 id="how-it-works-student-heading" className="text-4xl font-bold text-center text-white text-shadow-lg">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <article className="text-center space-y-4 group hover-lift">
                  <div className="w-20 h-20 gradient-ocean rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold text-white shadow-premium group-hover:shadow-glow-blue group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                    1
                  </div>
                  <h3 className="font-bold text-lg text-white">Sign In</h3>
                  <p className="text-sm text-white/90 leading-relaxed font-medium">
                    Use your student email (.edu) to sign in with Google
                  </p>
                </article>

                <article className="text-center space-y-4 group hover-lift">
                  <div className="w-20 h-20 gradient-vibrant rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold text-white shadow-premium group-hover:shadow-glow-purple group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                    2
                  </div>
                  <h3 className="font-bold text-lg text-white">Verify Status</h3>
                  <p className="text-sm text-white/90 leading-relaxed font-medium">
                    Upload your student ID to confirm your enrollment
                  </p>
                </article>

                <article className="text-center space-y-4 group hover-lift">
                  <div className="w-20 h-20 bg-gradient-to-br from-ui-success to-ui-success rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold text-white shadow-premium group-hover:shadow-soft group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                    3
                  </div>
                  <h3 className="font-bold text-lg text-white">Create Profile</h3>
                  <p className="text-sm text-white/90 leading-relaxed font-medium">
                    Describe your ideal day-out and share your expertise
                  </p>
                </article>

                <article className="text-center space-y-4 group hover-lift">
                  <div className="w-20 h-20 gradient-sunset rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold text-white shadow-premium group-hover:shadow-soft group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                    4
                  </div>
                  <h3 className="font-bold text-lg text-white">Get Requests</h3>
                  <p className="text-sm text-white/90 leading-relaxed font-medium">
                    Set your availability and start receiving booking requests
                  </p>
                </article>
              </div>
            </section>

            <ModernFAQ />

            <section aria-label="Additional benefits" className="grid md:grid-cols-2 gap-8">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Students working together and networking"
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
                  <div className="text-white space-y-2">
                    <h3 className="text-2xl font-bold">Build Your Network</h3>
                    <p className="text-sm text-white/90">
                      Connect with travelers from around the world and expand your cultural horizons
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80"
                  alt="Students celebrating success and achievement"
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
                  <div className="text-white space-y-2">
                    <h3 className="text-2xl font-bold">Earn While You Learn</h3>
                    <p className="text-sm text-white/90">
                      Make meaningful income on your own schedule while pursuing your degree
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="cta-heading" className="text-center space-y-6 py-12">
              <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">Ready to Start Earning?</h2>
              <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed font-medium text-shadow">
                Join hundreds of students already earning flexible income by sharing their city with visitors.
              </p>
              <Link href="/student/signin">
                <Button size="lg" className="text-lg px-10 py-7 gradient-vibrant hover:shadow-glow-purple shadow-premium text-white font-semibold group hover-lift-lg">
                  Explore Now
                  <span className="ml-2 group-hover:translate-x-2 transition-transform inline-block" aria-hidden="true">→</span>
                </Button>
              </Link>
            </section>

          </div>
        </main>

        <footer className="border-t border-white/20 bg-white/5 backdrop-blur-md mt-auto">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm text-white/90 text-shadow-sm">
              &copy; {new Date().getFullYear()} WanderNest. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
