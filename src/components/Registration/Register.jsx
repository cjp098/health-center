import { useState } from 'react';
import httpRequest from "../../api";

const initialState = {
    fullName: "",
    email: "",
    password: ""
}

export default function Register() {

    const [{ fullName, email, password }, setState] = useState(initialState);
    const [error, setError] = useState({ active: false, message: "" })

    const onChange = (event) => {
        const { name, value } = event.target;

        setState((prevState) => ({ ...prevState, [name]: value }))
    }

    const clearState = () => setState({ ...initialState })


    const onSubmit = async (event) => {
        event.preventDefault();

        const config = {
            fullName,
            email,
            password,
        };

        await httpRequest
            .post(
                "/.netlify/functions/auth",
                config
            )
            .then((response) => {
                setError({ active: true, message: response.data.message })
            }).catch((error) => {
                setError({ active: false, message: error.data.message })
            });

        clearState();
    };

    return (
        <form onSubmit={onSubmit} className="mt-6">
            <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    onChange={(event) => onChange(event)}
                    name="fullName"
                    value={fullName}
                    placeholder="Enter Full Name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mt-4">Email Address</label>
                <input
                    type="email"
                    onChange={(event) => onChange(event)}
                    name="email"
                    value={email}
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    onChange={(event) => onChange(event)}
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    minLength={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500
      focus:bg-white focus:outline-none"
                    required
                />
            </div>

            <div className={`${error.active ? "bg-green-500" : "bg-red-500"} py-2 px-4 text-white rounded-lg my-2`}>
                {error.message}
            </div>
            <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
    px-4 py-3 mt-6"
            >
                Register
            </button>
        </form>
    )
}