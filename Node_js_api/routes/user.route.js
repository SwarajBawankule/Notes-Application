const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.route('/list')
    .get(userController.list)
router.route('/create')
    .post(userController.create)
router.route('/edit')
    .put(userController.edit)
router.route('/delete')
    .delete(userController.delete);

module.exports = router;
