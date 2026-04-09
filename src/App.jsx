import React, {useEffect, useState} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Project from './pages/Project'

export default function App(){
  // Note: your `public` folder currently contains `backround.jpg` (missing 'g').
  // Use that filename so the site loads the image you placed there.
  const defaultBg = '/backround.jpg'

  useEffect(()=>{
    document.body.style.backgroundImage = `url(${defaultBg})`
  },[])

  return (
    <div className="app">
      <header className="site-header">
        <h1><Link to="/">Landscapers</Link></h1>
        <nav>
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
