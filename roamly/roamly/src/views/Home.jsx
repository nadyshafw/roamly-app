import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import baseUrl from "../constant/baseUrl";
import Toastify from "toastify-js";
import Card from "../components/Card";

export default function Home() {
    const [trips, setTrips] = useState([]);

    async function fetchTrips() {
        try {
            const { data } = await axios.get(`${baseUrl}/trips`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setTrips(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    async function handleDelete(id) {
        try {
            const { data } = await axios.delete(`${baseUrl}/trips/${id}`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

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

            fetchTrips();
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
    <div>
        <h2 className="text-3xl font-bold text-amber-700">
            My Trips
        </h2>

        <p className="text-gray-500 mb-5">
            Plan your next adventure with Roamly.
        </p>

        <Link
            to="/add"
            className="inline-block bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 mb-6"
        >
            + Create Trip
        </Link>

        {trips.length === 0 ? (
            <p className="text-gray-500 text-center bg-white p-8 rounded-xl">
                You don't have any trips yet.
            </p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {trips.map((trip) => (
                    <Card
                    key={trip.id}
                    trip={trip}
                    handleDelete={handleDelete}
                    />
                ))}
            </div>
        )}
    </div>
  );
}