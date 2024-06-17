const { Router } = require('express');
const router = Router();
const { login, register } = require('../controllers/access.controller');

router.route('/login').post(login); 

router.route('/register').post(register); 



module.exports = router;
