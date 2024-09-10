import React from 'react'

const Header = ({ title}: {title: string}) => {
  return (
   <div className='w-full py-1 bg-red-00 mb-2 flex justify-between items-center'>
   <p>{title}</p>
   {/* <p>menu</p> */}
</div>
  )
}

export default Header