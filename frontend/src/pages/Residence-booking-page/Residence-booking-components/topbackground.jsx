import React from 'react'

 function topbg() {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://www.ellajungleresort.lk/wp-content/uploads/2019/06/home_001.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4 font-mono ">One jungle night last a lifetime!</h1>
          <p className="text-lg justify-normal">Immerse yourself in nature's embrace at our jungle hotel, where luxury meets the wild. Wake up to the sounds of exotic birds and lush greenery outside your window. </p>
       
        </div>
      </div>
    </div>
  )
}

export default topbg;