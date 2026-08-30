import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext() //eslint-disable-line    

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true
        })
        setUser(res.data.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}