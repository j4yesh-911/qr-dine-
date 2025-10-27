import React from "react";
import QRCode from "react-qr-code";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function QRGenerator() {
  const tables = [1, 2, 3, 4, 5, 6, 7, 8]; // ✅ Adjust number of tables here

  const baseURL =" http://qr-dine-8fol.vercel.app"; // Automatically detect domain

  const handleDownload = (tableId) => {
    const canvas = document.createElement("canvas");
    const svg = document.getElementById(`qr-${tableId}`);
    const svgData = new XMLSerializer().serializeToString(svg);

    const img = new Image();
    img.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `Table-${tableId}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleCopy = (tableId) => {
    const link = `${baseURL}/menu?tableId=${tableId}`;
    navigator.clipboard.writeText(link);
    alert(`Copied link for Table ${tableId}: ${link}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="QR Generator" />

        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
            Table QR Codes
          </h1>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tables.map((tableId) => {
              const qrValue = `${baseURL}/menu?tableId=${tableId}`;
              return (
                <div
                  key={tableId}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg hover:shadow-cyan-500/20 transition"
                >
                  <div className="text-lg font-semibold mb-3 text-cyan-400">
                    Table {tableId}
                  </div>

                  <div className="bg-white p-3 rounded-xl">
                    <QRCode
                      id={`qr-${tableId}`}
                      value={qrValue}
                      size={180}
                      bgColor="white"
                      fgColor="#000000"
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>

                  <p className="mt-3 text-sm text-gray-300 break-all">
                    {qrValue}
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleDownload(tableId)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleCopy(tableId)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
