import React from "react"

const Waiting = () => {
  return (
    <div className='flex flex-row justify-center items-center relative line-clamp-1 text-white'>
      <span className='line-clamp-1 animate-bounce-one text-white'>w</span>
      <span className='line-clamp-1 animate-bounce-two text-white'>a</span>
      <span className='line-clamp-1 animate-bounce-three text-white'>i</span>
      <span className='line-clamp-1 animate-bounce-four text-white'>t</span>
      <span className='line-clamp-1 animate-bounce-five text-white'>i</span>
      <span className='line-clamp-1 animate-bounce-six text-white'>n</span>
      <span className='line-clamp-1 animate-bounce-seven text-white'>g</span>
      <div className='flex flex-row line-clamp-1 text-white'>
        <span className='line-clamp-1 animate-bounce-eight text-white'>.</span>
        <span className='line-clamp-1 animate-bounce-nine text-white'>.</span>
        <span className='line-clamp-1 animate-bounce-ten text-white'>.</span>
      </div>
    </div>
  )
}

export default Waiting
