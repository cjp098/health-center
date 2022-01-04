import { useEffect, useState } from "react";
import { FormLayout } from "../components";
import { Divider } from "antd";
import httpRequest from "../api";
import swal from 'sweetalert2';
import useToggle from '../hooks/useToggle'
import { filterDiagnosis } from '../utils/ReusableSyntax'
import { ChevronRight, X, Check } from 'react-feather';

const initialState = {
    ITR: "",
    firstname: "",
    lastname: "",
    middlename: "",
    complaints: "",
    remarks: "",
    section: "",
    diagnosis: []
};


export default function Complaints({ location }) {
    const [
        { ITR, firstname, lastname, middlename, complaints, remarks, section, diagnosis },
        setState,
    ] = useState(initialState);
    const [data, setData] = useState([]);


    const [toggle, isToggle] = useToggle();

    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    const onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setState((prevState) => ({ ...prevState, [name]: value }))
    }

    const clearState = () => setState({ ...initialState });

    const onSubmit = (event) => {
        event.preventDefault();

        const config = {
            patientId: id,
            ITR, firstname, lastname, middlename, complaints, remarks, section
        }

        httpRequest
            .post("/.netlify/functions/patients?name=diagnosis", config)
            .then((response) => {
                swal.fire({
                    icon: "success",
                    title: "Yay! :D",
                    text: response.data,
                });

                clearState();
            })
            .catch(() => {
                swal.fire({
                    icon: "warning",
                    title: "Oh no! :(",
                    text: "something wrong in the server",
                });
            });
    }

    const httpEndpoint = async () => {
        httpRequest
            .post("/.netlify/functions/fetchPatients?name=patientName", { id })
            .then((response) => {
                setState({ ...response.data })
            });
    };

    useEffect(httpEndpoint, []);

    const diagnosisEndpoints = async () => {

        await httpRequest
            .get("/.netlify/functions/diagnosis")
            .then((response) => {
                const data = filterDiagnosis(response, id)
                setData(data)
            });
    }


    useEffect(diagnosisEndpoints, []);

    const option = [
        "Dental",
        "Fecalysis",
        "Hematology",
        "Prenatal",
        "Xray",
        "Rehabilitation",
        "Sputum",
        "Urinalysis",
        "Maternity",
    ];

    const form = (
        <form onSubmit={onSubmit} className="shadow-xl bg-white rounded-lg p-10 max-w-4xl mx-auto transform -translate-y-12">
            <div className="float-right">
                <X className="text-gray-400 cursor-pointer" onClick={isToggle} />
            </div>
            <h1 className="font-bold text-2xl py-1 pb-4 text-gray-300">
                Personal Information
            </h1>
            <div className="mb-5">
                <label className="block text-gray-700">ITR No:</label>
                <input
                    type="number"
                    name="ITR"
                    value={ITR}
                    onChange={(event) => onChange(event)}
                    placeholder="ITR No..."
                    className="w-24 px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                />
            </div>
            <section className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-gray-700">Firstname</label>
                    <input
                        type="text"
                        name="firstname"
                        readOnly={true}
                        value={firstname}
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
                        readOnly={true}
                        value={lastname}
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
                        readOnly={true}
                        value={middlename}
                        onChange={(event) => onChange(event)}
                        placeholder="Middlename..."
                        className="w-full px-4 py-2 mt-2 rounded-sm bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        required
                    />
                </div>
            </section>
            <Divider />
            <section>
                <h1 className="font-bold text-2xl py-1 text-gray-300">
                    Complaints Information
                </h1>
                <div className="mt-4">
                    <label className="block text-gray-700">Complaints</label>
                    <textarea
                        required
                        placeholder="complaints..."
                        className="mt-2 w-full px-4 py-2 rounded-sm bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        name="complaints"
                        value={complaints}
                        onChange={(event) => onChange(event)}
                        rows="4"
                        cols="50"
                    ></textarea>
                </div>
            </section>
            <Divider />
            <section>
                <h1 className="font-bold text-2xl py-1 text-gray-300">
                    Remarks Information
                </h1>
                <div className="mt-4">
                    <label className="block text-gray-700">Remarks</label>
                    <textarea
                        required
                        placeholder="remarks..."
                        className="mt-2 w-full px-4 py-2 rounded-sm bg-gray-100 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        name="remarks"
                        value={remarks}
                        onChange={(event) => onChange(event)}
                        rows="4"
                        cols="50"
                    ></textarea>
                </div>
            </section>
            <div className="mt-4">
                <label className="block text-gray-700 mb-2">Section</label>
                <select
                    name="section"
                    value={section}
                    onChange={(event) => onChange(event)}
                    className="block w-full h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value=""></option>
                    {option.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-end gap-2 mt-8">
                <button
                    type="button"
                    className="border border-blue-500 text-blue-500 hover:text-blue-400 hover:text-blue-400 py-1 px-6 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-6 rounded-lg"
                >
                    Submit
                </button>
            </div>
        </form>
    );

    return <FormLayout redirect="/patients">
        {toggle ? (
            form
        ) : (
            <section className="flex gap-4">
                <div className="w-1/2 my-4 shadow-lg bg-white rounded-lg w-full px-8">
                    <div className="py-6">
                        <h1 className="text-xl font-bold flex items-center text-gray-500 m-0">Complaints</h1>
                        <span className="text-gray-400">a list of a patients complaints</span>
                    </div>
                    <div>
                        <ul>
                            {data.map((value, index) => (
                                <li key={index} className="flex items-center justify-between mb-5">
                                    <span className="bg-blue-500 py-1.5 px-3.5 rounded-full font-bold text-white">{index + 1}</span>
                                    <h1 className="text-lg text-gray-500 font-bold">{value.section}</h1>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div onClick={isToggle} className="w-full h-full bg-white my-4 cursor-pointer shadow-lg rounded-lg w-full flex items-center justify-between px-4">
                    <h1 className="text-xl font-bold flex items-center text-gray-500 py-6">Add diagnosis</h1>
                    <ChevronRight size="25" />
                </div>
            </section>
        )}

    </FormLayout>;
}
