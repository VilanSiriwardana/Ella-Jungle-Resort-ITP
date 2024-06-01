import React from "react";

function AgencyHome() {
  return (
    <div className="flex flex-col justify-center mx-auto">
      <h1 className="flex mx-auto text-4xl">Agency Home</h1>

      <a href="/AgencyList/660ab882ee4d90bfb2851cc6" className="mx-auto mt-20 text-2xl"><h1 className="">Agency List</h1></a>
      <a href="/AgencySentRequestList/660ab882ee4d90bfb2851cc6" className="mx-auto mt-5 text-2xl"><h1 className="">Sent Request List</h1></a>

      <a href="/AgencyCreatePackage/660a359e3cb6d44135aa5ff2/null" className="mx-auto mt-20 text-2xl"><h1 className="">Create Package</h1></a>
      <a href="/AgencyMyPackage/660a359e3cb6d44135aa5ff2" className="mx-auto mt-5 text-2xl"><h1 className="">My Packages</h1></a>
      <a href="/AgencyRequestList/660a359e3cb6d44135aa5ff2" className="mx-auto mt-5 text-2xl"><h1 className="">Received Requests</h1></a>


    </div>
  );
}

export default AgencyHome;