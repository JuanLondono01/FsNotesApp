const { Router } = require('express');
const router = Router();
const {getUser, getNotes, createNote,  deleteNote, editNote, deleteAccount, editSettings} = require('../controllers/user.controller')
const authMiddleware = require('../controllers/authMiddleware');



router.route('/profile')
    .get(authMiddleware, getUser) 


router.route('/notes')
    .get(authMiddleware, getNotes) 
    .post(authMiddleware, createNote) 


router.route('/notes/options/:id')
    .put(authMiddleware, editNote) 
    .delete(authMiddleware, deleteNote) 


router.route('/settings/:id')
    .put(authMiddleware, editSettings) 
    .delete(authMiddleware, deleteAccount) 


module.exports = router;