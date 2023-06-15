import React from "react"

const Waiting = () => {
  return (
    <div className='flex flex-row justify-center items-center relative text-sm sm:text-base line-clamp-1'>
      <span className='line-clamp-1 animate-bounce-one'>w</span>
      <span className='line-clamp-1 animate-bounce-two'>a</span>
      <span className='line-clamp-1 animate-bounce-three'>i</span>
      <span className='line-clamp-1 animate-bounce-four'>t</span>
      <span className='line-clamp-1 animate-bounce-five'>i</span>
      <span className='line-clamp-1 animate-bounce-six'>n</span>
      <span className='line-clamp-1 animate-bounce-seven'>g</span>
      <div className='flex flex-row line-clamp-1 '>
        <span className='line-clamp-1 animate-bounce-eight'>.</span>
        <span className='line-clamp-1 animate-bounce-nine'>.</span>
        <span className='line-clamp-1 animate-bounce-ten'>.</span>
      </div>
    </div>
  )
}

export default Waiting
