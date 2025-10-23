const Controller = require('../controllers/controller');
const router = require('express').Router();


router.get('/:id', Controller.getAdmin)
router.post('/:id', Controller.postAdmin)




module.exports = router;