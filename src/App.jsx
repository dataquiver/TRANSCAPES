import React, {useEffect, useState} from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Project from './pages/Project'

const BASE = import.meta.env.BASE_URL

export default function App(){
  const defaultBg = `${BASE}backround.jpg`
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(()=>{
    document.body.style.backgroundImage = `url(${defaultBg})`
  },[])

  // Close menu on navigation
  useEffect(()=>{
    setMenuOpen(false)
  },[location])

  return (
    <div className="app">
      <header className="site-header">
        <h1><Link to="/">Landscapers</Link></h1>
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
        </button>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/project/:id" element={<Project/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </main>

      <footer className="site-footer">© Landscapers</footer>
    </div>
  )
}
