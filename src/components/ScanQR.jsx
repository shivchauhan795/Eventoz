import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
// import dotenv from 'dotenv'

// dotenv.config()

const ScanQR = () => {
  const backendURL = 'https://eventoz-tau.vercel.app/'
  const [scannedValue, setScannedValue] = useState('');
  const [userName, setUserName] = useState('');

  const handleScan = async (result) => {
    if (result && result.length > 0) {
      const rawValue = result[0].rawValue;
      setScannedValue(rawValue);

      try {
        const response = await fetch(`${backendURL}updateAttendance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: rawValue, // Send the scanned ID to the server
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Attendance updated successfully:', data.message);
          setUserName(data.name);
        } else {
          console.error('Error updating attendance:', data.message);
        }
      } catch (error) {
        console.error('Error making request:', error);
      }
    }
  };


  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center  pt-11">
        <h1 className="text-5xl uppercase font-bold">Scan Code</h1>
        <div className="flex justify-center h-full items-center">
          <div className="flex h-[400px]">
            <Scanner className="scanner-box" onScan={handleScan} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center pb-16 text-green-500">
          {userName ? `Welcome, ${userName}` : 'No Result Yet!!'}
        </h2>
      </div>
    </>
  );
};

export default ScanQR;
