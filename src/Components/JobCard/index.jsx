import dayjs from 'dayjs'
import React from 'react'
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Timestamp } from "firebase/firestore";

dayjs.extend(utc)
dayjs.extend(timezone)

function JobCard(props) {
  const date1 = dayjs(); // current date

  let postedDate = null;
  if (props.postedOn instanceof Timestamp) {
    postedDate = dayjs(props.postedOn.toDate());
  } else if (typeof props.postedOn === "string") {
    postedDate = dayjs(props.postedOn, "D MMMM YYYY [at] HH:mm:ss [UTC]Z");
  } else if (props.postedOn) {
    postedDate = dayjs(props.postedOn);
  }

  const diffInDays = postedDate?.isValid() ? date1.diff(postedDate, "day") : "unknown";

  return (
    <div className='w-full px-4 sm:px-10 mb-5'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-100 border border-gray-400 rounded-lg shadow-md p-5 hover:border-blue-500 transition-all duration-200'>
        
        {/* Left Content */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-xl font-semibold text-black'>{props.title} - {props.company}</h1>
          <p className='text-sm text-gray-700'>
            {props.type} &#x2022; {props.experience} &#x2022; {props.Location}
          </p>

          <div className='flex flex-wrap gap-2'>
            {props.Skills?.map(skill => (
              <p key={skill} className='text-sm text-gray-800 bg-white border border-gray-300 px-2 py-1 rounded'>
                {skill}
              </p>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className='flex flex-col sm:items-end gap-2 min-w-fit'>
          <p className='text-sm text-gray-600'>
            Posted {diffInDays > 1 ? `${diffInDays} days ago` : `${diffInDays} day ago`}
          </p>
          <a href={props.Job_Link} target='_blank' rel='noopener noreferrer'>
            <button className='bg-blue-100 text-blue-700 border border-blue-500 hover:bg-blue-200 transition px-6 py-2 rounded-md text-sm'>
              Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
