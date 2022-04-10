import validate from "../validates/likes.js";
import Controller from "../controllers/AbstractController.js";

export default class Likes extends Controller {
  // Получение списка лайков для определенного пользователя
  static async getLikeList(req, res) {
    const params = Controller.createOptions({
      database: "likes",
      collection: req.query.field,
      filter: { userId: res.locals.user._id },
    });

    try {
      const response = await Controller.service.getDocument(params);
      const likeList = response ? response.likes : [];
      res.send(likeList);
    } catch (err) {
      Controller.errorHandler(res, err);
    }
  }

  // Добавить id карточки в список лайков
  static async addLike(req, res) {
    const paramsField = {
      database: req.body.field
    }

    const paramsDocument = Controller.createOptions({
      database: req.body.field,
      filter: { id: req.body.id },
    });

    const paramsLike = Controller.createOptions({
      database: "likes",
      collection: req.body.field,
      filter: { userId: res.locals.user._id },
      operator: { $addToSet: { likes: req.body.id } },
    });

    try {
      const isField = await Controller.service.checkCollectionName(paramsField);
      validate.addLike(req, {}, isField);

      const document = await Controller.service.getDocument(paramsDocument);
      validate.addLike(req, document, true);

      await Controller.service.updateDocument(paramsLike);
      res.send('Успешно!');
    } catch (err) {
      Controller.errorHandler(res, err);
    }
  }

  // Удалить id карточки из списка лайков
  static async deleteLike(req, res) {
    const paramsField = {
      database: req.body.field
    }

    const params = Controller.createOptions({
      database: "likes",
      collection: req.body.field,
      filter: { userId: res.locals.user._id },
      operator: { $pull: { likes: req.body.id } },
    });

    try {
      const isField = await Controller.service.checkCollectionName(paramsField);

      validate.deleteLike(req, isField);

      await Controller.service.updateDocument(params);
      res.send('Успешно!');
    } catch (err) {
      Controller.errorHandler(res, err);
    }
  }
}