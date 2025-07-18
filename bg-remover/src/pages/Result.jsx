import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const { resultImage, image } = useContext(AppContext);

  return (
    <div className='mx-4 lg:mx-44 mt-14 min-h-[75vh]'>

      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>

        {/* ----------Image Container---------- */}
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          {/* ---------- Left Side ---------- */}
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <img className='rounded-md border' src={image ? URL.createObjectURL(image) : ''} alt="" />
          </div>

          {/* ---------- Right Side ---------- */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
            <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
              <img src={resultImage ? resultImage : ''} alt="" />
              {
                !resultImage && image && <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
                <div className='w-12 h-12 border-4 border-violet-600 rounded-full border-t-transparent animate-spin'></div>
              </div>
              }
            </div>
          </div>
        </div>

        {/* ---------- Buttons ---------- */}
        { resultImage && <div className='flex flex-wrap justify-center sm:justify-end gap-4 mt-6'>
          <button className='px-8 py-2.5 border border-violet-600 rounded-full text-sm hover:scale-105 transition-all duration-700'>Try another image</button>
          <a className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700' href={resultImage} download>Download image</a>
        </div> }

      </div>

    </div>
  )
}

export default Result