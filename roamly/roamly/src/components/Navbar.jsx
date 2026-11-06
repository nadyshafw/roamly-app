import { useNavigate } from "react-router";

function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-bold text-amber-600">ROAMLY</h1>
                    <p className="text-sm font-bold text-amber-400">HOME</p>
                </div>

                <p
                    onClick={handleLogout}
                    className="text-sm font-semibold text-gray-600 hover:text-amber-600 cursor-pointer"
                >
                    LOG OUT ➜]
                </p>
            </div>
        </header>
    );
}

export default Navbar;