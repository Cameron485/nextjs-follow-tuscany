'use client'

import { FormEvent, useState } from 'react'

export default function TermsAcceptanceForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const response = await fetch('/api/send-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Accept Terms & Conditions
        </h2>
        <p className="my-2">
          To send an email to the person you want to accept the terms and
          conditions, please enter their email address below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter the persons email address"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {status === 'loading' ? 'Sending...' : 'Send Email'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-2 text-green-600">Email sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-red-600">Failed to send email.</p>
        )}
      </div>
    </div>
  )
}
