
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../constant/baseUrl";
import Toastify from 'toastify-js'

export default function Card({ trip, handleDelete }) {
    const [photo, setPhoto] = useState("");
    const [weather, setWeather] = useState([]);

    async function fetchPhoto() {
        try {
            const { data } = await axios.get(`${baseUrl}/trips/${trip.id}/photo`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setPhoto(
                data.photo?.url ||
                data.photoTrip?.url ||
                ""
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPhoto();
    }, [trip.id]);

    async function fetchWeather() {
        try {
            const { data } = await axios.get(`${baseUrl}/trips/${trip.id}/weather`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setWeather(data.result || []);
        } catch (error) {
            console.log(error);
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
        fetchWeather();
    }, [trip.id]);


    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">

            <div className="h-44 bg-amber-200">
                <img
                    src={photo}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                    {trip.destination}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    {trip.title}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mt-4">
                    <span>{trip.days} Days</span>

                    <span>
                        Rp {Number(trip.budget).toLocaleString("id-ID")}
                    </span>
                </div>

                
                <div className="bg-amber-50 rounded-lg p-3 mt-4">
                    <h4 className="font-semibold text-amber-700 mb-2">
                        🌤️ Weather Forecast
                    </h4>

                    {weather.length === 0 ? (
                        <p className="text-xs text-gray-500">
                            Weather forecast is not available.
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {weather.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <div>
                                        <p className="font-medium text-gray-700">
                                            {new Date(item.date).toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "short"
                                                }
                                            )}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>

                                    <p className="text-gray-700 font-medium">
                                        {item.minTemp}° - {item.maxTemp}°C
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                
                <div className="flex gap-2 mt-4">
                    <Link
                        to={`/detail/${trip.id}`}
                        className="flex-1 text-center bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
                    >
                        View Trip
                    </Link>

                    <Link
                        to={`/edit/${trip.id}`}
                        className="flex-1 text-center bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => handleDelete(trip.id)}
                        className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
