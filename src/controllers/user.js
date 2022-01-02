import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import { User } from "../models/User.js";

// Получение данных пользователя по токену
export const getUser = (req, res) => {
  //Токен валидный, возвращаем данные пользователя
  try {
    const decoded = jwt.verify(req.headers.authorization, keys.jwt);
    res.status(200).json(new User(decoded));
  }
  // Неверный токен, возвращаем ошибку 
  catch (err) {
    res.status(401).json({
      message: `Ошибка: ${err}`,
    });
  }
};
