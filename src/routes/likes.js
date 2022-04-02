import { Router } from "express";
import { getLikeList, addLike, deleteLike } from "../controllers/likes.js";

const router = Router();

// Получение списка лайков для юзера
router.get("/likes", getLikeList);

// Добавление в список лайков id карточки
router.put("/likes/add", addLike);

// Удаление юзера из списка лайков
router.put("/likes/delete", deleteLike);

export default router;