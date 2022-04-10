import bcrypt from "bcryptjs";
import { MessageError } from "../models/Errors.js";

const regexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

export const login = (req, user) => {
  // Проверка на правильный формат email
  if (!regexEmail.test(req.body.email)) {
    throw new MessageError('IncorrectEmail', 'Неверный формат email.', 400);
  }

  // Проверка существования пользователя
  if (!user) {
    throw new MessageError('IncorrectEmail', 'Пользователь с таким e-mail не зарегистрирован.', 401);
  }

  // Проверка на пустое значение пароля
  if (!req.body.password) {
    throw new MessageError('IncorrectPassword', 'Поле пароля не может быть пустым.', 400);
  }

  // Проверка на совпадение пароля от клинета и пароля в БД
  const password = bcrypt.compareSync(req.body.password, user.password);

  if (!password) {
    throw new MessageError('IncorrectPassword', 'Неправильный пароль!', 401);
  }
};

const recovery = (req, user) => {
  // Проверка на правильный формат email
  if (!regexEmail.test(req.body.email)) {
    throw new MessageError('IncorrectEmail', 'Неверный формат email.', 400);
  }
  
  // Проверка существования пользователя
  if (!user) {
    throw new MessageError('IncorrectEmail', 'Пользователь с таким e-mail не зарегистрирован.', 401);
  }
};

export default { login, recovery };
