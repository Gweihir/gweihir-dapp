import React, { ReactNode } from "react"

interface CopyButtonProps {
  text: string | undefined
  children?: ReactNode
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, children }) => {
  const copyToClipboard = () => {
    if (text) {
      navigator.clipboard.writeText(text)
      alert(`${text} copied to clipboard`)
    } else {
      alert("failed to copy to clipboard")
    }
  }

  return (
    <button title='Copy' onClick={copyToClipboard}>
      {children}
    </button>
  )
}

export default CopyButton
