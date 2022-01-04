import { useState, useEffect } from 'react';
import { DashboardCards } from '../components'
import { Users, Activity, Calendar } from 'react-feather';
import httpRequest from '../api';

export default function Dashboard() {

    const [appointements, setAppointments] = useState([]);
    const [staff, setStaff] = useState([])
    const [patient, setPatient] = useState([]);

    const getAppointments = () => {
        httpRequest
            .get("/.netlify/functions/appointments?appointmentParams=getAppointment")
            .then((response) => {
                setAppointments(response.data);
            });
    };

    useEffect(getAppointments, []);

    const endpoint = () => {
        httpRequest
            .get("/.netlify/functions/getStaff")
            .then((response) => {
                setStaff(response.data);
            });
    };

    useEffect(endpoint, []);

    const httpEndpoint = async () => {
        await httpRequest
            .get("/.netlify/functions/fetchPatients?name=getPatients")
            .then((response) => {
                setPatient(response.data);
            });
    };

    useEffect(httpEndpoint, []);

    const cardData = [
        {
            title: "Staf Management",
            numberData: staff.length,
            icon: <Users color="#FFF" size="25" />,
            iconColor: "bg-blue-300",
            cardColor: "bg-white",
        },
        {
            title: "Appointments",
            numberData: appointements.length,
            icon: <Calendar color="#FFF" size="25" />,
            iconColor: "bg-blue-300",
            cardColor: "bg-white",
        },
        {
            title: "Diagnosed Patients",
            numberData: patient.length,
            icon: <Activity color="#FFF" size="25" />,
            iconColor: "bg-blue-300",
            cardColor: "bg-white",
        }
    ];


    return (
        <div className="grid grid-rows gap-3 md:grid-cols-2 lg:grid-cols-3 mb-4 w-full">
            {cardData.map((value, index) => (
                <DashboardCards
                    key={index}
                    icon={value.icon}
                    title={value.title}
                    numberData={value.numberData}
                    iconColor={value.iconColor}
                    cardColor={value.cardColor}
                />
            )
            )}
        </div>
    )
}