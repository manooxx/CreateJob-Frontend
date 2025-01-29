import React, { useState } from "react";
import useFetchData from "../hooks/FetchJobs";
import { getCompanyById } from "../utils/api";

const JobList = ({ url }) => {
    const { data: jobs, loading, error } = useFetchData(url);
    const [selectedJob, setSelectedJob] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    if (loading) return <div>Loading jobs...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleShowDetails = async (job) => {
        setSelectedJob(job);
        setIsOpen(true);
        if (!job.companyId?._id) return; // Avoid unnecessary API calls

        try {
            const company = await getCompanyById(job._id);
            setCompanyDetails(company);
        } catch (err) {
            console.error("Error fetching company details", err);
        }
    };

    return (
        <div className="my-10 flex flex-col gap-10">
            <div className="flex h-20 items-center justify-center">
                <h2 className="text-3xl text-gray-600 font-semibold drop-shadow-xl">
                    Job Listings
                </h2>
            </div>

            <div>
                <ul className="grid gap-10">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="shadow-xl rounded-md py-5 px-5 flex justify-between items-center"
                        >
                            <li>
                                <h3 className="text-2xl font-semibold text-gray-700">
                                    {job.title}
                                </h3>
                                <h4 className="text-gray-500 font-semibold">
                                    {job.companyId?.name || "Unknown Company"}
                                </h4>
                                <p className="text-gray-400 text-sm font-medium">
                                    {job.description}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Experience Level:{" "}
                                    <span className="text-gray-700">{job.experienceLevel}</span>
                                </p>
                                <p className="text-sm">End Date: {job.endDate}</p>
                            </li>
                            <div className="flex items-center gap-2">
                                <button
                                    className="drop-shadow-2xl cursor-pointer text-xs justify-center items-center rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900"
                                    onClick={() => handleShowDetails(job)}
                                >
                                    Show Details
                                </button>
                                <button className="drop-shadow-2xl cursor-pointer text-xs justify-center items-center rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900">
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>

            {/* Custom Modal */}
            {isOpen && selectedJob && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50">
                    <div className="bg-white min-h-[20vh] overflow-y-auto p-6 rounded-2xl shadow-lg w-[540px] relative">
                        <div className="absolute -top-2 left-4 z-20 border rounded-full w-16 h-16 bg-gradient-to-r from-purple-200 to-purple-400"></div>
                        <div className="absolute top-0 z-40 -left-5 w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-700 rounded-full"></div>

                        <div className="pt-16">
                            <h2 className="text-xl text-gray-700 font-bold">{selectedJob.title}</h2>
                            <p className="text-gray-500 text-sm font-medium">{selectedJob.description}</p>
                            <p className="text-gray-700 ">
                                <strong>Experience Level:</strong> {selectedJob.experienceLevel}
                            </p>
                            <p className="text-gray-700 ">
                                <strong>End Date:</strong> {selectedJob.endDate}
                            </p>
                            {companyDetails && (
                                <>
                                   
                                    <p>
                                        <strong className="text-purple-900">Company Name:</strong> {selectedJob.companyId.name}
                                    </p>
                                    <p>
                                        <strong className="text-purple-900">Email:</strong> {selectedJob.companyId.email}
                                    </p>
                                </>
                            )}
                            <div className="flex justify-end items-center">

                            <button
                                className="flex cursor-pointer text-xs justify-center items-center  rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900"
             
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobList;
