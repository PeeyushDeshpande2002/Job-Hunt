import { Job } from "../models/job.model.js";
//student
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      requirements,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;
    const userID = req.id;
    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !requirements ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      location,
      salary: Number(salary),
      requirements: requirements.split(","),
      jobType,
      experienceLevel,
      position,
      company :companyId,
      created_by: userID,
    });
    return res.status(201).json({
      message: "New Job created Successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
        path : 'company'
    }).sort({createdAt : -1});
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path : 'applications'
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path : 'company', 
      createdAt : -1
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
