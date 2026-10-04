export function VenueArt({ name }: { name: string }) {
  return <div className="venue-art" role="img" aria-label={`${name}食堂建筑示意，非实景或地理坐标`}>
    <svg viewBox="0 0 400 240" aria-hidden="true">
      <circle cx="310" cy="65" r="39" fill="#ffe9b3" />
      <path d="M0 210Q80 180 175 208T400 195V240H0Z" fill="#cbd6b8" />
      <rect x="75" y="85" width="250" height="128" rx="10" fill="#fffaf2" />
      <path d="M58 91L200 39 342 91Z" fill="#ed8a57" />
      {[98, 155, 212, 269].map((x) => <rect key={x} x={x} y="107" width="34" height="31" rx="5" fill="#a0b9a5" />)}
      <rect x="166" y="156" width="68" height="57" rx="7" fill="#446453" />
      <path d="M200 157V213M172 215H229" stroke="#fffaf2" strokeWidth="3" />
      <rect x="107" y="159" width="30" height="29" rx="4" fill="#e2c19d" /><rect x="262" y="159" width="30" height="29" rx="4" fill="#e2c19d" />
      <path d="M35 215V164M362 214V151" stroke="#899d76" strokeWidth="7" />
      <ellipse cx="35" cy="155" rx="23" ry="31" fill="#adc29b" /><ellipse cx="362" cy="143" rx="24" ry="33" fill="#adc29b" />
    </svg><span>{name}</span><small>建筑示意 · 位置以现场为准</small>
  </div>
}
