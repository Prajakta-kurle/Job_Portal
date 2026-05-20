import React, { useState } from 'react';

function Searchbar(props) {
  const [jobCriteria, setjobCriteria] = useState({
    title: "",
    type: "",
    location: "",
    experience: ""
  });

  const handleSearch = async () => {
    await props.fetchJobscustom(jobCriteria);
  };

  const handleChange = (e) => {
    setjobCriteria((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-y-4 gap-x-4 my-6 px-4 sm:px-10 justify-center">
      <select onChange={handleChange} name="title" value={jobCriteria.title}
        className="bg-zinc-200 font-semibold rounded-md px-4 py-3 w-full sm:w-64">
        <option value="" disabled hidden>Job Role</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="iOS Developer">iOS Developer</option>
        <option value="Anroid Developer">Anroid Developer</option>
        <option value="Developer Advocate">Developer Advocate</option>
      </select>

      <select onChange={handleChange} name="type" value={jobCriteria.type}
        className="bg-zinc-200 font-semibold rounded-md px-4 py-3 w-full sm:w-64">
        <option value="" disabled hidden>Job Type</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Contract">Contract</option>
      </select>

      <select onChange={handleChange} name="location" value={jobCriteria.location}
        className="bg-zinc-200 font-semibold rounded-md px-4 py-3 w-full sm:w-64">
        <option value="" disabled hidden>Location</option>
        <option value="Remote">Remote</option>
        <option value="In-Office">In-Office</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <select onChange={handleChange} name="experience" value={jobCriteria.experience}
        className="bg-zinc-200 font-semibold rounded-md px-4 py-3 w-full sm:w-64">
        <option value="" disabled hidden>Experience</option>
        <option value="Fresher">Fresher</option>
        <option value="Junior Level">Junior Level</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior Level">Senior Level</option>
      </select>

      <button onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md px-4 py-3 w-full sm:w-64">
        Search
      </button>
    </div>
  );
}

export default Searchbar;
