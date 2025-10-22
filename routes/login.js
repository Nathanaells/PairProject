const Controller = require('../controllers/controller');
const router = require('express').Router();


router.get('/', (req, res)=> {
    res.redirect('/register')
})
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)





module.exports = router;