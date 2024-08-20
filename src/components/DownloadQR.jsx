import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DownloadQR = () => {
    const { id } = useParams();
    const [qrUrl, setQrUrl] = useState('');

    useEffect(() => {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(id)}`;
        setQrUrl(qrApiUrl);
    }, [id]);

    const handleDownload = async () => {
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'qr-code.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the QR code:', error);
        }
    };

    return (
        <>
            <div className='flex flex-col items-center p-10 h-screen'>

                <div className='text-3xl uppercase font-bold'>
                    Thanks for registering !!
                </div>

                {qrUrl && (
                    <div className='flex flex-col items-center mt-10'>
                        <img src={qrUrl} alt="QR Code" />
                        <button className='text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm mt-10 mb-10 px-5 py-2.5 text-center me-2' onClick={handleDownload}>Download QR</button>
                    </div>
                )}
                <div className='text-lg uppercase'>
                    Kindly download the QR Code and show it at the time of entry.
                </div>
            </div>
        </>
    );
};

export default DownloadQR;
