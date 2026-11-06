
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../constant/baseUrl";
import Toastify from "toastify-js";

export default function EditActivity() {
    const { tripId, activityId } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState({
        title: "",
        day: 1,
        note: ""
    });

    function handleChange(name, value) {
        setActivity((oldValue) => {
            return {
                ...oldValue,
                [name]: value
            }
        })
    }

    async function fetchActivity() {
        try {
            const { data } = await axios.get(`${baseUrl}/trips/${tripId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const found = data.Activities.find(
                (item) => item.id === Number(activityId)
            );

            setActivity(found);
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

    useEffect(() => {
        fetchActivity();
    }, [tripId, activityId]);


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await axios.put(`${baseUrl}/trips/${tripId}/activities/${activityId}`, activity, {
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

            navigate(`/detail/${tripId}`);
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
            <h2 className="text-2xl font-bold text-amber-700 mb-2">
                Edit Activity
            </h2>

            <p className="text-sm text-gray-500 mb-6">
                Update your itinerary activity.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Activity Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={activity.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full border rounded-lg p-3 outline-amber-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Day
                    </label>

                    <input
                        type="number"
                        name="day"
                        min="1"
                        value={activity.day}
                        onChange={(e) => handleChange("day", +e.target.value)}
                        className="w-full border rounded-lg p-3 outline-amber-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Note
                    </label>

                    <textarea
                        name="note"
                        value={activity.note}
                        onChange={(e) => handleChange("note", e.target.value)}
                        className="w-full border rounded-lg p-3 outline-amber-500"
                        rows="4"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(`/detail/${tripId}`)}
                        className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex-1 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
