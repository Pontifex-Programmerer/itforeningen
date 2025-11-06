const router = require('express').Router();
const {
    findOneMemberByQuery,
    findOneMemberByParam,
    searchPage
} = require('../controllers/member_controller');

router.get('/medlemmer/search', searchPage);
router.get('/medlemmer', findOneMemberByQuery);
router.get('/medlemmer/:name', findOneMemberByParam);

module.exports=router;