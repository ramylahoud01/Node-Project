const express = require('express');
const router = express.Router();
const notescontroller = require('../controller/notes')
const {body}= require('express-validator/check');
const isAuth = require('../middleware/is-auth');
//create
router.post('/post/:categId',isAuth,[
    body('title').trim().not().isEmpty(),
    body('content').trim().not().isEmpty(),
    body('tags').trim()
]
,
notescontroller.createnotes)

//read 
router.get('/post/:postId/:categId',isAuth,notescontroller.getnotes)

//update
router.put('/post/:postId/:categId',isAuth,notescontroller.updatenotes)

//delete
router.delete('/post/:postId/:categId',isAuth,notescontroller.deletenotes)

//searching by tags
router.post('/tags',isAuth,notescontroller.searchtags)
module.exports = router
