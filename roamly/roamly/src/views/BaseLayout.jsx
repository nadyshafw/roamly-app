import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Toastify from "toastify-js";
import { useEffect } from "react";

export default function BaseLayout() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      Toastify({
        text: "Please Login First",
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
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#fffbe6]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}