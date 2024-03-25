import React from 'react'

function ForgotPassword({onOpen}:{onOpen: () => void}) {
  return (
    <div className="flex justify-end">
    <button
      onClick={onOpen}
      className="text-custom-textColor mt-5 font-light text-sm duration-300 ease-linear hover:text-custom-pink"
    >
      Forgot your password?
    </button>
  </div>
  )
}

export {ForgotPassword}