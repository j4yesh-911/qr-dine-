import React from "react";
import QRCode from "react-qr-code";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function QRGenerator() {
  const nav = useNavigate();

  const tables = [1, 2, 3, 4, 5];
  const baseURL = "https://your-deployed-site-url.com"; // change later after deploy

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Optional sidebar on the left */}
      {/* <Sidebar /> */}

      <div className="flex-1 p-8 flex flex-col items-center">
        {/* Top bar button */}
        <div className="w-full flex justify-end mb-8">
          <button
            onClick={() => nav("/admin")}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2 rounded-lg font-medium transition-colors duration-200 border border-gray-700"
          >
            Dashboard
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-10 text-gray-100 tracking-wide">
          Table QR Codes
        </h1>

        {/* QR Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {tables.map((table) => {
            const qrValue = `${baseURL}/menu?table=${table}`;
            return (
              <div
                key={table}
                className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 shadow-md hover:shadow-lg hover:border-gray-700 transition-all duration-300 flex flex-col items-center"
              >
                <div className="bg-white p-3 rounded-lg">
                  <QRCode value={qrValue} size={160} />
                </div>
                <p className="mt-4 text-lg font-semibold text-gray-200">
                  Table {table}
                </p>
                <p className="text-sm text-gray-500 mt-1 text-center break-all">
                  {qrValue}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
