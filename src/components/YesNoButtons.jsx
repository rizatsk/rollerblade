import { useState, useRef, useCallback, useEffect } from 'react'

const NO_MESSAGES = [
  'Ups, kabur! 🏃',
  'Eh, jangan! 😅',
  'Hmm... tidak! 🙈',
  'Nggak bisa diklik! 💨',
  'Wkwk coba lagi~ 😝',
  'Kabuuuur! 🌪️',
  'Hayolah jangan~ 🥺',
  'Nggak ada pilihan lain! 😈',
  'Pasti mau deh! 💕',
]

const SHRINK_AT = 4

export default function YesNoButtons({ onYes }) {
  const [noPos, setNoPos]       = useState({ x: null, y: null })
  const [noCount, setNoCount]   = useState(0)
  const [noLabel, setNoLabel]   = useState('Enggak deh 🙅')
  const [yesScale, setYesScale] = useState(1)
  const noBtnRef    = useRef(null)
  const containerRef = useRef(null)
  const posRef      = useRef({ x: null, y: null })

  useEffect(() => {
    if (noBtnRef.current && containerRef.current) {
      const cr = containerRef.current.getBoundingClientRect()
      const br = noBtnRef.current.getBoundingClientRect()
      posRef.current = { x: br.left - cr.left, y: br.top - cr.top }
    }
  }, [])

  const escape = useCallback(() => {
    const container = containerRef.current
    const btn       = noBtnRef.current
    if (!container || !btn) return

    const cr   = container.getBoundingClientRect()
    const br   = btn.getBoundingClientRect()
    const maxX = cr.width  - br.width
    const maxY = cr.height - br.height

    let newX, newY, attempts = 0
    do {
      newX = Math.random() * maxX
      newY = Math.random() * maxY
      attempts++
    } while (
      attempts < 10 &&
      Math.abs(newX - (posRef.current.x ?? 0)) < 60 &&
      Math.abs(newY - (posRef.current.y ?? 0)) < 40
    )

    posRef.current = { x: newX, y: newY }
    setNoPos({ x: newX, y: newY })

    const newCount = noCount + 1
    setNoCount(newCount)
    setNoLabel(NO_MESSAGES[Math.min(newCount - 1, NO_MESSAGES.length - 1)])
    setYesScale(Math.min(1 + newCount * 0.12, 2))
  }, [noCount])

  const isAbsolute = noPos.x !== null

  const noStyle = isAbsolute
    ? {
        position:  'absolute',
        left:      noPos.x,
        top:       noPos.y,
        fontSize:  noCount >= SHRINK_AT ? `${Math.max(0.65, 1 - (noCount - SHRINK_AT) * 0.08)}rem` : undefined,
        padding:   noCount >= SHRINK_AT
          ? `${Math.max(0.3, 0.9 - (noCount - SHRINK_AT) * 0.08)}rem ${Math.max(0.6, 2.2 - (noCount - SHRINK_AT) * 0.15)}rem`
          : undefined,
        opacity: noCount >= SHRINK_AT + 4 ? Math.max(0.2, 1 - (noCount - SHRINK_AT - 4) * 0.1) : 1,
      }
    : {}

  return (
    <div className="w-full">
      {/* Buttons container */}
      <div
        ref={containerRef}
        className="flex items-center justify-center gap-5 flex-wrap relative"
        style={{ minHeight: isAbsolute ? '120px' : '70px' }}
      >
        {/* YES */}
        <button
          id="btn-yes"
          className="btn-yes-glow relative z-10 text-white rounded-full px-6 py-4 font-extrabold text-[1.05rem] tracking-wide cursor-pointer overflow-hidden"
          style={{
            transform: `scale(${yesScale})`,
            letterSpacing: '0.03em',
            padding: '0.4rem 2.2rem',
          }}
          onClick={onYes}
        >
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.2),transparent)' }}
          />
          Mauuu! 🥰
        </button>

        {/* NO */}
        <button
          id="btn-no"
          ref={noBtnRef}
          className="btn-no-style rounded-full px-9 py-4 font-bold text-[1.05rem] tracking-wide cursor-pointer"
          style={{
            ...noStyle,
            color: 'rgba(255,255,255,0.6)',
            padding: '0.4rem 2.2rem',
          }}
          onMouseEnter={escape}
          onFocus={escape}
          onClick={escape}
        >
          {noLabel}
        </button>
      </div>

      {/* Hint */}
      <p className="mt-5 text-[0.82rem] italic text-center" style={{ color: 'white' }}>
        {noCount === 0
          ? 'Klik tombol di atas ya! 💕'
          : noCount < 3
          ? `Yah, kabur lagi! Coba klik "Mauuu!" aja~ 😝`
          : noCount < 6
          ? `Tombol "Enggak"-nya makin kecil lho... 🤭`
          : `Udah ${noCount}x gagal, kayaknya memang harus mau! 😏💕`}
      </p>
    </div>
  )
}
