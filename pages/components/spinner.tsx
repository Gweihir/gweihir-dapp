import React from "react"
import Image from "next/image"
import spinnerOne from '../../public/Images/spinner_01.png'

const Spinner: React.FC = () => {
  return (
    <>
      <Image src={spinnerOne} alt="Loading spinner" width={20} height={20} />
    </>
  )
}

export default Spinner
