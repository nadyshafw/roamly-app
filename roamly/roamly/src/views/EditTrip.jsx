import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import baseUrl from "../constant/baseUrl";
import Toastify from "toastify-js";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    destination: "",
    title: "",
    days: 1,
    startDate: "",
    budget: 0
  });

  function handleChange(name, value) {
    setTrip((oldValue) => {
      return {
        ...oldValue,
        [name]: value
      };
    });
  }

  async function fetchTrip() {
    try {
      const { data } = await axios.get(`${baseUrl}/trips/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setTrip({
        destination: data.destination,
        title: data.title,
        days: data.days,
        startDate: data.startDate?.slice(0, 10),
        budget: data.budget
      });
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
    fetchTrip();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${baseUrl}/trips/${id}`,
        trip,
        {
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
      <h2 className="text-2xl font-bold text-amber-700 mb-2">
        Edit Trip
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Update your travel plan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Destination
          </label>
          <input
            type="text"
            value={trip.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            className="w-full border rounded-lg p-3 outline-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Trip Title
          </label>
          <input
            type="text"
            value={trip.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full border rounded-lg p-3 outline-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Duration (Days)
          </label>
          <input
            type="number"
            min="1"
            value={trip.days}
            onChange={(e) => handleChange("days", +e.target.value)}
            className="w-full border rounded-lg p-3 outline-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={trip.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="w-full border rounded-lg p-3 outline-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Budget (Rp)
          </label>
          <input
            type="number"
            min="0"
            value={trip.budget}
            onChange={(e) => handleChange("budget", +e.target.value)}
            className="w-full border rounded-lg p-3 outline-amber-500"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
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