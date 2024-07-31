const express=require('express');
const router=express.Router();
const { model } = require('mongoose');
const { userLogin, userRegister, userLogout, handleRefreshToken } = require('../controllers/auth');

router.post('/login',userLogin);
router.post('/register',userRegister);
router.get('/logout',userLogout);
router.get('/refreshToken',handleRefreshToken);

module.exports=router