import { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "./firebase_config";
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Searchbar from './Components/Searchbar';
import JobCard from './Components/JobCard';

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  // ✅ Function to fetch all jobs (Moved outside of useEffect)
  const fetchAllJobs = async () => {
    setCustomSearch(false);
    try {
      console.log("Fetching all jobs from Firebase...");
      const jobCollection = collection(db, "jobs");
      const req = await getDocs(jobCollection);
      const jobList = req.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("🔥 All Jobs from Firestore:", jobList);
      setJobs(jobList);
    } catch (error) {
      console.log("Error fetching all jobs", error);
    }
  };

  // ✅ Fetch all jobs when component mounts
  useEffect(() => {
    fetchAllJobs();
  }, []);

  // ✅ Track `jobs` updates in UI
  useEffect(() => {
    console.log("🆕 UI Updated with new Jobs:", jobs);
  }, [jobs]);

  // ✅ Fetch filtered jobs when criteria is provided
  const fetchJobscustom = async (jobCriteria = {}) => {
    setCustomSearch(true);
    try {
      console.log("Fetching jobs with criteria", jobCriteria);

      const jobCollection = collection(db, "jobs");

      // ✅ Build the query based on selected filters dynamically
      let filters = [];

      if (jobCriteria.type) {
        filters.push(where("type", "==", jobCriteria.type));
      }
      if (jobCriteria.title) {
        filters.push(where("title", "==", jobCriteria.title));
      }
      if (jobCriteria.location) {
        filters.push(where("location", "==", jobCriteria.location));
      }
      if (jobCriteria.experience) {
        filters.push(where("experience", "==", jobCriteria.experience));
      }

      // ✅ Apply filters only if there are any
      let jobQuery;
      if (filters.length > 0) {
        jobQuery = query(jobCollection, ...filters);
      } else {
        jobQuery = jobCollection;
      }

      const req = await getDocs(jobQuery);
      const jobList = req.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Filtered Jobs:", jobList);
      setJobs(jobList);
    } catch (error) {
      console.log("Error fetching jobs", error);
    }
  };

  return (
    <>
      <Navbar />
      <Header />
      <Searchbar fetchJobscustom={fetchJobscustom} />
      
      {customSearch && (
        <button onClick={fetchAllJobs} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-600 text-white px-10 py-2 rounded-md">Clear filter</p>
        </button>
      )}

      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      ) : (
        <p className='text-center mt-4'>No Job Postings available</p>
      )}
    </>
  );
}

export default App;
