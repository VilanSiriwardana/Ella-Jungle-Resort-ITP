import React from "react";
import AgencyMyPackage from "./agencyMyPackage";
import AgencyBgImg from "../../../assets/agencyBackground/agencybg5.png";

function AgencyHome() {

  return (
    <div
      style={{
        backgroundImage: `url("${AgencyBgImg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div>
        <AgencyMyPackage />

      </div>
    </div>
  );
}

export default AgencyHome;