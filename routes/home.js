const Controller = require('../controllers/controller');
const router = require('express').Router();
const loginRouter = require('../routes/login')



router.use('/', loginRouter)
//Login Dulu Boy

router.use(function (req, res, next){
    console.log("Halo Aku Masuk");
    
})

router.get('/home', Controller.home)


module.exports = router;