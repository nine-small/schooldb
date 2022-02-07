const express = require('express');
const router = express.Router();
const {
    asyncHandler
} = require('../getSendResult');
const {
    addClass,
    getClassAll,
    getClassById,
    updateClass,
    deleteClass
} = require('../../service/class');

router.get("/", asyncHandler(async () => {
    return await getClassAll()
}))

router.get("/:id", asyncHandler(async (req) => {
    return await getClassById(req.params.id)
}))

router.delete("/:id", asyncHandler(async (req) => {
    return await deleteClass(req.params.id)
}))

router.post("/", asyncHandler(async (req) => {
    return await addClass(req.body)
}))

router.put("/:id", asyncHandler(async (req) => {
    return await updateClass(req.params.id, req.body)
}))

module.exports = router;