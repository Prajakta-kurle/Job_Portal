import React from 'react'
import { useState } from 'react'

function Searchbar(props) {

  const [jobCriteria,setjobCriteria]=useState(
    {
      title:"",
      type:"",
      location:"",
      experience:""
    }
  )
   const handleSearch=async()=>
   {
     await props.fetchJobscustom(jobCriteria)   
   } 

  const handleChange=(e)=>
  {
  setjobCriteria((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
  }
  console.log(jobCriteria);

  return (
    <div className='flex gap-4 my-10 px-10 justify-center'>
      <select onChange={handleChange} name="title" value={jobCriteria.title} className='w-64 pl-4 py-3 bg-zinc-200 font-semibold rounded-md'>
        <option value="" disabled hidden defaultValue>Job Role</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="iOS Developer">iOS Developer</option>
        <option value="Anroid Developer">Anroid Developer</option>
        <option value="Developer Advocate">Developer Advocate</option>
      </select>

      <select onChange={handleChange} name="type" value={jobCriteria.type} className='w-64 pl-4 py-3 bg-zinc-200 font-semibold rounded-md'>
        <option value= "" disabled hidden defaultValue>Job Type</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Contract">Contract</option>
      </select>

      <select onChange={handleChange} name="location" value={jobCriteria.location} className='w-64 pl-4 py-3 bg-zinc-200 font-semibold rounded-md'>
        <option value="" disabled hidden defaultValue>Location</option>
        <option value="Remote">Remote</option>
        <option value="In-Office">In-Office</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <select onChange={handleChange} name="experience" value={jobCriteria.experience} className='w-64 pl-4 py-3 bg-zinc-200 font-semibold rounded-md'>
        <option value="" disabled hidden defaultValue>Experience</option>
        <option value="Fresher">Fresher</option>
        <option value="Junior Level">Junior Level</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior Level">Senior Level</option>
      </select>

      <button onClick={handleSearch} className='w-64 pl-4 py-3 bg-blue-500 text-white font-bold rounded-md'>Search</button>
    </div>
  )
}

export default Searchbar
