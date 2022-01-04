import { useState, useEffect } from "react";
import { Drawer, AdminTable } from "../components";
import { PlusCircle, RefreshCcw, Trash2, Mail, UserCheck } from "react-feather";
import useToggle from "../hooks/useToggle";
import PhoneInput from "react-phone-input-2";
import httpRequest from "../api";
import swal from "sweetalert2";
import { Tag, Input, Popconfirm, Space } from "antd";
import { arraySlice, onSearch } from '../utils/ReusableSyntax'
import { useHistory, withRouter } from 'react-router-dom';

const initialState = {
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    address: "",
    userGender: "",
    dateSchedule: "",
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

function Appointments() {
    //const dateToday = new Date().toISOString().substring(0, 10);
    const [{ firstname, lastname, middlename, email, address, userGender, dateSchedule }, setState] =
        useState(initialState);
    const [time, getTime] = useState("");
    const [data, setData] = useState([]);
    const [contact, setContact] = useState("+63");
    const [current, setCurrent] = useState(1);
    const [searchFilter, setSearchFilter] = useState(null);
    const history = useHistory();

    const [isToggle, onToggle] = useToggle();

    const onChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const onTimeChange = () => {
        var timeSplit = time.split(':'),
            hours,
            minutes,
            meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours === 0) {
                hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        return hours + ':' + minutes + ' ' + meridian;
    }

    const clearState = () => setState({ ...initialState });

    const onSubmit = (event) => {
        event.preventDefault();

        const time = onTimeChange()

        const config = {
            firstname,
            lastname,
            middlename,
            email,
            contact,
            address,
            userGender,
            dateSchedule,
            time,
            isAppointment: true
        };

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
                });
                clearState();
            })
            .catch((error) => console.log(error));
    };

    const getAppointments = () => {
        httpRequest
            .get("/.netlify/functions/appointments?appointmentParams=getAppointment")
            .then((response) => {
                setData(response.data);
            });
    };

    useEffect(getAppointments, []);

    const onDeleteData = async (event, id) => {
        event.preventDefault();
        await httpRequest
            .post(
                "/.netlify/functions/appointments?appointmentParams=deleteAppointment",
                { id }
            )
            .then((response) => {
                swal.fire({
                    icon: "success",
                    title: "There is no turning back.",
                    text: response.data,
                }).then(() => {
                    window.location.reload();
                });
            });
    }

    const MailRecipient = (event, email) => {
        event.preventDefault();
        window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&tf=1`)
    };

    const PatientsInformation = (event, id) => {
        event.preventDefault();

        history.push(`/patients-information?id=${id}`)
    }

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Fullname",
            key: "fullname",
            render: (info) => (
                <span>{`${info.firstname} ${info.middlename} ${info.lastname}`}</span>
            )
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "contact",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Schedule",
            dataIndex: "dateSchedule",
            key: "dateSchedule",
            render: (dateSchedule) => (
                <Tag color="geekblue">{dateSchedule}</Tag>
            )
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            render: (time) => (
                <Tag color="geekblue">{time}</Tag>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (appointments) => (
                <Space size="middle" key="action">
                    {/** Email Patients */}
                    <Popconfirm
                        title="would you like to continue?"
                        onConfirm={(event) => MailRecipient(event, appointments.email)}
                    >
                        <Mail
                            className="text-blue-500 cursor-pointer"
                            size="20"
                            id="update"
                        />
                    </Popconfirm>

                    {/**Delete Appointments */}
                    <Popconfirm
                        title="would you like to continue?"
                        onConfirm={(event) => onDeleteData(event, appointments.id)}
                    >
                        <Trash2
                            className="text-red-500 cursor-pointer"
                            size="20"
                            id="update"
                        />
                    </Popconfirm>

                    {/**Add to patients area */}
                    <Popconfirm
                        title="would you like to continue?"
                        onConfirm={(event) => PatientsInformation(event, appointments.id)}
                    >
                        <UserCheck
                            className="text-green-500 cursor-pointer"
                            size="20"
                            id="update"
                        />
                    </Popconfirm>
                </Space>
            )
        },
    ];

    //** Data showed to the client
    const dataShowed = 5;
    const currentData = arraySlice(data, current, dataShowed);

    const gender = ["Male", "Female"]

    ///.netlify/functions/appointments?appointmentParams=addAppointment

    return (
        <section>
            <div className="flex justify-between mb-5">
                <div>
                    <h1 className="text-xl">
                        Counter :{" "}
                        <strong className="text-red-500">{data.length}</strong>
                    </h1>
                </div>
                <div className="flex items-center justify-end gap-5 mb-3 md:mb-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded-sm flex items-center gap-2"
                        >
                            <RefreshCcw color="white" size="15" />
                            Refresh
                        </button>
                        <button
                            onClick={onToggle}
                            className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded-sm flex items-center gap-2"
                        >
                            <PlusCircle color="white" size="15" />
                            appointments
                        </button>
                    </div>
                    <Input.Search
                        allowClear
                        className="w-full md:max-w-xs"
                        placeholder="Search..."
                        onSearch={(nameSearch) => {
                            const sea = onSearch(nameSearch, data);
                            setSearchFilter(sea);
                        }}
                    />
                </div>
            </div>
            <div>
                <AdminTable
                    searchFilter={searchFilter}
                    columns={columns}
                    currentData={currentData}
                    DataArray={data}
                    current={current}
                    setCurrent={setCurrent}
                    dataShowed={dataShowed}
                />
            </div>
            <Drawer
                visible={isToggle}
                isVisible={onToggle}
                title="Appointments Details"
            >
                <form onSubmit={onSubmit}>
                    <div>
                        <div>
                            <div>
                                <label className="block text-gray-700">Firstname</label>
                                <input
                                    type="text"
                                    value={firstname}
                                    name="firstname"
                                    onChange={(event) => onChange(event)}
                                    placeholder="Enter Firstname..."
                                    className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mt-4">Lastname</label>
                                <input
                                    type="text"
                                    value={lastname}
                                    name="lastname"
                                    onChange={(event) => onChange(event)}
                                    placeholder="Enter Lastname..."
                                    className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mt-4">Middlename</label>
                                <input
                                    type="text"
                                    value={middlename}
                                    name="middlename"
                                    onChange={(event) => onChange(event)}
                                    placeholder="Enter Middlename..."
                                    className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
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
                                onChange={(phone) => setContact(phone)}
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
                            <label className="block text-gray-700 mb-2">Gender</label>
                            <select
                                name="userGender"
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
                        <div className="mt-4">
                            <label className="block text-gray-700">Date schedule</label>
                            <input
                                type="date"
                                value={dateSchedule}
                                name="dateSchedule"
                                onChange={(event) => onChange(event)}
                                placeholder="Enter Schedule..."
                                className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Schedule Time</label>
                            <input
                                type="time"
                                value={time}
                                name="timeSchedule"
                                onChange={(event) => getTime(event.target.value)}
                                placeholder="Enter Schedule..."
                                className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button className="text-sm bg-gray-900 rounded-lg py-2 w-full text-white hover:bg-gray-700 focus:bg-gray-700">
                            submit
                        </button>
                    </div>
                </form>
            </Drawer>
        </section>
    );
}

export default withRouter(Appointments);