const router = require('express').Router();
const {reqisterAdmin, authAdmin} = require('../controllers/admins');

router.post('/register', reqisterAdmin);
router.post('/auth', authAdmin);


module.exports = router;
