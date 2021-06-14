import { Router } from "express";
import { getCourses, getCourseFilters } from "../models/courses.js";

const router = Router();

router.get("/courses", (req, res) => {
  const collection = getCourses();

  collection.find({}).toArray((err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

router.get("/courses/filters", (req, res) => {
  const collection = getCourseFilters();

  collection.find({}).toArray((err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

export default router;
