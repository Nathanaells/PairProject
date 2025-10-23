const Controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/home/addProfile', Controller.getAddProfile)
router.get('/activities', Controller.listActivities)
router.post('/home/addProfile', Controller.postAddProfile)
router.get('/home/addHR', Controller.getAddHR)
router.post('/home/addHR', Controller.postAddHR)
router.get('/healthrecords/:id/addNote', Controller.getUpdateHR)
router.post('/healthrecords/:id/addNote', Controller.postUpdateHR)
router.get('/healthrecords/:id/delete', Controller.delete)
router.get('/home/editProfile/:id', Controller.getEditProfile)
router.post('/home/editProfile/:id', Controller.postEditProfile)
router.get("/health-report", Controller.generateHealthReport);


router.get('/home/:id', Controller.home)



module.exports = router;