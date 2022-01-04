import { useState, useEffect } from "react";
import { Back } from "../components";
import { Divider, Table, Tag } from "antd";
import httpRequest from '../api';
import swal from 'sweetalert2'
import { filterDiagnosis } from '../utils/ReusableSyntax'

const initialState = {
    ITR: 0,
    firstname: "",
    lastname: "",
    middlename: "",
    userGender: "",
    address: "",
    userCivilStatus: "",
    dateOfBirth: "",
    bloodPressure: "",
    temperature: "",
    weight: "",
    height: "",
    age: 0,
};

export default function PatientsRecord({ location }) {

    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    const [
        {
            ITR,
            firstname,
            lastname,
            middlename,
            userGender,
            address,
            userCivilStatus,
            dateOfBirth,
            bloodPressure,
            temperature,
            weight,
            height,
            age,
        },
        setState,
    ] = useState(initialState);

    const [diagnosis, setDiagnosis] = useState([]);

    const onChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;

        setState((prevState) => ({ ...prevState, [name]: value }))
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const config = {
            id,
            ITR: Number(ITR),
            firstname,
            lastname,
            middlename,
            userGender,
            address,
            userCivilStatus,
            dateOfBirth,
            bloodPressure,
            temperature,
            weight,
            height,
            age,
        }

        if (ITR <= 0) {
            return swal.fire({
                icon: "warning",
                title: "Oh nooo :(",
                text: "ITR No should not equal to 0"
            })
        }

        await httpRequest.post("/.netlify/functions/patients?name=patientInfo", config).then((response) => {
            swal.fire({
                icon: "success",
                title: "YAY!",
                text: response.data
            })
        }).catch((error) => {
            swal.fire({
                icon: "warning",
                title: "Ohh nooo :(",
                text: "Something is wrong"
            })
        })
    }

    const diagnosisEndpoints = async () => {

        await httpRequest
            .get("/.netlify/functions/diagnosis")
            .then((response) => {
                const data = filterDiagnosis(response, id)
                setDiagnosis(data)
            });
    }

    useEffect(diagnosisEndpoints, []);


    const httpEndpoint = async () => {
        await httpRequest.post("/.netlify/functions/fetchPatients?name=getPatientsInfo", { id }).then((response) => {
            setState({ ...response.data });
        })
    }

    useEffect(httpEndpoint, []);

    const columns = [
        {
            title: 'ITR',
            dataIndex: 'ITR',
            key: 'ITR'
        },
        {
            title: 'Complaints',
            dataIndex: 'complaints',
            key: 'complaints',
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
        },
        {
            title: "Diagnosis",
            dataIndex: 'section',
            key: 'section',
        },
        {
            title: "Date Created",
            dataIndex: 'date_created',
            key: 'date_created',
            render: (date_created) => (
                <Tag color="geekblue">{new Date(date_created._seconds * 1000).toISOString().substring(0, 10)}</Tag>
            )
        }
    ];


    const gender = ["Male", "Female"];
    const civilStatus = ["Single", "Married"];

    const form = (
        <form onSubmit={onSubmit} className="shadow-xl bg-white rounded-lg p-10 max-w-4xl mx-auto transform -translate-y-12">
            <section>
                <h1 className="font-bold text-2xl py-1 pb-4 text-gray-300">
                    Personal Information
                </h1>
                <div className="mb-5">
                    <label className="block text-gray-700">ITR No:</label>
                    <input
                        type="number"
                        name="ITR"
                        value={ITR}
                        readOnly={true}
                        onChange={(event) => onChange(event)}
                        placeholder="ITR No..."
                        className="w-24 px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        required
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700">Firstname</label>
                        <input
                            type="text"
                            name="firstname"
                            value={firstname}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Firstname..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Lastname</label>
                        <input
                            type="text"
                            name="lastname"
                            value={lastname}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Lastname..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Middlename</label>
                        <input
                            type="text"
                            name="middlename"
                            value={middlename}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Middlename..."
                            className="w-full px-4 py-2 mt-2 rounded-sm bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div>
                        <label className="block text-gray-700 mb-2">Gender</label>
                        <select
                            name="userGender"
                            value={userGender}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            className="block w-full h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value=""></option>
                            {gender.map((gender, index) => (
                                <option key={index} value={gender}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Civil Status</label>
                        <select
                            name="userCivilStatus"
                            value={userCivilStatus}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            className="block w-full h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value=""></option>
                            {civilStatus.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">Address</label>
                    <textarea required name="address" value={address} className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" name="address" rows="4" cols="50">
                    </textarea>
                </div>
            </section>
            <Divider />
            <section>
                <h1 className="font-bold text-2xl pb-4 text-gray-300">
                    Hospital Information
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700">Blood Pressure</label>
                        <input
                            type="text"
                            name="bloodPressure"
                            value={bloodPressure}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Blood Pressure"
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Temperature</label>
                        <input
                            type="text"
                            name="temperature"
                            value={temperature}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Temperature"
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={weight}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Weight..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Height</label>
                        <input
                            type="text"
                            name="height"
                            value={height}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Height..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={age}
                            readOnly={true}
                            onChange={(event) => onChange(event)}
                            placeholder="Height..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
            </section>
            <div className="my-5">
                <div className="mb-4">
                    <h1 className="text-lg font-bold text-gray-600 m-0">Diagnosis Summary</h1>
                    <span className="text-gray-400">Summary of the users diagnosis</span>
                </div>
                <Table columns={columns} dataSource={diagnosis} />
            </div>
        </form>
    );

    return (
        <div>
            <Back redirect="/patient-record" />
            <img
                className="h-60 mt-5 rounded-lg w-full object-cover"
                src="/images/patients-abstract.jpg"
                alt="profile"
            />
            {form}
        </div>
    );
}
