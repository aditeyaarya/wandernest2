import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function MainLanding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="max-w-4xl mx-auto px-4 text-center space-y-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-3">
            <span className="text-6xl">🌍</span>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WanderNest
            </h1>
          </div>
          <nav className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/student">
              <Button variant="outline" size="lg">For Students</Button>
            </Link>
            <Link href="/tourist">
              <Button variant="outline" size="lg">For Tourists</Button>
            </Link>
            <Link href="/student/signin">
              <Button variant="ghost" size="lg">Student Login</Button>
            </Link>
            <Link href="/tourist/dashboard">
              <Button variant="ghost" size="lg">Tourist Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Experience{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Authentic Travel
            </span>
            <br />
            with Local Student Guides
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified university students who will show you their city
            through a local's eyes. Get personalized recommendations and authentic
            experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Students</h3>
            <p className="text-gray-600">All guides are verified university students with valid student IDs</p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fair Pricing</h3>
            <p className="text-gray-600">Direct negotiations mean affordable rates for tourists and good earnings for students</p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Experiences</h3>
            <p className="text-gray-600">Get insider knowledge and see the city through a local's perspective</p>
          </div>
        </div>

        {/* Two Large CTAs */}
        <div className="grid md:grid-cols-2 gap-8 pt-16">
          {/* Tourist CTA */}
          <Link href="/tourist">
            <div className="group cursor-pointer bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-6xl mb-6">✈️</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                I'm a Tourist
              </h2>
              <p className="text-gray-600 mb-6">
                Find local student guides to show you authentic experiences in your destination city
              </p>
              <Button size="lg" className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700">
                Explore as Tourist →
              </Button>
            </div>
          </Link>

          {/* Student CTA */}
          <Link href="/student">
            <div className="group cursor-pointer bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-6xl mb-6">🎓</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                I'm a Student
              </h2>
              <p className="text-gray-600 mb-6">
                Become a guide and earn money by showing travelers around your city
              </p>
              <Button size="lg" className="w-full text-lg py-6 bg-purple-600 hover:bg-purple-700">
                Start Guiding →
              </Button>
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-16 space-y-4">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <Link href="/student" className="hover:text-blue-600 transition-colors">
              For Students
            </Link>
            <Link href="/tourist" className="hover:text-blue-600 transition-colors">
              For Tourists
            </Link>
            <Link href="/student/signin" className="hover:text-blue-600 transition-colors">
              Student Dashboard
            </Link>
            <Link href="/tourist/dashboard" className="hover:text-blue-600 transition-colors">
              Tourist Dashboard
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} WanderNest. Connecting cultures, one guide at a time.
          </p>
        </div>
      </main>
    </div>
  )
}
