import React, { PropsWithChildren } from 'react'

interface ButtonHoverProps{
    width? : number;
}
export default function ButtonHover(props: PropsWithChildren<ButtonHoverProps>) {
    const {width=10} = props;
  return (
    <div className={`h-${width} aspect-square flex place-items-center justify-center bg-slate-800 rounded-full bg-opacity-0 hover:bg-opacity-100 duration-200 hover:scale-110`}>
        {props.children}
    </div>
  )
}
