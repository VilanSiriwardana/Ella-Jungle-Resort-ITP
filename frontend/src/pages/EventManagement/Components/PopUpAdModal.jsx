import React from 'react'

export default function PopUpAdModal() {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative top-28   mx-auto p-5 w-2/5 h-4/6 shadow-lg rounded-3xl bg-white border-secondary-green " 
                 >
                    <div className="mx-16 my-14 text-center items-center bg-gray-500 opacity-70 rounded-3xl border-8 border-black border-double">
                      
                      <div className="px-7 py-1 pt-2">
                        
                        
                      </div>
                      <div className="text-lg font-semibold text-blue-600 text-center flex justify-between items-center mx-12 mt-1">
                       

                        <p className="text-sm font-mclaren text-black">
                        @Ella Jungle Resort</p>
                      </div>
                      <div className="items-center px-4 pb-5 mt-3 flex justify-between mx-6">
                        <button id="delete-btn" 
                        className="flex items-center px-3 py-2  font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 Buy </button>

                        <button 
                        className="flex items-center px-3 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                      </svg> Next </button>

                        <button 
                        className="flex items-center px-3 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                     </svg>Skip</button>
                      </div>

                      

                    </div>
                  </div>
                </div>
  )
}
