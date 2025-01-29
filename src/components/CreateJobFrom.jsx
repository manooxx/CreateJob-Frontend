import React, { useState } from 'react';
import { createJob } from '../utils/api'; 
import { useNavigate } from 'react-router-dom';
 

const CreateJobForm = () => {
     const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    candidates: [],
    endDate: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'candidates') {
      setJobData({
        ...jobData,
        [name]: value.split(',').map(email => email.trim()), 
      });
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createJob(jobData);
      navigate('/companyDashboard');


    //   console.log('Job created and emails sent:', result);
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
  <div className='min-h-screen'>
      
      <div className=" pt-20 flex items-center justify-center bg-opacity-40 z-50">
    <div className="bg-white h-[490px] overflow-hidden p-6 rounded-2xl shadow-lg w-[370px] relative">
      <div className="absolute -top-2 left-4 z-20 border rounded-full w-16 h-16 bg-gradient-to-r from-purple-200 to-purple-400"></div>
      <div className="absolute top-0 z-40 -left-5 w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-700 rounded-full"></div>

      <div className='flex flex-col gap-7'>
        <div className='flex justify-center items-center'>
            <h3 className='text-xl font-semibold'>Create Job</h3>
        </div>
        <div>

      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
       
       <label className='text-sm text-gray-500' >Job Title: </label>
       <div className='border h-7 rounded space-y-4 '>

      <input className='outline-none w-full px-3 text-xs'
        type="text"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        placeholder="Job Title"
      />
       </div>
        <label className='text-sm text-gray-500' >Description:</label>
    <div className='border h-12 py-2 rounded space-y-4'>
      <textarea className='outline-none w-full px-3 text-xs'
        name="description"
        value={jobData.description}
        onChange={handleChange}
        placeholder="Job Description"
      />
    </div>
    <label className='text-sm text-gray-500' >Experience:</label>
    <div className='pb-3 border h-7 rounded'>

      <input className=' outline-none w-full px-3 text-xs'
        type="text"
        name="experienceLevel"
        value={jobData.experienceLevel}
        onChange={handleChange}
        placeholder="Experience Level"
      />
    </div>

    <label className='text-sm text-gray-500' >Candidates:</label>
    <div className='pb-3 border h-7 rounded'>

      <input
      className='outline-none w-full px-3 text-xs'
        type="text"
        name="candidates"
        value={jobData.candidates.join(', ')}
        onChange={handleChange}
        placeholder="Candidates (comma separated emails)"
      />
    </div>
    <label className='text-sm text-gray-500' >End Date:</label>
    <div className='flex items-center gap-4 r h-7 rounded'>    
    

    <input 
    className='outline-none w-full px-3 text-gray-600 text-sm'
      type="date"
      name="endDate"
      value={jobData.endDate}
      onChange={handleChange}
    />
    </div>
  
    <div className='flex justify-center items-center pt-3'>

      <button 
      className="flex cursor-pointer text-xs justify-center items-center border rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900"
       type="submit">Create Job</button>
    </div>
    </form>
        </div>

        
      </div>
    </div>
  </div>
  </div>
    
  );
};

export default CreateJobForm;

