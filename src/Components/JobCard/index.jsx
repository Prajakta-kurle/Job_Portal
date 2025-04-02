import dayjs from 'dayjs'
import React from 'react'
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Timestamp } from "firebase/firestore";

dayjs.extend(utc)
dayjs.extend(timezone)

function JobCard(props) {
    const date1=dayjs() //current date

    //convert postedon to a valid date
    let postedDate=null;
    if (props.postedOn instanceof Timestamp) {
        postedDate = dayjs(props.postedOn.toDate()); // Convert Firebase Timestamp to JS Date
    } else if (typeof props.postedOn === "string") {
        postedDate = dayjs(props.postedOn, "D MMMM YYYY [at] HH:mm:ss [UTC]Z");
    } else if (props.postedOn) {
        postedDate = dayjs(props.postedOn);
    }
    
        const diffInDays = postedDate?.isValid()? date1.diff(postedDate,"day"):"unknown";


  return (
    <div className='mx-40 mb-4'>
        <div className='flex items-center rounded-md justify-between px-6 py-4 bg-zinc-200 border border-black shadow-lg 
        hover:border-blue-500 hover-translate-y-1 hover:scale-103 '>
            <div className='flex flex-col items-start gap-3'>
            <h1 className='text-lg font-semibold'>{props.title}-{props.company}</h1>
            <p>{props.type} &#x2022; {props.experience}  &#x2022; {props.Location} </p>
            <div className='flex items-center gap-2'>
                {props.Skills?.map((skill)=>
                (
                    <p key={skill} className='text-gray-600 py-1 px-2 rounded-md border border-black '>{skill}</p>
                ))}
            </div>
            </div>
               
            <div className='flex items-center gap-4'>
               <p>Posted {diffInDays > 1 ? `${diffInDays} days ago`:`${diffInDays} day ago`}</p>
               <a href={props.Job_Link}>
               <button className='text-blue-700 border border-black rounded-md px-10 py-2 '>Apply</button>
               </a>
            </div>
        </div>
    </div>
  )
}

export default JobCard
