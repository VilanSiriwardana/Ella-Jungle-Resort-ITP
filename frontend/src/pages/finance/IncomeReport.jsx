import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import TotalEarningsCustomPkgBooking from "./TotalEarningsCustomPkgBooking";
import TotalEarningsHotelPkgBooking from "./TotalEarningsHotelPackages";
import TotalEarningsSpa from "./TotalEarningsSpa";
import TotalEarningsSpecialActivity from "./TotalEarningsSpecialActivity";

const FinanceReport = () => {
  const generatePDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("Finance Report", 10, 10);
    doc.autoTable({
      head: [['Service', 'Total Earnings']],
      body: [
        ['Special Activity', 'Rs. ' + document.getElementById('specialActivityAmount').textContent],
        ['Spa', 'Rs. ' + document.getElementById('spaAmount').textContent],
        ['Hotel Package Booking', 'Rs. ' + document.getElementById('hotelPackageAmount').textContent],
        ['Custom Package Booking', 'Rs. ' + document.getElementById('customPackageAmount').textContent],
      ]
    });

    // Save the PDF
    doc.save('finance_report.pdf');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finance Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsSpecialActivity />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsSpa />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsHotelPkgBooking />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsCustomPkgBooking />
        </div>
      </div>
      <div className="mt-8">
        <button className="btn btn-primary bg-green-500 text-white py-2 px-4 rounded" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default FinanceReport;
