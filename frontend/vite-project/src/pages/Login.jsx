import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password },
                { withCredentials: true }
            )
            setUser(res.data.user)
            navigate("/feed")
        } catch {
            setError("Invalid email or password. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">UniZone 🎓</h1>
                    <p className="text-blue-100">Welcome back! Login to your account</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm font-medium">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition disabled:opacity-50">
                        {loading ? "Logging in..." : "Login →"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-3 text-gray-400 text-sm">or</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                            Create one now
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <p className="text-center mt-6">
                    <Link to="/" className="text-blue-100 hover:text-white text-sm transition">
                        ← Back to Home
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login