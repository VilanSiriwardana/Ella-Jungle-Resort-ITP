import { useEffect, useState } from "react";
import { Ripple, Input, initTWE } from "tw-elements";

function AgentSearch({ handleSearchInputChange, handleSortChange, sortOrder }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    initTWE({ Ripple, Input });

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`flex flex-col border border-[#16a34a] items-start px-5 py-6 text-sm rounded-[30px] bg-white bg-opacity-70 w-[300px] ${
        isSticky ? "sticky top-20" : ""
      }`}
      
    >
      <div
        className='relative flex justify-center mx-auto bg-[#bbf7d0] border rounded-xl border-green-300'
      >
        <input
          type='search'
          className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-green-500 placeholder-opacity-0'
          placeholder='Search'
          aria-label='Search'
          id='exampleFormControlInput'
          aria-describedby='basic-addon1'
          onChange={handleSearchInputChange}
        />
        <label
          htmlFor='exampleFormControlInput'
          className='pointer-events-none  absolute left-3 top-0 mb-0  origin-[0_0] truncate pt-[0.37rem] leading-[1.58] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.3rem] peer-focus:scale-[0.8] peer-focus:text-green-500 '
        >
          Search
        </label>
      </div>

      <h3 className='mt-8 ml-5 text-black'>Sort</h3>
      <div className='flex bg-[#86efac] border  border-green-300 font-bold flex-col justify-center mt-4 mx-auto max-w-full whitespace-nowrap  rounded-xl text-black text-opacity-60 w-[200px]'>
        <div
          className={`flex gap-5 justify-between px-7 py-1.5  bg-opacity-30 border-b cursor-pointer ${
            sortOrder === "name" 
          }`}
          onClick={() => handleSortChange("name")}
        >
          <span className='my-auto text-black'>Name</span>
          {sortOrder === "asc" ? (
            <img
              src='https://www.svgrepo.com/download/532208/sort-amount-down.svg'
              alt='Sort-Ascending'
              className='w-5 shrink-0 aspect-square'
            />
          ) : (
            <img
              src='https://www.svgrepo.com/download/532213/sort-amount-up.svg'
              alt='Sort-Descending'
              className='w-5 shrink-0 aspect-square'
            />
          )}
        </div>
        {/* <div
          className={`flex gap-5 justify-between px-7 py-1.5  bg-opacity-30 border-b cursor-pointer ${
            sortOrder === "rating" && "text-[#16a34a]"
          }`}
          onClick={() => handleSortChange("rating")}
        >
          <span className='my-auto'>Rating</span>
          {sortOrder === "asc" ? (
            <img
              src='https://www.svgrepo.com/download/532208/sort-amount-down.svg'
              alt='Sort-Ascending'
              className='w-5 shrink-0 aspect-square'
            />
          ) : (
            <img
              src='https://www.svgrepo.com/download/532213/sort-amount-up.svg'
              alt='Sort-Descending'
              className='w-5 shrink-0 aspect-square'
            />
          )}
        </div> */}
      </div>
    </section>
  );
}

export default AgentSearch;
