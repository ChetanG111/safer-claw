'use client'

export const StampBackground = () => {
  return (
    <div
      className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'
      style={{ backgroundColor: '#ffffff' }}
    >
      <svg
        className='absolute inset-0 h-full w-full opacity-[0.25]'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <pattern
            id='stamp-pattern'
            x='0'
            y='0'
            width='600'
            height='600'
            patternUnits='userSpaceOnUse'
          >
            {/* Highly varied rotated light gray rectangles to simulate stamps */}
            {/* Using different sizes, rotations, and subtle stroke variations for depth */}
            <rect
              x='50'
              y='60'
              width='55'
              height='55'
              rx='6'
              stroke='#E4E4E7'
              strokeWidth='2.5'
              fill='none'
              transform='rotate(14 77.5 87.5)'
            />
            <rect
              x='220'
              y='40'
              width='45'
              height='45'
              rx='5'
              stroke='#E4E4E7'
              strokeWidth='2.2'
              fill='none'
              transform='rotate(-18 242.5 62.5)'
            />
            <rect
              x='410'
              y='80'
              width='65'
              height='65'
              rx='8'
              stroke='#D4D4D8'
              strokeWidth='3'
              fill='none'
              transform='rotate(28 442.5 112.5)'
            />

            <rect
              x='90'
              y='280'
              width='48'
              height='48'
              rx='5'
              stroke='#E4E4E7'
              strokeWidth='2.3'
              fill='none'
              transform='rotate(-8 114 304)'
            />
            <rect
              x='300'
              y='320'
              width='60'
              height='60'
              rx='6'
              stroke='#D4D4D8'
              strokeWidth='2.6'
              fill='none'
              transform='rotate(22 330 350)'
            />
            <rect
              x='520'
              y='240'
              width='52'
              height='52'
              rx='6'
              stroke='#E4E4E7'
              strokeWidth='2.4'
              fill='none'
              transform='rotate(-32 546 266)'
            />

            <rect
              x='60'
              y='480'
              width='62'
              height='62'
              rx='8'
              stroke='#D4D4D8'
              strokeWidth='2.8'
              fill='none'
              transform='rotate(42 91 511)'
            />
            <rect
              x='420'
              y='440'
              width='58'
              height='58'
              rx='6'
              stroke='#E4E4E7'
              strokeWidth='2.5'
              fill='none'
              transform='rotate(-12 449 469)'
            />
            <rect
              x='200'
              y='520'
              width='50'
              height='50'
              rx='5'
              stroke='#D4D4D8'
              strokeWidth='2.2'
              fill='none'
              transform='rotate(18 225 545)'
            />

            <rect
              x='380'
              y='210'
              width='38'
              height='38'
              rx='4'
              stroke='#E4E4E7'
              strokeWidth='1'
              fill='none'
              transform='rotate(-15 399 229)'
            />
            <rect
              x='150'
              y='180'
              width='55'
              height='55'
              rx='6'
              stroke='#D4D4D8'
              strokeWidth='1.7'
              fill='none'
              transform='rotate(35 177.5 207.5)'
            />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#stamp-pattern)' />
      </svg>
    </div>
  )
}
