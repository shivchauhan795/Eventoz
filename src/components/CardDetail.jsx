import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ExcelJS from 'exceljs';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import dotenv from 'dotenv'


const cookies = new Cookies();

// dotenv.config()

function CardDetail() {
    const backendURL = 'https://eventoz-backend.onrender.com/'
    const { id } = useParams();
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [attendedCount, setAttendedCount] = useState(0);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [attendedUsers, setAttendedUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = cookies.get("TOKEN");

                // Fetch the event details
                const response = await fetch(`${backendURL}myevents`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await response.json();
                const events = data.events;
                const card = events.find(event => event.id === id);
                if (!card) {
                    setError('Card not found');
                } else {
                    setCardData(card);

                    // Fetch the registration count for this event
                    const registrationResponse = await fetch(`${backendURL}event/${id}/registrations`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (registrationResponse.ok) {
                        const registrationData = await registrationResponse.json();
                        setRegistrationCount(registrationData.registrationCount);
                    } else {
                        console.error('Failed to fetch registration count');
                    }

                    // Fetch the attended count for this event
                    const attendedResponse = await fetch(`${backendURL}event/${id}/attended`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (attendedResponse.ok) {
                        const attendedData = await attendedResponse.json();
                        setAttendedCount(attendedData.attendedCount);
                    } else {
                        console.error('Failed to fetch attended count');
                    }

                    // Fetch the registered users for this event
                    const userRegisteredResponse = await fetch(`${backendURL}registeredusers/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (userRegisteredResponse.ok) {
                        const regesteredUserData = await userRegisteredResponse.json();
                        setRegisteredUsers(regesteredUserData.registeredUsers);
                    } else {
                        console.error('Failed to fetch registered users');
                    }

                    // Fetch the attended users for this event
                    const userAttendedResponse = await fetch(`${backendURL}attendedusers/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (userAttendedResponse.ok) {
                        const attendedUserData = await userAttendedResponse.json();
                        setAttendedUsers(attendedUserData.attendedUsers);
                    } else {
                        console.error('Failed to fetch registered users');
                    }
                }
            } catch (e) {
                setError('An error occurred');
                console.error(e);
            }
        };

        fetchData();
    }, [id]);

    const handleExportRegisteredUser = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Registered Users');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Branch', key: 'branch', width: 20 },
            { header: 'College', key: 'college', width: 20 },
            { header: 'Semester', key: 'semester', width: 10 },
            { header: 'Phone No', key: 'phoneno', width: 15 },
            { header: 'Email', key: 'email', width: 30 }
        ];

        registeredUsers.forEach(user => {
            worksheet.addRow({
                name: user.name,
                branch: user.branch,
                college: user.college,
                semester: user.semester,
                phoneno: user.phoneno,
                email: user.email
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registered_users.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleExportAttendedUser = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Attended Users');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Branch', key: 'branch', width: 20 },
            { header: 'College', key: 'college', width: 20 },
            { header: 'Semester', key: 'semester', width: 10 },
            { header: 'Phone No', key: 'phoneno', width: 15 },
            { header: 'Email', key: 'email', width: 30 }
        ];

        attendedUsers.forEach(user => {
            worksheet.addRow({
                name: user.name,
                branch: user.branch,
                college: user.college,
                semester: user.semester,
                phoneno: user.phoneno,
                email: user.email
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'attended_users.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (error) return <div>{error}</div>;
    if (!cardData) return <div>Loading...</div>;

    const handleCopyRegistrationLink = () => {
        const registrationLink = `${window.location.origin}/eventregisterationform/${id}`;
        navigator.clipboard.writeText(registrationLink)
            .then(() => {
                toast('Registration link copied to clipboard!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate("/eventregisterationform/${id}")
            })
            .catch(err => {
                toast('Failed to copy the registration link!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.error('Failed to copy text: ', err);
            });
    };


    // const handleCreateForm = () => {
    //     navigate(`/createformpage/${id}`);
    // };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='h-screen pt-6 flex flex-col items-center gap-9'>
                <div className='flex justify-center flex-col items-center'>
                    <img className='w-96' src={cardData.banner} alt={cardData.eventName} />
                    <h1 className='text-4xl uppercase font-bold p-6'>{cardData.eventName}</h1>
                    <p className='text-2xl font-medium p-5'>{cardData.eventDesc}</p>
                    <p className='text-2xl font-medium p-5'>TIME: {cardData.date}</p>
                    <p className='text-2xl font-medium'>Total Participants Registered: {registrationCount}</p>
                    <p className='text-2xl font-medium'>Total Participants Attended: {attendedCount}</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    {registrationCount > 0 &&
                        <button
                            onClick={handleExportRegisteredUser}
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-fit">
                            Export Registered Users to Excel
                        </button>
                    }
                    {attendedCount > 0 &&
                        <button
                            onClick={handleExportAttendedUser}
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-fit">
                            Export Attended Users to Excel
                        </button>
                    }
                    <button
                        onClick={handleCopyRegistrationLink}
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-fit">
                        Copy Registeration Link
                    </button>
                </div>
            </div>
        </>
    );
}

export default CardDetail;
