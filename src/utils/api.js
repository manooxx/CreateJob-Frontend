import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Ensures cookies (JWT) are sent
});

// Register Company
export const registerCompany = async (formData) => {
    try {
    //   console.log("Registering company with data:", formData);
      const response = await API.post("/auth/register", formData);
    //   console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      throw error.response?.data || { message: "Something went wrong!" };
    }
  };
  

// Login Company
export const loginCompany = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);
    localStorage.setItem("token", response.data.token); // Store token
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Verify Email
export const verifyEmail = async (token) => {
  try {
    const response = await API.get(`/auth/verify-email/${token}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createJob = async (jobData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/jobs/create", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
    //   console.log("Job created successfully:", response.data);
  
      const jobId = response.data.job._id;  
      await sendJobEmails(jobId);
  
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error.response?.data || error.message);
      throw error.response?.data || { message: "Something went wrong!" };
    }
  };
  

  export const sendJobEmails = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(
        `/emails/send-job-emails/${jobId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log("Emails sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending emails:", error.response?.data || error.message);
      throw error.response?.data || { message: "Something went wrong with email sending!" };
    }
  };
 
export const getJobsByCompany = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/jobs/company/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Returning the list of jobs
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
      throw error.response?.data || { message: "Something went wrong!" };
    }
  };

  export const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.delete(`/jobs/company/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log("Job deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error.message);
      throw error.response?.data || { message: "Something went wrong while deleting the job!" };
    }
  };

  export const getCompanyById = async (companyId) => {
    try {
      const response = await API.get(`/jobs/${companyId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching company details:", error.response?.data || error.message);
      throw error.response?.data || { message: "Something went wrong!" };
    }
  };
  
  // Fetch logged-in company profile
export const getCompanyProfile = async () => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) throw new Error("No authentication token found");
  
      const response = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch company profile");
    }
  };
  
  
