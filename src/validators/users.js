import Validator from "../validators/abstractValidator.js";

const regexPassword = /^[a-zа-яё0-9-_!@#$%^&*()=+`~?]+$/;

export default class Users extends Validator {
    static isOldPassword(oldPassword) {
        if (!oldPassword) {
            throw new Validator.Message(
                "IncorrectPassword",
                "Отсутствует обязательный параметр oldPassword.",
                400
            );
        }
    }

    static minLengthPassword(length) {
        if (length < 8) {
            throw new Validator.Message(
                "IncorrectPassword",
                "Поле newPassword не может быть меньше 8 символов.",
                400,
                "newPassword"
            );
        }
    }

    static maxLengthPassword(length) {
        if (length > 12) {
            throw new Validator.Message(
                "IncorrectPassword",
                "Поле newPassword не может быть больше 12 символов.",
                400,
                "newPassword"
            );
        }
    }

    static hasGapsPassword(password) {
        if (password.includes(" ")) {
            throw new Validator.Message(
                "IncorrectPassword",
                "Поле newPassword не может содержать пробелы.",
                400,
                "newPassword"
            );
        }
    }

    static hasInvalidCharacters(password) {
        if (!regexPassword.test(password)) {
            throw new Validator.Message(
                "IncorrectPassword",
                "Поле newPassword содержит недопустимые символы.",
                400,
                "newPassword"
            );
        }
    }

    static matchPasswords(oldPassword, newPassword) {
        if (oldPassword === newPassword) {
            throw new Validator.Message(
                "IncorrectPassword",
                "Поле newPassword не может совпадать с полем oldPassword.",
                400,
                "newPassword"
            );
        }
    }
}