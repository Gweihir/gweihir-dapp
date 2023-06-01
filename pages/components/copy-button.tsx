import React from "react"

interface CopyButtonProps {
  text: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    alert("copied to clipboard")
  }

  return (
    <button className='hover:opacity-80' onClick={copyToClipboard}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='#475569'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='currentColor'
        className='w-6 h-6'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6'
        />
      </svg>
    </button>
  )
}

export default CopyButton
