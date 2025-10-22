const Controller = require('../controllers/controller');
const router = require('express').Router();


router.get('/', Controller.home)
// router.get('/', Controller.home)



module.exports = router;