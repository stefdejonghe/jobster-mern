import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id} was found` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true, // zorgt ervoor dat het nieuwe object teruggestuurd wordt, niet het oude.
  });
  if (!updatedJob) {
    return res.status(404).json({ msg: `No job with id ${id} was found` });
  }

  res.status(200).json({ msg: "Job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res.status(404).json({ msg: `No job with id ${id} was found` });
  }

  res.status(200).json({ msg: "Job succesfully deleted", job: removedJob });
};
