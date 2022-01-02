import { Course } from "../models/Courses.js";
import mongoClient from "../mongoDb/mongoClient.js";
import MongoOptionsFactory from "../models/MongoOptions.js";

const factory = new MongoOptionsFactory();

// Получение всех курсов
export const getCourseList = async (req, res) => {
  const params = factory.createOptions({
    database: "courses",
    filter: req.query.tag ? { tags: req.query.tag } : {},
  });

  try {
    const response = await mongoClient.getCollection(params);
    res.send(response.map((item) => new Course(item)));
  } catch (err) {
    res.status(401).json({
      message: `Ошибка: ${err}`,
    });
  }
};

// Получение одного курса по id
export const getCourse = async (req, res) => {
  const params = factory.createOptions({
    database: "courses",
    filter: { courseName: req.query.courseName },
  });

  try {
    const response = await mongoClient.getDocument(params);
    res.send(new Course(response));
  } catch (err) {
    res.status(401).json({
      message: `Ошибка: ${err}`,
    });
  }
};

// Получение курсов которые лайкнул пользователь
export const getFavoriteCourseList = async (req, res) => {
  const params = factory.createOptions({
    database: "courses",
    filter: { likes: req.headers.userId },
  });

  try {
    const response = await mongoClient.getCollection(params);
    res.send(response.map((item) => new Course(item)));
  } catch (err) {
    res.status(401).json({
      message: `Ошибка: ${err}`,
    });
  }
};

// Добавить данного юзера в список лайков курса
export const addLikeCourse = async (req, res) => {
  const params = factory.createOptions({
    database: "courses",
    filter: { id: req.body.courseId },
    operator: { $push: { likes: req.headers.userId } },
  });

  try {
    const response = await mongoClient.updateDocument(params);
    res.send(response.value);
  } catch (err) {
    res.status(401).json({
      message: `Ошибка: ${err}`,
    });
  }
};

// Удалить данного юзера из списка лайков курса
export const deleteLikeCourse = async (req, res) => {
  const params = factory.createOptions({
    database: "courses",
    filter: { id: req.body.courseId },
    operator: { $pull: { likes: req.headers.userId } },
  });

  try {
    const response = await mongoClient.updateDocument(params);
    res.send(response.value);
  } catch (err) {
    res.status(401).json({
      message: `Ошибка: ${err}`,
    });
  }
};

// Получить популярные рекомендации по курсам
export const getPopularCourseList = async (req, res) => {
  const params = factory.createOptions({
    database: "courses",
    size: 3,
  });

  try {
    const response = await mongoClient.getRandomCollection(params);

    let array = response.filter((item) => item.id !== req.query.id);
    if (array.length > 3) array.pop();

    res.send(array.map((item) => new Course(item)));
  } catch (err) {
    res.status(401).json({
      message: `Ошибка: ${err}`,
    });
  }
};