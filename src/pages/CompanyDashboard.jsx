import React, { useState, useEffect } from "react";
import { getJobsByCompany, deleteJob, getCompanyProfile } from "../utils/api"; // Import delete function

import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [companyName, setCompanyName] = useState("");


    useEffect(() => {
        fetchJobs();
        fetchCompanyProfile();
    }, []);

    const fetchCompanyProfile = async () => {
        try {
            const profile = await getCompanyProfile();
            setCompanyName(profile.name); 
        } catch (err) {
            console.error("Error fetching company profile:", err);
        }
    };

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const data = await getJobsByCompany();
            setJobs(data);
            if (data.length > 0) {
                setCompanyName(data[0].companyId.name || "Company"); 
            }
           
        } catch (err) {
            setError("Failed to fetch jobs.");
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        navigate('/createJob');

    }

    // Handle Job Deletion
    const handleDeleteJob = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                await deleteJob(jobId);
                setJobs(jobs.filter((job) => job._id !== jobId)); // Remove the deleted job from UI
            } catch (err) {
                alert("Error deleting job: " + (err.message || "Please try again"));
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-[75%] min-h-screen my-10 mx-auto flex flex-col gap-10 mt-20">
            <div className=" flex h-28 rounded-md px-5 items-center justify-between shadow-2xl gap-20">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-600">{companyName}</h1>
                    <h2 className="text-gray-600 text-sm">Jobs Posted: {jobs.length}</h2>
                </div>
                <div className="flex text-gray-600 text-sm gap-2 items-center">
                    <p>Create a new Job Post?</p>
                    <button
                        className="flex cursor-pointer text-xs justify-center items-center border rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900"
                        onClick={handleClick}
                    >Create Post </button>
                </div>


            </div>

            <div className="border border-gray-200"></div>




            <div className="  mt-10 ">
                <div>
                    <h5 className=" px-3 font-semibold text-xl text-gray-500">Active Jobs:</h5>
                </div>
                <ul className="grid  gap-5  ">
                    {jobs.map((job) => (
                        <div className=" shadow-xl rounded-md py-5 px-5 flex justify-between items-center " key={job._id}>
                            <li className="space-y-1" >
                                <h3 className="text-2xl font-semibold text-gray-700">{job.title}</h3>
                                <p className="text-gray-500 text-sm font-semibold">{job.description}</p>
                                <p className="text-sm font-semibold text-gray-500">Experience Level: <span className="text-gray-800">{job.experienceLevel}</span> </p>
                                <p className="text-sm ">End Date: {job.endDate}</p>

                            </li>
                            <div>

                                <button
                                    className="flex cursor-pointer text-xs justify-center items-center rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900"
                                    onClick={() => handleDeleteJob(job._id)}>Delete Post</button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>


        </div>
    );
};

export default CompanyDashboard;
