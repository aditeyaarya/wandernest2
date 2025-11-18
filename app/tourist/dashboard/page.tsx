'use client'

import { useState, useEffect } from 'react'

interface TouristRequest {
  id: string
  city: string
  dates: any
  preferredTime: string
  numberOfGuests: number
  groupType: string
  serviceType: string
  status: string
  createdAt: string
  selections: Array<{
    student: {
      id: string
      name: string
      averageRating?: number
    }
  }>
  review?: {
    rating: number
    comment: string
  }
}

export default function TouristDashboard() {
  const [step, setStep] = useState<'email' | 'verify' | 'dashboard'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requests, setRequests] = useState<TouristRequest[]>([])

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('touristToken')
    if (token) {
      setStep('dashboard')
      fetchRequests(token)
    }
  }, [])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/tourist/dashboard/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send verification code')
      }

      setStep('verify')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/tourist/dashboard/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Invalid verification code')
      }

      const data = await response.json()
      localStorage.setItem('touristToken', data.token)
      setStep('dashboard')
      await fetchRequests(data.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchRequests = async (token: string) => {
    try {
      const response = await fetch('/api/tourist/dashboard/requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch requests')
      }

      const data = await response.json()
      setRequests(data.requests)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load your requests')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('touristToken')
    setStep('email')
    setEmail('')
    setCode('')
    setRequests([])
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      MATCHED: 'bg-blue-100 text-blue-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      EXPIRED: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  if (step === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tourist Dashboard</h1>
            <p className="text-gray-600">View your past requests and bookings</p>
          </div>

          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h1>
            <p className="text-gray-600">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest font-bold"
                placeholder="000000"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Verifying...' : 'Verify & Access Dashboard'}
            </button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              Use a different email
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Calculate stats
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'PENDING').length,
    accepted: requests.filter(r => r.status === 'ACCEPTED').length,
    completed: requests.filter(r => r.review).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tourist Dashboard</h1>
              <p className="mt-2 text-gray-600">Logged in as {email}</p>
            </div>
            <div className="flex gap-4">
              <a
                href="/booking"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                New Booking
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.accepted}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reviewed</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.completed}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No requests yet</h3>
            <p className="text-gray-600 mb-6">Start your adventure by booking a local guide!</p>
            <a
              href="/booking"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Book Your First Trip
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => {
              const dates = request.dates as { start: string; end?: string }
              const isAccepted = request.status === 'ACCEPTED'
              const isPending = request.status === 'PENDING'

              return (
                <div
                  key={request.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden border-l-4 ${
                    isAccepted ? 'border-green-500' : isPending ? 'border-yellow-500' : 'border-gray-300'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">{request.city}</h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {request.serviceType.replace('_', ' ').charAt(0).toUpperCase() +
                           request.serviceType.replace('_', ' ').slice(1)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-gray-500 font-medium">📅 Dates</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(dates.start).toLocaleDateString()}
                          {dates.end && ` - ${new Date(dates.end).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">⏰ Time</p>
                        <p className="font-semibold text-gray-900 capitalize">{request.preferredTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">👥 Guests</p>
                        <p className="font-semibold text-gray-900">
                          {request.numberOfGuests} ({request.groupType})
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">📝 Requested</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {request.selections.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <span>🎓</span>
                          {isAccepted ? 'Your Guide:' : 'Matched Guides:'}
                        </p>
                        <div className="space-y-2">
                          {request.selections.map((selection, idx) => (
                            <div key={idx} className={`flex items-center justify-between rounded-lg p-4 ${
                              isAccepted ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border border-gray-200'
                            }`}>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-lg">{selection.student.name}</p>
                                {selection.student.averageRating && (
                                  <div className="flex items-center mt-1">
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                          key={i}
                                          className={i < Math.round(selection.student.averageRating!) ? 'text-yellow-500' : 'text-gray-300'}
                                        >
                                          ⭐
                                        </span>
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2 font-medium">
                                      {selection.student.averageRating.toFixed(1)} / 5.0
                                    </span>
                                  </div>
                                )}
                              </div>
                              {isAccepted && (
                                <div className="ml-4">
                                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                                    Confirmed
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {request.review && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <span>💬</span>
                          Your Review:
                        </p>
                        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-2xl ${
                                  i < request.review!.rating ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="ml-2 font-bold text-gray-900">{request.review.rating}/5</span>
                          </div>
                          {request.review.comment && (
                            <p className="text-gray-700 mt-2 italic">"{request.review.comment}"</p>
                          )}
                        </div>
                      </div>
                    )}

                    {isAccepted && !request.review && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <p className="text-sm text-blue-800 mb-2">
                            <strong>📌 Next Steps:</strong> Contact your guide to finalize details and payment arrangements.
                          </p>
                          <p className="text-xs text-blue-600">
                            After your trip, you can leave a review to help other travelers!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
