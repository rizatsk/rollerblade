import { useState, useRef } from 'react'

const WISH_ICONS = ['🌸', '🍓', '💕', '🌺', '✨', '🎠', '🍦', '📸', '🌄', '🎶', '🛍️', '☕']

export default function WishlistForm({ wishes, onAdd, onDelete }) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setInputValue('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div
      className="wishlist-delayed rounded-[20px] p-7 mt-6 text-left"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1.5px solid rgba(255,107,157,0.25)',
      }}
    >
      {/* Title */}
      <h3
        className="text-center text-[1.5rem] mb-2"
        style={{ fontFamily: 'var(--font-script)', color: '#ffb3c6' }}
      >
        ✨ Wishlist Perjalanan Kita
      </h3>
      <p className="text-center text-[0.85rem] mb-5" style={{ color: 'white' }}>
        Selain petik strawberry, kamu mau ngapain lagi? Tulis di sini! 🍓
      </p>

      {/* Input row */}
      <div className="flex gap-2" style={{padding: '0.7rem 0.5rem'}}>
        <input
          id="wish-input"
          ref={inputRef}
          className="wish-input-field flex-1 rounded-xl px-4 py-3 text-[0.95rem] text-white"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1.5px solid rgba(255,107,157,0.3)',
            fontFamily: 'var(--font-body)',
            outline: 'none',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            padding: '0.4rem 0.8rem',
          }}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Contoh: foto-foto bareng 📸"
          maxLength={80}
          aria-label="Tambah keinginan"
        />
        <button
          id="btn-add-wish"
          className="btn-add-wish text-white rounded-xl px-4 py-3 text-xl font-bold flex items-center justify-center cursor-pointer"
          style={{
            padding: '0 1rem'
          }}
          onClick={handleAdd}
          aria-label="Tambah keinginan"
          title="Tambahkan"
        >
          ＋
        </button>
      </div>

      {/* List */}
      {wishes.length > 0 && (
        <ul className="flex flex-col gap-2 mt-2" aria-label="Daftar keinginan"
          style={{
            margin: '0.3rem 0.5rem',
            paddingBottom: '0.3rem'
          }}
        >
          {wishes.map((wish, index) => (
            <li
              key={index}
              className="wish-row flex items-center gap-3 rounded-[10px] px-3 py-2"
              style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.4rem' }}
            >
              <span className="text-[1rem]" aria-hidden="true">
                {WISH_ICONS[index % WISH_ICONS.length]}
              </span>
              <span className="flex-1 text-[0.9rem] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {wish}
              </span>
              <button
                className="wish-delete bg-transparent border-none text-[1rem] cursor-pointer leading-none p-1"
                style={{ color: 'rgba(255,100,100,0.5)' }}
                onClick={() => onDelete(index)}
                aria-label={`Hapus: ${wish}`}
                title="Hapus"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {wishes.length === 0 && (
        <p className="text-center text-[0.85rem] mt-2" style={{ color: 'white' }}>
          Belum ada keinginan… yuk tambahkan! 🌸
        </p>
      )}
    </div>
  )
}
