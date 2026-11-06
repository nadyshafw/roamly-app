import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import baseUrl from "../constant/baseUrl";
import Toastify from "toastify-js";

export default function Detail() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [activities, setActivities] = useState([]);
    const [generating, setGenerating] = useState(false);

    async function fetchTrip() {
        try {
            const { data } = await axios.get(`${baseUrl}/trips/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });


            setTrip(data);
            setActivities(data.Activities || []);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTrip();
    }, [id]);

    async function handleGenerate() {
        try {
            setGenerating(true);

            const { data } = await axios.post(`${baseUrl}/trips/${id}/generate`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setActivities(data.activities);

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
        } finally {
            setGenerating(false);
        }
    }

    async function handleDeleteActivity(activityId) {
        try {
            const { data } = await axios.delete(`${baseUrl}/trips/${id}/activities/${activityId}`, {
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

            setActivities((oldActivities) =>
                oldActivities.filter((activity) => activity.id !== activityId)
            );
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

    if (!trip) {
        return (
            <div className="text-center text-gray-500 py-10">
                Trip tidak ditemukan atau sedang dimuat.
            </div>
        );
    }

    return (
        <div>
            <Link
                to="/"
                className="text-amber-600 hover:text-amber-700"
            >
                ← Back to My Trips
            </Link>

            <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
                <h2 className="text-3xl font-bold text-amber-700">
                    {trip.title}
                </h2>

                <p className="text-gray-500 mt-2">
                    📍 {trip.destination}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold">{trip.days} Days</p>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-semibold">{trip.startDate}</p>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-semibold">
                            Rp {Number(trip.budget).toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div>
                        <h3 className="text-2xl font-bold text-amber-700">
                            Your Itinerary
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Let AI plan your adventure.
                        </p>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 disabled:opacity-50"
                    >
                        {generating ? "Generating..." : "Generate Itinerary"}
                    </button>
                </div>

                {activities.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <p className="text-gray-500">
                            No activities yet.
                        </p>

                        <p className="text-sm text-gray-400 mt-2">
                            Click Generate Itinerary to create your travel plan.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-amber-500"
                            >
                                <p className="text-sm font-semibold text-amber-600">
                                    Day {activity.day}
                                </p>

                                <h4 className="text-lg font-bold text-gray-800 mt-1">
                                    {activity.title}
                                </h4>

                                <p className="text-gray-500 text-sm mt-2">
                                    {activity.note}
                                </p>

                                <div className="flex gap-2 mt-4">
                                    <Link
                                        to={`/edit/activity/${id}/${activity.id}`}
                                        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDeleteActivity(activity.id)}
                                        className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
