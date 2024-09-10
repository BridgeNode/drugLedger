import React, { MouseEventHandler } from 'react'

const Closure = ({children, close, closeFn}: {children: React.ReactNode, close: boolean, closeFn: Function}) => {
   if (close) return ""
   const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.currentTarget === e.target && closeFn(true)
  return (
    <div className='w-full h-full fixed flex justify-center pt-[8vh] bg-white/30 backdrop-blur-[1px] z-[2]' onClick={(e) => handleClose(e)}>{children}</div>
  )
}

export default Closure