import React from "react"

const Waiting = () => {
  return (
    <div className='flex flex-row justify-center items-center relative text-sm sm:text-base line-clamp-1'>
      <p className='line-clamp-1 animate-bounce-one'>w</p>
      <p className='line-clamp-1 animate-bounce-two'>a</p>
      <p className='line-clamp-1 animate-bounce-three'>i</p>
      <p className='line-clamp-1 animate-bounce-four'>t</p>
      <p className='line-clamp-1 animate-bounce-five'>i</p>
      <p className='line-clamp-1 animate-bounce-six'>n</p>
      <p className='line-clamp-1 animate-bounce-seven'>g</p>
      <div className='flex flex-row line-clamp-1 '>
        <p className='line-clamp-1 animate-bounce-eight'>.</p>
        <p className='line-clamp-1 animate-bounce-nine'>.</p>
        <p className='line-clamp-1 animate-bounce-ten'>.</p>
      </div>
    </div>
  )
}

export default Waiting
