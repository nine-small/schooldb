const express = require('express');
const router = express.Router();
const {
    getAdminAll,
    getAdminById,
    updateAdmin,
    addAdmin,
    deleteAdmin,
    login
} = require('../../service/admin');
const {
    asyncHandler
} = require('../getSendResult')

router.get('/', asyncHandler(async req => {
    return await getAdminAll();
}))

router.get("/:id", asyncHandler(async req => {
    return await getAdminById(req.params.id)
}))

router.delete("/:id", asyncHandler(async req => {
    return await deleteAdmin(req.params.id)
}))

router.post("/", asyncHandler(async req => {
    return await addAdmin(req.body);
}))

router.put("/:id", asyncHandler(async req => {
    return await updateAdmin(req.params.id, req.body)
}))

router.post('/login',asyncHandler(async (req,res)=>{
    const {loginId,loginPwd} = req.body;
    const result = await login(loginId,loginPwd)
    if(result){
        const value = result.id;
        res.cookie("token",value,{
            path:"/",
            domain:"localhost",
            maxAge:3600000
        })
        res.header("authorization",value)
    } 
    return result; 
}))

module.exports = router;