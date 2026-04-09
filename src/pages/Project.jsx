import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'

function loadProjects(){
  try{ return JSON.parse(localStorage.getItem('projects')||'[]') }
  catch{ return [] }
}

export default function Project(){
  const {id} = useParams()
  const [projects, setProjects] = useState(loadProjects)
  const project = projects.find(p=>p.id===id)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [desc, setDesc] = useState(project?.desc||'')
  // admin toggle - set to true if you want the upload/save controls visible
  const isAdmin = false

  useEffect(()=>{
    setDesc(project?.desc||'')
  },[project])

  if(!project) return <div>Project not found. <Link to="/portfolio">Back</Link></div>

  function addGallery(e){
    const files = Array.from(e.target.files)
    const readers = files.map(f=> new Promise(res=>{
      const r = new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(f)
    }))
    Promise.all(readers).then(images=>{
      const updated = projects.map(p=> p.id===project.id ? {...p, gallery:[...p.gallery, ...images]} : p)
      setProjects(updated)
      localStorage.setItem('projects', JSON.stringify(updated))
    })
  }

  function saveDesc(){
    const updated = projects.map(p=> p.id===project.id ? {...p, desc} : p)
    setProjects(updated)
    localStorage.setItem('projects', JSON.stringify(updated))
    alert('Saved')
  }

  return (
    <div>
      <h2>{project.title}</h2>
      <p className="client">Client: {project.client}</p>
      <div className="gallery">
        {project.gallery && project.gallery.length>0 ? project.gallery.map((g,i)=> <img key={i} src={g} alt={`g${i}`} />) : <p>No gallery images yet.</p>}
      </div>

      {isAdmin && (
        <>
          <div className="gallery-uploader">
            <label className="btn">Upload 1-5 Images<input type="file" accept="image/*" multiple onChange={addGallery} style={{display:'none'}}/></label>
          </div>

          <div className="desc">
            <h3>Work details</h3>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="2-3 lines about the work"></textarea>
            <button className="btn" onClick={saveDesc}>Save Details</button>
          </div>
        </>
      )}

      <p><Link to="/portfolio">Back to Portfolio</Link></p>
    </div>
  )
}
