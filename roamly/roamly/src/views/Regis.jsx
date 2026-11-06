import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import baseUrl from "../constant/baseUrl";
import Toastify from 'toastify-js'

export default function Regis() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    function handleForm(name, value) {
        setForm((oldValue) => {
            return {
                ...oldValue,
                [name]: value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/regis`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            // console.log(data);
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#228B22",
                },
            }).showToast();

            navigate("/login")
        } catch (error) {
            console.log(error.response);
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
                
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        onChange={(e) => handleForm("username", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => handleForm("email", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => handleForm("password", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <button type="submit"
                        className="w-full bg-amber-500 text-white rounded-lg py-2 disabled:opacity-50">
                            Register
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Do you have an account?
                    <Link to="/login" className="text-amber-600">Login</Link>
                </p>
            </div>
        </>
    )
}