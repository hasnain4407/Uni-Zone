import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const features = [
    {
        icon: "📚",
        title: "Share Notes",
        desc: "Upload and share study material with classmates easily.",
        modal: {
            title: "📚 Share Notes",
            info: "Upload your notes, past papers, and study material. Help your classmates and build your reputation on campus.",
            cta: "Start sharing today — join UniZone!"
        }
    },
    {
        icon: "🤝",
        title: "Find Study Partners",
        desc: "Connect with students from same semester and department.",
        modal: {
            title: "🤝 Find Study Partners",
            info: "Looking for someone to study with? Post a study-partner request and connect with students from your department and semester.",
            cta: "Find your study partner — register now!"
        }
    },
    {
        icon: "📢",
        title: "Stay Updated",
        desc: "Never miss important announcements and campus events.",
        modal: {
            title: "📢 Stay Updated",
            info: "Get real-time announcements from your campus community — assignments, deadlines, events and more.",
            cta: "Never miss an update — join UniZone!"
        }
    }
]

const stats = [
    { value: "500+", label: "Students" },
    { value: "1000+", label: "Notes Shared" },
    { value: "50+", label: "Departments" },
]

const steps = [
    { num: "1", title: "Create Account", desc: "Sign up with your university email in seconds." },
    { num: "2", title: "Set Up Profile", desc: "Add your department, semester and interests." },
    { num: "3", title: "Connect & Share", desc: "Start sharing notes and connecting with students." },
]

const Home = () => {
    const [activeModal, setActiveModal] = useState(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisible(true), 100)
    }, [])

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-32 px-8 text-center overflow-hidden">

                {/* Background circles */}
                <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

                <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <span className="bg-white/20 backdrop-blur text-white text-sm px-4 py-2 rounded-full mb-6 inline-block border border-white/30">
                        🎓 Built for University Students
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Your Campus.<br />
                        <span className="text-yellow-300">Your Community.</span>
                    </h1>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        UniZone connects students — share notes, find study partners, and stay updated with campus announcements.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/register"
                            className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-yellow-300 hover:text-blue-700 transition-all text-lg shadow-xl">
                            Get Started Free 🚀
                        </Link>
                        <Link to="/login"
                            className="border-2 border-white/60 text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all text-lg backdrop-blur">
                            Login →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-600 text-white py-12 px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
                    {stats.map((s, i) => (
                        <div key={i} className="group">
                            <h3 className="text-4xl font-bold group-hover:scale-110 transition-transform inline-block">{s.value}</h3>
                            <p className="text-blue-100 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-8 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">Why UniZone?</h2>
                    <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto text-lg">
                        Everything you need to succeed in university — all in one place.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div key={i}
                                onClick={() => setActiveModal(f.modal)}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center cursor-pointer hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 group">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h4>
                                <p className="text-gray-500 text-sm mb-3">{f.desc}</p>
                                <span className="text-blue-500 text-sm font-semibold group-hover:underline">Learn more →</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">How it works?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {steps.map((s, i) => (
                            <div key={i} className="group">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                    {s.num}
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2 text-lg">{s.title}</h4>
                                <p className="text-gray-500 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial / Quote */}
            <section className="py-16 px-8 bg-gray-50">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-5xl mb-4">💬</div>
                    <p className="text-2xl font-medium text-gray-700 italic mb-4">
                        "UniZone helped me find study partners for my finals and share notes with my whole class in minutes!"
                    </p>
                    <span className="text-gray-400 text-sm">— CS Student, 4th Semester</span>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-8 bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center relative overflow-hidden">
                <div className="absolute top-[-60px] right-[-60px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                    <h2 className="text-4xl font-bold mb-4">Ready to join your campus community?</h2>
                    <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
                        Join thousands of students already connected on UniZone.
                    </p>
                    <Link to="/register"
                        className="bg-white text-blue-600 font-bold px-10 py-4 rounded-full hover:bg-yellow-300 hover:text-blue-700 transition-all text-lg shadow-xl inline-block">
                        Create Free Account →
                    </Link>
                </div>
            </section>

            {/* Modal */}
            {activeModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                    onClick={() => setActiveModal(null)}>
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-bounce-in"
                        onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{activeModal.title}</h3>
                        <p className="text-gray-600 mb-3 leading-relaxed">{activeModal.info}</p>
                        <p className="text-blue-600 font-semibold mb-6">✨ {activeModal.cta}</p>
                        <div className="flex gap-3">
                            <Link to="/register"
                                className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                                Register Now 🚀
                            </Link>
                            <button onClick={() => setActiveModal(null)}
                                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Home