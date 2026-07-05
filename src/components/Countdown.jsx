import { useState, useEffect } from 'react'

const TARGET_DATE = new Date('2026-08-07T08:00:00+07:00')

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const diff = TARGET_DATE - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Hari',   value: timeLeft.days },
    { label: 'Jam',    value: timeLeft.hours },
    { label: 'Menit',  value: timeLeft.minutes },
    { label: 'Detik',  value: timeLeft.seconds },
  ]

  return (
    <div className="countdown-section text-center space-y-10" style={{
      padding: '1rem 0rem',
    }}>
      {/* Label */}
      <p
        className="mb-4 tracking-wide"
        style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem,3vw,1.4rem)', color: '#ffb3c6', paddingBottom: '1rem' }}
      >
        ⏳ Hitung mundur ke tanggal spesial kita…
      </p>

      {/* Grid */}
      <div className="flex gap-3 my-8 justify-center flex-wrap">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="countdown-unit flex flex-col items-center min-w-[70px] rounded-2xl px-4 py-3 backdrop-blur-md"
            style={{
              background: 'rgba(255,107,157,0.12)',
              border: '1.5px solid rgba(255,107,157,0.35)',
            }}
          >
            <span
              className="countdown-number block font-black leading-none"
              style={{ fontSize: 'clamp(1.6rem,5vw,2.4rem)', color: '#ff6b9d' }}
            >
              {pad(value)}
            </span>
            <span
              className="block text-[0.65rem] font-bold uppercase tracking-widest mt-1 opacity-80"
              style={{ color: '#ffb3c6' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
