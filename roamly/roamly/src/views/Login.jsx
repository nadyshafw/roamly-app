import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router"
import axios from 'axios'
import baseUrl from "../constant/baseUrl"
import Toastify from 'toastify-js'
import { GoogleLogin } from '@react-oauth/google';


export default function Login() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/login`, { email, password })
            localStorage.setItem('token', data.access_token)

            navigate("/")
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#D61313",
                },
            }).showToast();
        }
    }

    if (localStorage.token) {
        Toastify({
            text: "You already logged in",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#D61313",
            },
        }).showToast();
        return <Navigate to={"/"}/>
    }

    async function handleLoginGoogle(credentialResponse) {
        try {
            const { data } = await axios.post(`${baseUrl}/login-google`, {}, {
                headers: {
                    token: credentialResponse.credential
                }
            })

            localStorage.setItem('token', data.access_token)
            navigate("/")
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#D61313",
                },
            }).showToast();
        }
    }


    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold text-amber-600 mb-4 text-center">ROAMLY</h2>

                <form onSubmit={handleSubmit} 
                    className="space-y-3">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        autoComplete="current-email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <button type="submit"
                        className="w-full bg-amber-500 text-white rounded-lg py-2 disabled:opacity-50">
                        Login
                    </button>

                </form>

                <div className="my-4 text-center text-gray-400">OR</div>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleLoginGoogle}
                    />;
                </div>

                <p className="text-sm text-center mt-4">
                    Don't have an account?<Link to="/regis" className="text-amber-600">Register</Link>
                </p>

            </div>
        </>
    )
}

