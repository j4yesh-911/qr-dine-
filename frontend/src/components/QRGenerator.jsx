import React from "react";
import QRCode from "react-qr-code";

export default function QRGenerator() {
  const tables = [1, 2, 3, 4, 5];
  const baseURL = "https://your-deployed-site-url.com"; // change later after deploy

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-800 text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 drop-shadow-lg">
        Table QR Codes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {tables.map((table) => {
          const qrValue = `${baseURL}/menu?table=${table}`;
          return (
            <div
              key={table}
              className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)]"
            >
              <QRCode value={qrValue} size={180} className="rounded-xl" />
              <p className="mt-4 text-xl font-semibold text-indigo-100">
                Table {table}
              </p>
              <p className="text-sm text-indigo-300 break-all text-center mt-2">
                {qrValue}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
