const router = require('express').Router();
const {
    findOneMember
} = require('../controllers/member_controller');

router.get('/get-member', findOneMember);

module.exports=router;