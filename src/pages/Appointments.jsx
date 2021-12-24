import { useState } from "react";
import { Layout, Drawer } from "../components";
import { PlusCircle } from "react-feather";
import useToggle from "../hooks/useToggle";
import PhoneInput from "react-phone-input-2";
import httpRequest from '../api'
import swal from 'sweetalert2';

const initialState = {
    fullname: "",
    email: "",
    address: "",
    schedule: "",
};

const buttonStyle = {
    border: "none",
    outline: "none",
    padding: "5px 2px",
};

const inputStyle = {
    width: "100%",
    border: "2px solid #F3F4F6",
    padding: "10px",
    textIndent: "48px",
    padding: "20px 0",
};

export default function Appointments() {
    //const dateToday = new Date().toISOString().substring(0, 10);
    const [{ fullname, email, address, schedule }, setState] =
        useState(initialState);
    const [contact, setContact] = useState("+63")

    const [isToggle, onToggle] = useToggle();

    const onChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const clearState = () => setState({ ...initialState });

    const onSubmit = (event) => {
        event.preventDefault();

        const config = {
            fullname, email, contact, address, schedule
        }

        httpRequest
            .post(
                "/.netlify/functions/appointments?appointmentParams=addAppointment",
                config
            )
            .then((response) => {
                swal.fire({
                    icon: "success",
                    title: "YAY!",
                    text: response.data,
                })
                console.log(response);
                clearState();
            })
            .catch((error) => console.log(error));
    };

    ///.netlify/functions/appointments?appointmentParams=addAppointment

    return (
        <Layout title="Appointments">
            <section className="flex gap-5">
                <div>
                    <button
                        onClick={onToggle}
                        className="bg-gray-800 hover:bg-gray-600 text-white p-2 px-4 rounded-lg flex items-center gap-2"
                    >
                        <PlusCircle color="white" size="15" />
                        appointments
                    </button>
                </div>
                <Drawer
                    visible={isToggle}
                    isVisible={onToggle}
                    title="Appointments Details"
                >
                    <form onSubmit={onSubmit}>
                        <div>
                            <div>
                                <label className="block text-gray-700">Fullname</label>
                                <input
                                    type="text"
                                    value={fullname}
                                    name="fullname"
                                    onChange={(event) => onChange(event)}
                                    placeholder="Enter Fullname..."
                                    className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={(event) => onChange(event)}
                                    placeholder="Enter Email..."
                                    className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 mb-2">
                                    Contact Number
                                </label>
                                <PhoneInput
                                    defaultMask="... ... ...."
                                    masks={{ ph: "... ... ...." }}
                                    country="ph"
                                    disableDropdown
                                    countryCodeEditable={false}
                                    value={contact}
                                    name="contact"
                                    onChange={phone => setContact(phone)}
                                    placeholder="Enter phone number...."
                                    containerClass="w-full"
                                    buttonStyle={buttonStyle}
                                    inputStyle={inputStyle}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    name="address"
                                    onChange={(event) => onChange(event)}
                                    placeholder="Enter Address..."
                                    className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Schedule</label>
                                <input
                                    type="datetime-local"
                                    value={schedule}
                                    name="schedule"
                                    onChange={(event) => onChange(event)}
                                    placeholder="Enter Schedule..."
                                    className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-6 text-right">
                            <button
                                className="text-sm bg-gray-900 rounded-lg py-2 w-full text-white hover:bg-gray-700 focus:bg-gray-700"
                            >
                                submit
                            </button>
                        </div>
                    </form>
                </Drawer>
            </section>
        </Layout>
    );
}
