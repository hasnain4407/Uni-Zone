import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const PostDetail = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [editForm, setEditForm] = useState({ title: "", content: "", category: "" })
    const [success, setSuccess] = useState("")

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/Posts/${id}`, {
                withCredentials: true
            })
            setPost(res.data.post)
            setEditForm({
                title: res.data.post.title,
                content: res.data.post.content,
                category: res.data.post.category
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/comments/${id}`, {
                withCredentials: true
            })
            setComments(res.data.comments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost() //eslint-disable-line
        fetchComments()
    }, []) //eslint-disable-line

    const handleComment = async () => {
        if (!comment.trim()) return
        try {
            await axios.post(`http://localhost:3000/api/comments/${id}`,
                { content: comment },
                { withCredentials: true }
            )
            setComment("")
            fetchComments()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return
        try {
            await axios.delete(`http://localhost:3000/api/Posts/${id}`, {
                withCredentials: true
            })
            navigate("/feed")
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/api/Posts/${id}`,
                editForm,
                { withCredentials: true }
            )
            setEditing(false)
            setSuccess("Post updated successfully!")
            setTimeout(() => setSuccess(""), 3000)
            fetchPost()
        } catch (error) {
            console.log(error)
        }
    }

    const categoryColor = (cat) => {
        if (cat === "note") return "bg-blue-100 text-blue-600"
        if (cat === "announcement") return "bg-yellow-100 text-yellow-600"
        if (cat === "study-partner") return "bg-green-100 text-green-600"
    }

    const categoryIcon = (cat) => {
        if (cat === "note") return "📚"
        if (cat === "announcement") return "📢"
        if (cat === "study-partner") return "🤝"
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading post...</p>
            </div>
        </div>
    )

    if (!post) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Post not found!</h2>
                <Link to="/feed" className="text-blue-600 hover:underline">← Back to Feed</Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Back Button */}
                <Link to="/feed" className="inline-flex items-center text-blue-600 hover:underline mb-6 font-medium">
                    ← Back to Feed
                </Link>

                {/* Success */}
                {success && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-center font-medium">
                        ✅ {success}
                    </div>
                )}

                {/* Post Card */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">

                    {!editing ? (
                        <>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor(post.category)}`}>
                                    {categoryIcon(post.category)} {post.category}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">{post.content}</p>

                            <div className="flex justify-between items-center border-t pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {post.author?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {post.author?.name || "Unknown"}
                                    </span>
                                </div>

                                {/* Author Actions */}
                                {user?._id === post.author?._id && (
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditing(true)}
                                            className="text-blue-500 hover:text-blue-600 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition">
                                            ✏️ Edit
                                        </button>
                                        <button onClick={handleDelete}
                                            className="text-red-500 hover:text-red-600 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition">
                                            🗑 Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        /* Edit Form */
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">✏️ Edit Post</h3>
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                                <input value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Content</label>
                                <textarea value={editForm.content} rows={5}
                                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                    className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                            </div>
                            <div className="mb-6">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                                <select value={editForm.category}
                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                    className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    <option value="note">📚 Note</option>
                                    <option value="announcement">📢 Announcement</option>
                                    <option value="study-partner">🤝 Study Partner</option>
                                </select>
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

                {/* Comment Input */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">💬 Leave a Comment</h3>
                    <textarea
                        placeholder="Write your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                    <button onClick={handleComment}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                        Post Comment →
                    </button>
                </div>

                {/* Comments List */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Comments <span className="bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full ml-1">{comments.length}</span>
                    </h3>
                    {comments.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-2">💬</div>
                            <p className="text-gray-400">No comments yet — be the first!</p>
                        </div>
                    ) : (
                        comments.map((c) => (
                            <div key={c._id} className="border-b last:border-0 py-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {c.author?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {c.author?.name || "Unknown"}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-auto">
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm pl-9">{c.content}</p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    )
}

export default PostDetail