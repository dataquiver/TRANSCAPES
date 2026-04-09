import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

// Toggle admin mode to true to show the upload/create UI.
// Keep false for public use so upload controls are hidden.
const isAdmin = false

function loadProjects(){
  try{
    const raw = localStorage.getItem('projects')
    if(raw){
      const parsed = JSON.parse(raw)
      // If there are existing projects, return them.
      if(Array.isArray(parsed) && parsed.length>0) return parsed
    }

    // If no projects found or existing list is empty, seed some example projects
    // so the grid isn't empty. Use client images placed in `public/` as thumbnails.
    const available = ['/client.jpg','/client2.jpg','/client3.jpg','/Client4.jpg']
    const names = [
      {client:'Dilip', place:'Bangalore'},
      {client:'Asha', place:'Chennai'},
      {client:'Kumar', place:'Mumbai'},
      {client:'Nisha', place:'Pune'}
    ]

    const samples = available.map((img,i)=> ({
      id: `s${i+1}`,
      title: ['Garden Refresh','Front Yard Makeover','Rooftop Oasis','Courtyard Design'][i] || `Project ${i+1}`,
      client: names[i].client,
      place: names[i].place,
      thumb: img,
      gallery: [img],
      desc: 'Beautiful landscaping work with attention to planting, hardscape and irrigation.'
    }))
    localStorage.setItem('projects', JSON.stringify(samples))
    return samples
  }
  catch{ return [] }
}

export default function Portfolio(){
  const [projects, setProjects] = useState(loadProjects)
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [place, setPlace] = useState('')
  const [thumb, setThumb] = useState('')

  useEffect(()=>{
    localStorage.setItem('projects', JSON.stringify(projects))
  },[projects])

  function handleThumb(e){
    const f = e.target.files[0]
    if(!f) return
    const r = new FileReader()
    r.onload = ()=> setThumb(r.result)
    r.readAsDataURL(f)
  }

  function addProject(){
    if(!title) return alert('Add a title')
    const id = Date.now().toString()
    setProjects([{id,title,client,place,thumb,gallery:[],desc:''}, ...projects])
    setTitle(''); setClient(''); setPlace(''); setThumb('')
  }

  return (
    <div>
      <h2 style={{textAlign:'center',marginTop:8}}>Portfolio</h2>

      {isAdmin && (
        <section className="new-project">
          <h3>Add Project</h3>
          <input placeholder="Project title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input placeholder="Client name" value={client} onChange={e=>setClient(e.target.value)} />
          <input placeholder="Place (city/area)" value={place} onChange={e=>setPlace(e.target.value)} />
          <label className="btn">Upload Thumbnail<input type="file" accept="image/*" onChange={handleThumb} style={{display:'none'}}/></label>
          {thumb && <img src={thumb} alt="thumb" className="thumb" />}
          <button className="btn" onClick={addProject}>Create</button>
        </section>
      )}

      <section className="projects-grid">
        {projects.length===0 && <p style={{textAlign:'center',color:'var(--text-muted)'}}>No projects yet. Add one above.</p>}
        {projects.map(p=> (
          <div key={p.id} className="project-card">
            <Link to={`/project/${p.id}`}>
              {p.thumb ? <img src={p.thumb} alt={p.title} /> : <div className="placeholder">No Image</div>}
              <div className="project-info">
                <h4>{p.title}</h4>
                <p className="client">{p.client}{p.place ? ` · ${p.place}` : ''}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  )
}
