import { useState } from "react";
import { Back } from "../components";
import { Divider } from "antd";
import httpRequest from "../api";
import swal from "sweetalert2";

const initialState = {
    //**Personal Information */
    firstname: "",
    lastname: "",
    middlename: "",
    userGender: "",
    dateOfBirth: "",

    //**Account Information */
    email: "",
    username: "",
    password: "",

    //**Location Information */
    address: "",
    province: "",
    zipcode: "",
};

export default function StaffInformation() {
    const [
        {
            firstname,
            lastname,
            middlename,
            userGender,
            dateOfBirth,
            email,
            username,
            password,
            address,
            province,
            zipcode,
        },
        setState,
    ] = useState(initialState);

    const onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const clearState = () => setState({ ...initialState });

    const onSubmit = async (event) => {
        event.preventDefault();

        const config = {
            firstname,
            lastname,
            middlename,
            userGender,
            dateOfBirth,
            email,
            username,
            password,
            address,
            province,
            zipcode,
            isAdmin: false
        };

        await httpRequest
            .post("/.netlify/functions/auth", config)
            .then((response) => {
                swal.fire({
                    icon: "success",
                    title: "YAY!",
                    text: response.data,
                });
                clearState();
            })
            .catch((error) => {
                swal.fire({
                    icon: "warning",
                    title: "Something is wrong :(",
                    text: error.data,
                });
            });
    };

    const gender = ["Male", "Female"];

    const form = (
        <form
            onSubmit={onSubmit}
            className="shadow-xl bg-white rounded-lg p-10 max-w-4xl mx-auto transform -translate-y-12"
        >
            <section>
                <h1 className="font-bold text-2xl py-1 pb-4 text-gray-300">
                    Personal Information
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700">Firstname</label>
                        <input
                            type="text"
                            name="firstname"
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
                            value={middlename}
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
                        <label className="block text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(event) => onChange(event)}
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
            </section>
            <Divider />
            <section>
                <h1 className="font-bold text-2xl pb-4 text-gray-300">
                    Account Information
                </h1>
                <div className="grid grid-cols-3 gap-4 ">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(event) => onChange(event)}
                            placeholder="Email..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(event) => onChange(event)}
                            placeholder="Username..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => onChange(event)}
                            placeholder="Password..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
            </section>
            <Divider />
            <section>
                <h1 className="font-bold text-2xl pb-4 text-gray-300">
                    Location Information
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(event) => onChange(event)}
                            placeholder="Address..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Province</label>
                        <input
                            type="text"
                            name="province"
                            value={province}
                            onChange={(event) => onChange(event)}
                            placeholder="Province..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Zipcode</label>
                        <input
                            type="text"
                            name="zipcode"
                            value={zipcode}
                            onChange={(event) => onChange(event)}
                            placeholder="Zipcode..."
                            className="w-full px-4 py-2 rounded-sm bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
            </section>
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

    return (
        <div>
            <Back redirect="/staff" />
            <section>
                {/* <div className="h-60 mt-5 rounded-lg w-full bg-blue-500" /> */}
                <img
                    className="h-60 mt-5 rounded-lg w-full object-cover"
                    src="/images/background.jpg"
                    alt="profile"
                />
                {/* <div className="transform -translate-y-12 px-10 text-center">
                    <Avatar color="#1e2a47" name={"Ian Drilon"} value="100%" size="150" className="font-bold rounded-full" />
                </div> */}
                {form}
            </section>
        </div>
    );
}
