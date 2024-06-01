import React from "react";
import { useParams } from "react-router-dom";

function AgencyRequestPackage() {
  const { userId, agencyId } = useParams();

  console.log("User ID:", userId);

  return (
    <div className="mr-[50px] mt-[100px] ml-28 ">
      <section className="flex flex-col w-[300px] px-8 py-5 my-auto text-xl bg-[#63fa9a] rounded-xl bg-opacity-20 border border-gray-400 ">
        <p className="flex justify-center text-black">Request new package</p>
        <div className="flex justify-center">
          <button
            className=" w-[200px] h-10 border border-gray-400 bg-green-400 mt-5 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
            onClick={() => {
              window.location.href = `/AgencySendRequest/${agencyId}`;
            }}
          >
            Send a Request
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease"></span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default AgencyRequestPackage;
