import React from "react"

const Pending = () => {
  return (
    <div className='flex flex-row justify-center items-center relative line-clamp-1'>
      <span className='line-clamp-1 animate-bounce-one'>p</span>
      <span className='line-clamp-1 animate-bounce-two'>e</span>
      <span className='line-clamp-1 animate-bounce-three'>n</span>
      <span className='line-clamp-1 animate-bounce-four'>d</span>
      <span className='line-clamp-1 animate-bounce-five'>i</span>
      <span className='line-clamp-1 animate-bounce-six'>n</span>
      <span className='line-clamp-1 animate-bounce-seven'>g</span>
      <div className='flex flex-row line-clamp-1'>
        <span className='line-clamp-1 animate-bounce-eight'>.</span>
        <span className='line-clamp-1 animate-bounce-nine'>.</span>
        <span className='line-clamp-1 animate-bounce-ten'>.</span>
      </div>
    </div>
  )
}

export default Pending
