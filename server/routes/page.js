const express = require('express');

const { body } = require('express-validator');

const router = express.Router()

const pageController = require('../controllers/pages');

const auth = require('../middleware/auth');

router.get('/', auth, pageController.fetchAll)

router.post('/', [
    auth,
    body('title').trim().isLength({min: 5}),
    body('body').trim().isLength({min: 10}),
    body('user').trim().isLength({min: 1}),
    ],
    pageController.postPage
);

router.delete('/:id', auth, pageController.deletePage)

module.exports = router;