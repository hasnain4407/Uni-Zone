import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Feed = () => {
    const { user } = useContext(AuthContext)  //eslint-disable-line
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("note")
    const [showForm, setShowForm] = useState(false)

    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/Posts", {
                withCredentials: true
            })
            setPosts(res.data.posts)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts() //eslint-disable-line
    }, [])

    const handleCreatePost = async () => {
        try {
            await axios.post("http://localhost:3000/api/Posts",
                { title, content, category },
                { withCredentials: true }
            )
            setTitle("")
            setContent("")
            setCategory("note")
            setShowForm(false)
            fetchPosts()
        } catch (error) {
            console.log(error)
        }
    }

    const categoryColor = (cat) => {
        if (cat === "note") return "bg-blue-100 text-blue-600"
        if (cat === "announcement") return "bg-yellow-100 text-yellow-600"
        if (cat === "study-partner") return "bg-green-100 text-green-600"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Campus Feed 📢</h1>
                    <button onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium">
                        {showForm ? "Cancel" : "+ New Post"}
                    </button>
                </div>

                {/* Create Post Form */}
                {showForm && (
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Post</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <textarea
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="note">📚 Note</option>
                            <option value="announcement">📢 Announcement</option>
                            <option value="study-partner">🤝 Study Partner</option>
                        </select>
                        <button onClick={handleCreatePost}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                            Post
                        </button>
                    </div>
                )}

                {/* Posts */}
                {loading ? (
                    <div className="text-center text-gray-400 py-20">Loading...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">No posts yet — be the first! 🚀</div>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="bg-white rounded-2xl shadow-sm p-6 mb-4 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor(post.category)}`}>
                                    {post.category}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{post.content}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">
                                    👤 {post.author?.name || "Unknown"}
                                </span>
                                <Link to={`/post/${post._id}`}
                                    className="text-blue-600 text-sm font-medium hover:underline">
                                    View Post →
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Feed