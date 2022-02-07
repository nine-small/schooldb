const express = require('express');
const {
    getBookById,
    getBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../../service/book')
const {
    asyncHandler
} = require('../getSendResult')
const router = express.Router();

router.get('/', asyncHandler(async (req) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = req.query.search || "";
    return await getBooks(page, limit, search)
}))

router.get('/:id', asyncHandler(async req => {
    return await getBookById(req.params.id);
}))

router.delete('/:id', asyncHandler(async req => {
    return await deleteBook(req.params.id);
}))

router.post('/', asyncHandler(async req => {
    return await addBook(req.body);
}))

router.put("/:id", asyncHandler(async req => {
    return await updateBook(req.params.id, req.body)
}))

module.exports = router;