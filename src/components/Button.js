import React from 'react'

const Button = ({children,style,handleClick,isActive}) => {


   

  return (
    <button className={style} onClick={handleClick}>{children}</button>
  )
}

export default Button