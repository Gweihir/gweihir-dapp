import React from "react"

const Waiting = () => {
  return (
    <div className='flex flex-row justify-center items-center relative'>
      <p className='w-7/10 line-clamp-1 animate-bounce-one'>w</p>
      <p className='w-7/10 line-clamp-1 animate-bounce-two'>a</p>
      <p className='w-7/10 line-clamp-1 animate-bounce-three'>i</p>
      <p className='w-7/10 line-clamp-1 animate-bounce-four'>t</p>
      <p className='w-7/10 line-clamp-1 animate-bounce-five'>i</p>
      <p className='w-7/10 line-clamp-1 animate-bounce-six'>n</p>
      <p className='w-7/10 line-clamp-1 animate-bounce-seven'>g</p>
      <div className='flex flex-row'>
        <p className='animate-bounce-eight'>.</p>
        <p className='animate-bounce-nine'>.</p>
        <p className='animate-bounce-ten'>.</p>
      </div>
    </div>
  )
}

export default Waiting
