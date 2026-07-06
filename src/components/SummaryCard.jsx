const WISH_ICONS = ['🌸', '🍓', '💕', '🌺', '✨', '🎠', '🍦', '📸', '🌄', '🎶', '🛍️', '☕']

export default function SummaryCard({ wishes }) {
  return (
    <div
      className="summary-card rounded-[20px]"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1.5px solid rgba(107,203,119,0.35)',
        textAlign: 'start',
        padding: '1rem 0.5rem'
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
              <strong style={{ color: '#ffb3c6' }}>Jumat, 17 Juli 2026</strong>
              {' '}- Hari yang udah kita tunggu-tunggu!
            </>
          ),
        },
        {
          icon: '🍓',
          content: (
            <>
              <strong style={{ color: '#ffb3c6', }}>Petik Strawberry</strong>
              {' '}- <a href="https://maps.app.goo.gl/u4bx83FgS1Bu8w5W6" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Udara segar, pemandangan indah, dan strawberry segar langsung dari pohonnya!</a>
            </>
          ),
        },
        {
          icon: '☕',
          content: (
            <>
              <strong style={{ color: '#ffb3c6', }}>Ngopi</strong>
              {' '}- <a href="https://maps.app.goo.gl/1SxQBsqpLjHZ5bKi6" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Mahiran Coffe & Resto, tempat yang cozy buat kita ngobrol sambil liat view Puncak.</a>
            </>
          ),
        },
        {
          icon: '🍢',
          content: (
            <>
              <strong style={{ color: '#ffb3c6', }}>Makan Sate Maranggi</strong>
              {' '}- <a href="https://maps.app.goo.gl/PyK3x1PTFgRj9x2s8" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Sate Maranggi Jembatan, tempat yang enak dan penuh nuansa lokal.</a>
            </>
          ),
        },
        {
          icon: '📽️',
          content: (
            <>
              <strong style={{ color: '#ffb3c6', }}>Nonton</strong>
              {' '}- <a href="https://maps.app.goo.gl/dYbde5qFxpknBrhj6" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">The Park Sawangan, tempat yang seru buat nonton film bareng.</a>
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
          <span className="text-[1.1rem] mt-0.5">{icon}</span>
          <p className="text-[0.9rem] leading-relaxed font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {content}
          </p>
        </div>
      ))}

      {/* Wishlist */}
      {wishes.length > 0 && (
        <div className="flex gap-3 items-start">
          <span className="text-[1.1rem] mt-0.5">🌟</span>
          <div>
            <p className="text-[0.9rem] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <strong style={{ color: '#ffb3c6' }}>Wishlist kamu:</strong>
            </p>
            <ul className="flex flex-col gap-1">
              {wishes.map((wish, i) => (
                <li key={i} className="flex gap-2 items-center text-[0.88rem]" style={{ color: 'white', fontSize: '15px' }}>
                  <span>{WISH_ICONS[i % WISH_ICONS.length]}</span>
                  <span>{wish}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-center mt-5 text-[0.85rem] italic" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Semua keinginan kamu, aku usahain ya 💕
      </p>
    </div>
  )
}
