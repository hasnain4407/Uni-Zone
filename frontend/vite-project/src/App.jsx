import './index.css'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from './pages/Home'
import Register from './pages/Register'
import Navbar from './commponents/Navbar'
import Footer from './commponents/Footer'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import PostDetail from './pages/PostDetail'

const App=() =>{
    return (
        <>
        <Navbar/>
        <Routes> 
            <Route path='/' element={<Home/>}/>
             <Route path='/feed' element={<Feed/>}/>
              <Route path='/profile' element={<Profile/>}/>
             <Route path='/post/:id' element={<PostDetail/>}/>
           <Route path='/register' element={<Register/>}/>
            <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
        </>
    )
}

export default App