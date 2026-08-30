import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
    const [form, setForm] = useState({
        name: "", email: "", password: "", department: "", semester: ""
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            await axios.post("http://localhost:3000/api/auth/register", form, {
                withCredentials: true
            })
            navigate("/login")
        } catch {
            setError("Registration failed. Please check your details.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">UniZone 🎓</h1>
                    <p className="text-blue-100">Create your account and join your campus community</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm font-medium">
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                        <input name="name" placeholder="Enter your name" onChange={handleChange}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                        <input name="email" type="email" placeholder="Enter your email" onChange={handleChange}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                        <input name="password" type="password" placeholder="Create a password" onChange={handleChange}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Department</label>
                            <input name="department" placeholder="e.g. CS" onChange={handleChange}
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Semester</label>
                            <input name="semester" type="number" placeholder="e.g. 4" onChange={handleChange}
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                    </div>

                    <button onClick={handleSubmit} disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition disabled:opacity-50">
                        {loading ? "Creating Account..." : "Create Account →"}
                    </button>

                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-3 text-gray-400 text-sm">or</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    <p className="text-center text-gray-600 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>

                <p className="text-center mt-6">
                    <Link to="/" className="text-blue-100 hover:text-white text-sm transition">
                        ← Back to Home
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register