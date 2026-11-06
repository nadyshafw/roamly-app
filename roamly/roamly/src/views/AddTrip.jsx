import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import baseUrl from "../constant/baseUrl";
import Toastify from "toastify-js";

export default function AddTrip() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        destination: "",
        title: "",
        days: 1,
        startDate: "",
        budget: 0
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
        e.preventDefault();
        try {
            const { data } = await axios.post(`${baseUrl}/trips`, form, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

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

            navigate("/");
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
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-amber-700">
                Create New Trip
            </h2>

            <p className="text-gray-500 mt-1 mb-6">
                Let's plan your next adventure!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Destination
                    </label>
                    <input
                        type="text"
                        onChange={(e) => handleForm("destination", e.target.value)}
                        placeholder="Example: Bali"
                        required
                        className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Trip Title
                    </label>
                    <input
                        type="text"
                        onChange={(e) => handleForm("title", e.target.value)}
                        placeholder="Example: My Summer Vacation"
                        required
                        className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Duration (Days)
                    </label>
                    <input
                        type="number"
                        min="1"
                        onChange={(e) => handleForm("days", +e.target.value)}
                        placeholder="Example: 5"
                        required
                        className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        onChange={(e) => handleForm("startDate", e.target.value)}
                        required
                        className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Budget (Rp)
                    </label>
                    <input
                        type="number"
                        min="0"
                        onChange={(e) => handleForm("budget", +e.target.value)}
                        placeholder="Example: 2000000"
                        required
                        className="w-full border rounded-lg p-3 outline-none focus:border-amber-500"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <Link
                        to="/"
                        className="flex-1 text-center border border-gray-300 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="flex-1 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600"
                    >
                        Create Trip
                    </button>
                </div>
            </form>
        </div>
    );
}
