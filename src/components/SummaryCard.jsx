const WISH_ICONS = ['🌸', '🍓', '💕', '🌺', '✨', '🎠', '🍦', '📸', '🌄', '🎶', '🛍️', '☕']

export default function SummaryCard({ wishes }) {
  return (
    <div
      className="summary-card rounded-[20px] p-7 mt-4"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1.5px solid rgba(107,203,119,0.35)',
      }}
    >
      <h3
        className="text-center text-[1.6rem] mb-4"
        style={{ fontFamily: 'var(--font-script)', color: '#6bcb77' }}
      >
        🗺️ Itinerary Kita!
      </h3>

      {/* Trip info rows */}
      {[
        {
          icon: '📅',
          content: (
            <>
              <strong style={{ color: '#ffb3c6' }}>Jumat, 7 Agustus 2026</strong>
              {' '}— Hari yang udah kita tunggu-tunggu!
            </>
          ),
        },
        {
          icon: '📍',
          content: (
            <>
              <strong style={{ color: '#ffb3c6' }}>Puncak Petik Strawberry</strong>
              {' '}— Udara segar, pemandangan indah, dan strawberry segar langsung dari pohonnya! 🍓
            </>
          ),
        },
        {
          icon: '💑',
          content: (
            <>
              Bareng orang paling spesial di hidupku —{' '}
              <strong style={{ color: '#ffb3c6' }}>kamu</strong>! 💖
            </>
          ),
        },
      ].map(({ icon, content }, i) => (
        <div key={i} className="flex gap-3 mb-3 items-start">
          <span className="text-[1.1rem] flex-shrink-0 mt-0.5">{icon}</span>
          <p className="text-[0.9rem] leading-relaxed font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {content}
          </p>
        </div>
      ))}

      {/* Wishlist */}
      {wishes.length > 0 && (
        <div className="flex gap-3 mb-3 items-start">
          <span className="text-[1.1rem] flex-shrink-0 mt-0.5">🌟</span>
          <div>
            <p className="text-[0.9rem] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <strong style={{ color: '#ffb3c6' }}>Wishlist kamu:</strong>
            </p>
            <ul className="flex flex-col gap-1">
              {wishes.map((wish, i) => (
                <li key={i} className="flex gap-2 items-center text-[0.88rem]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <span>{WISH_ICONS[i % WISH_ICONS.length]}</span>
                  <span>{wish}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-center mt-5 text-[0.85rem] italic" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Semua keinginan kamu, aku usahain ya sayang! 💕
      </p>
    </div>
  )
}
