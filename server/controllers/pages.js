const { validationResult } = require('express-validator');

const Page = require('../models/page');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allPages] = await Page.fetchAll();
        res.status(200).json(allPages)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postPage = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return

    const title = req.body.title;
    const body = req.body.body;
    const user = req.body.user;
    const uniqueUrlSuffix = req.body.uniqueUrlSuffix;

    try {
        const page = {
            title: title,
            body: body,
            user: user,
            uniqueUrlSuffix: uniqueUrlSuffix
        }

        const result = await Page.save(page);

        res.status(201).json({message: 'Page created'});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deletePage = async (req, res, next) => {
    try {
        const deleteResponse = await Page.delete(req.params.id);
        res.status(200).json(deleteResponse)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}