import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div>
                    <h4 className="text-white text-xl font-bold mb-3">UniZone 🎓</h4>
                    <p className="text-sm leading-relaxed">
                        Connecting university students — share notes, find study partners, stay updated.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                        <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                        <li><Link to="/feed" className="hover:text-white transition">Feed</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Contact</h4>
                    <ul className="space-y-2 text-sm">
                        <li>📧 support@unizone.pk</li>
                        <li>📍 Pakistan</li>
                        <li>🌐 unizone.pk</li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-sm mt-8 border-t border-gray-700 pt-6">
                © 2026 UniZone. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer