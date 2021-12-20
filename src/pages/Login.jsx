import { useState } from "react";
import useToggle from '../hooks/useToggle'
import { Register } from "../components"
//const inputStyle = "px-4 py-2 rounded-lg w-full border hover:border-2 border-gray-200 hover:border-blue-500 focus:border-blue-500"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isToggle, onToggle] = useToggle()

    const onSubmit = () => {

    }


    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img
                    src="/images/Login.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div
                className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center"
            >
                <div className="w-full h-100">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                        {isToggle ? "Welcome Back!" : "Registration Form"}
                    </h1>
                    <p className="text-gray-400">

                        Dont forget to put your password to proceed
                    </p>
                    {isToggle ? (
                        <form onSubmit={onSubmit} className="mt-6">
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Enter Email Address"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter Password"
                                    minLength={6}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500
               focus:bg-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="text-right mt-2">
                                <button className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                                    Forgot Password?
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
             px-4 py-3 mt-6"
                            >
                                Log In
                            </button>
                        </form>
                    ) : (
                        <Register />
                    )}
                    <hr className="my-6 border-gray-300 w-full" />
                    <p className="mt-8">
                        {isToggle && "Need an account? "}
                        <button
                            onClick={onToggle}
                            type="button"
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                            {isToggle ? "Create an account" : "Back to Login"}
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
}
