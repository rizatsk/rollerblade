import { useEffect, useRef, useState } from 'react'
import Countdown from './components/Countdown'
import FloatingParticles from './components/FloatingParticles'
import SummaryCard from './components/SummaryCard'
import WishlistForm from './components/WishlistForm'
import YesNoButtons from './components/YesNoButtons'

let confetti = null

function launchConfetti() {
  if (!confetti) return
  const colors = ['#ff6b9d', '#ffd700', '#6bcb77', '#ff4757', '#ffffff', '#ffb3c6']
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 }, colors, shapes: ['circle', 'square'] })
  setTimeout(() => {
    confetti({ particleCount: 60, spread: 60, origin: { x: 0.1, y: 0.5 }, colors })
    confetti({ particleCount: 60, spread: 60, origin: { x: 0.9, y: 0.5 }, colors })
  }, 350)
}

const SCREEN = { QUESTION: 'question', YES: 'yes', SAVED: 'saved' }

/* ─── shared glassmorphism card wrapper ─── */
const Card = ({ children, id, ariaLabelledBy, extraClass = '' }) => (
  <section
    id={id}
    aria-labelledby={ariaLabelledBy}
    className={`hero-card backdrop-blur-xl rounded-[28px] w-full text-center ${extraClass}`}
    style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1.5px solid rgba(255,107,157,0.3)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,107,157,0.5), 0 0 60px rgba(255,107,157,0.2)',
      padding: '2rem 1rem',
      maxWidth: '620px'
    }}
  >
    {children}
  </section>
)

const SPREADSHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyni0MIe_AU0j-OHVwoPDunrGC-7V1NZGhRm20rwGcGtOhtZedvcf7WNzI2xsQx4atP1Q/exec';

export default function App() {
  const [screen, setScreen] = useState(SCREEN.QUESTION)
  const [wishes, setWishes] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const savedRef = useRef(false)

  useEffect(() => {
    if (SPREADSHEET_SCRIPT_URL) {
      fetch(SPREADSHEET_SCRIPT_URL)
        .then(res => res.json())
        .then(data => {
          if (data.wishes) setWishes(data.wishes)
        })
        .catch(err => console.error("Error loading wishes from sheet:", err))
    } else {
      const saved = localStorage.getItem('strawberry-wishes')
      if (saved) {
        try { setWishes(JSON.parse(saved)) } catch { }
      }
    }
  }, [])

  const handleYes = () => {
    launchConfetti()
    setScreen(SCREEN.YES)
    localStorage.setItem('strawberry-said-yes', 'true')
  }

  const handleAddWish = (wish) => {
    const updated = [...wishes, wish]
    setWishes(updated)
    localStorage.setItem('strawberry-wishes', JSON.stringify(updated))
  }

  const handleDeleteWish = (index) => {
    const updated = wishes.filter((_, i) => i !== index)
    setWishes(updated)
    localStorage.setItem('strawberry-wishes', JSON.stringify(updated))
  }

  const handleSave = () => {
    if (savedRef.current || isSaving) return
    launchConfetti()
    setIsSaving(true)

    // Menyimpan backup di local storage
    localStorage.setItem('strawberry-wishes', JSON.stringify(wishes))

    if (SPREADSHEET_SCRIPT_URL) {
      // Mengirim wishlist ke Google Sheets secara real-time
      fetch(SPREADSHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Mencegah pemblokiran CORS pada redirect Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishes: wishes })
      })
        .then(() => {
          setScreen(SCREEN.SAVED)
          savedRef.current = true
        })
        .catch(err => {
          console.error("Gagal simpan ke Google Sheet:", err)
          alert("Gagal terhubung ke Google Sheets, tapi data kamu tetap tersimpan lokal di browser! ❤️")
          setScreen(SCREEN.SAVED)
          savedRef.current = true
        })
        .finally(() => {
          setIsSaving(false)
        })
    } else {
      setScreen(SCREEN.SAVED)
      savedRef.current = true
      setIsSaving(false)
    }
  }

  const handleEditWishes = () => {
    savedRef.current = false
    setScreen(SCREEN.YES)
  }

  return (
    <>
      <FloatingParticles />

      <main 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center"
        style={{
          padding: "1.4rem 1rem"
        }}
        >

        {/* ══ QUESTION SCREEN ══ */}
        {screen === SCREEN.QUESTION && (
          <>
            <Countdown />
            <Card ariaLabelledBy="question-title">
              {/* Nailong SVG Doll */}

              <div className="flex justify-center mb-4">
                <span
                  className="emoji-bounce block mb-3"
                  role="img"
                  aria-label="strawberry"
                  style={{
                    fontSize: 'clamp(3rem,10vw,5rem)',
                    filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.5))',
                  }}
                >
                  🍓
                </span>
                <img
                  src="/nailong.svg"
                  alt="Boneka Nailong Lucu"
                  className="emoji-bounce w-32 h-32 object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 25px rgba(255, 235, 59, 0.6))'
                  }}
                />
              </div>

              {/* Title */}
              <h1
                id="question-title"
                className="mb-4 leading-snug"
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.6rem,5vw,2.4rem)',
                  color: '#ffb3c6',
                  textShadow: '0 0 20px rgba(255,107,157,0.4)',
                }}
              >
                Hei, Sayang <br /> ada sesuatu yang<br />pengen aku tanyain…
              </h1>

              {/* Date badge */}
              <div
                className="badge-pulse inline-flex items-center gap-2 rounded-full px-5 py-2 text-[0.9rem] font-extrabold tracking-wide mb-6"
                style={{
                  background: 'linear-gradient(135deg,rgba(255,107,157,0.25),rgba(255,71,87,0.2))',
                  border: '1.5px solid rgba(255,107,157,0.5)',
                  color: '#ffd700',
                  padding: '0.4rem 1.8rem',
                  margin: '1rem 0'
                }}
              >
                <span>📅</span>
                <span>Jumat, 17 July 2026</span>
              </div>

              {/* Description */}
              <div style={{ margin: "1.3rem 0" }}>
                <div className="flex gap-3 items-center justify-center">
                  <span className="text-[1.1rem] mt-0.5">🍓</span>
                  <p className="text-[0.9rem] leading-relaxed font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <strong style={{ color: '#ffb3c6', }}>Petik Strawberry</strong>
                    {' '}- <a href="https://maps.app.goo.gl/u4bx83FgS1Bu8w5W6" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Puncak Pass Farm</a>
                  </p>
                </div>
                <div className="flex gap-3 items-center justify-center">
                  <span className="text-[1.1rem] mt-0.5">☕</span>
                  <p className="text-[0.9rem] leading-relaxed font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <strong style={{ color: '#ffb3c6', }}>Ngopi</strong>
                    {' '}- <a href="https://maps.app.goo.gl/1SxQBsqpLjHZ5bKi6" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mahiran Coffe & Resto</a>
                  </p>
                </div>
                <div className="flex gap-3 items-center justify-center">
                  <span className="text-[1.1rem] mt-0.5">🍢</span>
                  <p className="text-[0.9rem] leading-relaxed font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <strong style={{ color: '#ffb3c6', }}>Makan Sate Maranggi</strong>
                    {' '}- <a href="https://maps.app.goo.gl/PyK3x1PTFgRj9x2s8" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Sate Maranggi Jembatan</a>
                  </p>
                </div>
                <div className="flex gap-3 items-center justify-center">
                  <span className="text-[1.1rem] mt-0.5">📽️</span>
                  <p className="text-[0.9rem] leading-relaxed font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <strong style={{ color: '#ffb3c6', }}>Nonton</strong>
                    {' '}- <a href="https://maps.app.goo.gl/dYbde5qFxpknBrhj6" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">The Park Sawangan</a>
                  </p>
                </div>
              </div>
              <p
                className="leading-relaxed mb-8 font-semibold"
                style={{
                  fontSize: 'clamp(0.95rem,2.5vw,1.1rem)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                Mau nggak aku ajak jalan-jalan ke{' '}
                <strong style={{ color: '#ffb3c6', fontWeight: 800 }}>
                  Puncak Petik Strawberry
                </strong>
                ? 🍓🌄<br />
                Bayangin deh — udara segar pegunungan, pemandangan cantik,
                dan kita petik strawberry segar langsung dari pohonnya bareng-bareng! makan, minum, ngobrol, nonton naik motor jalan-jalan bareng 💕
              </p>

              <YesNoButtons onYes={handleYes} />
            </Card>
          </>
        )}

        {/* ══ YES SCREEN ══ */}
        {screen === SCREEN.YES && (
          <Card ariaLabelledBy="yes-title" extraClass="yes-screen">
            <span
              className="celebration-bounce block mb-4"
              role="img"
              aria-label="celebration"
              style={{
                fontSize: 'clamp(4rem,15vw,4rem)',
                filter: 'drop-shadow(0 0 30px rgba(255,107,157,0.8))',
              }}
            >
              🎉🍓💕
            </span>

            <h1
              id="yes-title"
              className="mb-3"
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(2rem,6vw,3.2rem)',
                color: '#ffb3c6',
                textShadow: '0 0 30px rgba(255,107,157,0.6)',
              }}
            >
              Yeaaaay! Makasih cantik! 🥰
            </h1>
            <p className="text-[1rem] font-semibold mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', padding: '1rem 0' }}>
              Aku seneng banget kamu mau! 💖<br />
              Sekarang tulis semua yang pengen kamu lakuin selama kita jalan-jalan ya!
            </p>

            <WishlistForm wishes={wishes} onAdd={handleAddWish} onDelete={handleDeleteWish} />

            {/* Save section */}
            <div className="save-delayed flex flex-col items-center gap-3 mt-6">
              <button
                id="btn-save-wishes"
                className="btn-save-green text-white border-none rounded-full font-extrabold text-[1rem] tracking-wide cursor-pointer"
                style={{
                  marginTop: '1rem',
                  padding: '0.3rem 1rem',
                }}
                onClick={handleSave}
              >
                {isSaving ? 'Prosess Di Simpan...' : '💾 Simpan &amp; Lihat Rencana Kita!'}
              </button>
              <p className="text-[0.78rem] text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Keinginan kamu tersimpan otomatis di perangkat ini 🔒
              </p>
            </div>
          </Card>
        )}

        {/* ══ SAVED SCREEN ══ */}
        {screen === SCREEN.SAVED && (
          <Card ariaLabelledBy="saved-title" extraClass="yes-screen">
            <span
              className="celebration-bounce block mb-4"
              role="img"
              aria-label="love"
              style={{
                fontSize: 'clamp(2rem,10vw,4rem)',
                filter: 'drop-shadow(0 0 30px rgba(255,107,157,0.8))',
              }}
            >
              💖🌸🍓
            </span>

            <h1
              id="saved-title"
              className="mb-3"
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(2rem,6vw,3.2rem)',
                color: '#ffb3c6',
                textShadow: '0 0 30px rgba(255,107,157,0.6)',
              }}
            >
              Rencana kita sudah tersimpan!
            </h1>
            <p className="text-[1rem] font-semibold mb-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', padding: '1rem 0' }}>
              Tinggal nunggu tanggal 17 Juli aja… nggak sabar banget! 🥺💕
            </p>

            <SummaryCard wishes={wishes} />

            <div className="flex flex-col items-center gap-3 mt-6" style={{ marginTop: '1rem' }}>
              <button
                id="btn-edit-wishes"
                className="btn-yes-glow text-white border-none rounded-full font-extrabold text-[1rem] tracking-wide cursor-pointer"
                style={{
                  padding: '0.3rem 1rem',
                }}
                onClick={handleEditWishes}
              >
                ✏️ Edit Wishlist
              </button>
            </div>
          </Card>
        )}
      </main>
    </>
  )
}
