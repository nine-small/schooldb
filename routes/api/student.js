const express = require('express');
const router = express.Router();
const {
    addStudent,
    deleteStudent,
    updateStudent,
    getStudentById,
    getStudents
} = require('../../service/student');
const {
    asyncHandler
} = require('../getSendResult')

router.get('/', asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    return await getStudents(page, limit, sex, name)
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
    return await getStudentById(req.params.id)
}))

router.delete("/:id", asyncHandler(async (req, res, next) => {
    return await deleteStudent(req.params.id);
}))

router.post("/", asyncHandler(async (req, res, next) => {
    return await addStudent(req.body);
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
    return await updateStudent(req.params.id,req.body)
}))

module.exports = router;