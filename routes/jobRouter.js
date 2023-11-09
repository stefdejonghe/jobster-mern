import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(validateIdParam, validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
