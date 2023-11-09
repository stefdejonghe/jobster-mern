import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`No job with id ${id} was found`);

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true, // zorgt ervoor dat het nieuwe object teruggestuurd wordt, niet het oude.
  });

  if (!updatedJob) throw new NotFoundError(`No job with id ${id} was found`);

  res.status(StatusCodes.OK).json({ msg: "Job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) throw new NotFoundError(`No job with id ${id} was found`);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Job successfully deleted", job: removedJob });
};
