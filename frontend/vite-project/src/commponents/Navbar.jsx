import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
        setUser(null)
        navigate("/")
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    UniZone 🎓
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6">
                    {!user ? (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">
                                Login
                            </Link>
                            <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium">
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/feed" className="text-gray-600 hover:text-blue-600 font-medium transition">
                                Feed
                            </Link>
                            <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium transition">
                                Profile
                            </Link>

                            {/* Admin Only */}
                            {user.role === "admin" && (
                                <Link to="/admin" className="text-red-500 hover:text-red-600 font-medium transition">
                                    Admin Panel
                                </Link>
                            )}

                            {/* User Info */}
                            <span className="text-gray-500 text-sm">
                                👤 {user.name}
                            </span>

                            <button onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition font-medium">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar