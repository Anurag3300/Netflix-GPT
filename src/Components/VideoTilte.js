import React from 'react'

const VideoTilte = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className='flex gap-3'>
        <button className='bg-white text-black py-4 px-12 text-xl rounded-lg font-bold hover:bg-opacity-80 '>▶ Play</button>
        <button className='bg-gray-500 text-white py-4 px-12 text-xl font-semibold rounded-lg hover:bg-opacity-80 '>More Info</button>
      </div>
    </div>
  )
}

export default VideoTilte;