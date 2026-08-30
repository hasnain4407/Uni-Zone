import { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Profile = () => {
    const { user, setUser } = useContext(AuthContext)
    const [tab, setTab] = useState("profile")
    const [editing, setEditing] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const [form, setForm] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        department: user?.department || "",
        semester: user?.semester || ""
    })

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleUpdate = async () => {
        setError("")
        try {
            const res = await axios.put("http://localhost:3000/api/users/profile",
                form, { withCredentials: true }
            )
            setUser(res.data.user)
            setEditing(false)
            setSuccess("Profile updated successfully!")
            setTimeout(() => setSuccess(""), 3000)
        } catch {
            setError("Failed to update profile.")
        }
    }

    const handlePasswordUpdate = async () => {
        setError("")
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setError("Passwords do not match!")
        }
        try {
            await axios.put("http://localhost:3000/api/users/profile",
                { password: passwords.newPassword },
                { withCredentials: true }
            )
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
            setSuccess("Password updated successfully!")
            setTimeout(() => setSuccess(""), 3000)
        } catch {
            setError("Failed to update password.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Profile Header */}
                <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 mb-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold mx-auto mb-4 shadow-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                    <p className="text-blue-100 text-sm mb-3">{user?.email}</p>
                    <div className="flex justify-center gap-3 flex-wrap">
                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                            🏛️ {user?.department || "No Department"}
                        </span>
                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                            📚 Semester {user?.semester || "—"}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.role === "admin" ? "bg-red-400/80" : "bg-green-400/80"}`}>
                            {user?.role === "admin" ? "👑 Admin" : "🎓 Student"}
                        </span>
                    </div>
                </div>

                {/* Success / Error */}
                {success && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-center font-medium">
                        ✅ {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center font-medium">
                        ⚠️ {error}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex bg-white rounded-xl shadow-sm mb-6 p-1">
                    <button onClick={() => setTab("profile")}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${tab === "profile" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600"}`}>
                        👤 Profile Info
                    </button>
                    <button onClick={() => setTab("password")}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${tab === "password" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600"}`}>
                        🔒 Change Password
                    </button>
                </div>

                {/* Profile Tab */}
                {tab === "profile" && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        {!editing ? (
                            <div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-400 mb-1">Full Name</p>
                                        <p className="font-semibold text-gray-800">{user?.name}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-400 mb-1">Email</p>
                                        <p className="font-semibold text-gray-800">{user?.email}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-400 mb-1">Department</p>
                                        <p className="font-semibold text-gray-800">{user?.department || "—"}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-400 mb-1">Semester</p>
                                        <p className="font-semibold text-gray-800">{user?.semester || "—"}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                                    <p className="text-xs text-gray-400 mb-1">Bio</p>
                                    <p className="text-gray-700">{user?.bio || "No bio yet — tell us about yourself!"}</p>
                                </div>
                                <button onClick={() => setEditing(true)}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                                    ✏️ Edit Profile
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-4">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                                    <input value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">Department</label>
                                        <input value={form.department}
                                            onChange={(e) => setForm({ ...form, department: e.target.value })}
                                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">Semester</label>
                                        <input type="number" value={form.semester}
                                            onChange={(e) => setForm({ ...form, semester: e.target.value })}
                                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Bio</label>
                                    <textarea value={form.bio} rows={3}
                                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                        className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={handleUpdate}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                                        Save Changes ✅
                                    </button>
                                    <button onClick={() => setEditing(false)}
                                        className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Password Tab */}
                {tab === "password" && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">🔒 Change Password</h3>
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
                            <input type="password" placeholder="Enter new password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div className="mb-6">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm New Password</label>
                            <input type="password" placeholder="Confirm new password"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <button onClick={handlePasswordUpdate}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                            Update Password 🔒
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Profile