const express = require('express');
const vuelosController = require("../Controllers/vuelosController.js")
const router = express.Router();

router.get('/', vuelosController.get);
router.get('/:idVuelo', vuelosController.getById);
router.post('/', vuelosController.post);
router.put('/:idVuelo', vuelosController.put);
router.delete('/:idVuelo', vuelosController.delete);

module.exports = router;
