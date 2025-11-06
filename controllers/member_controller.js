const { render } = require('ejs');
const member = require('../model/member');

const findOneMemberByQuery = async (req,res,next) => {
    const name = req.query.name;
    searchThenRenderOne(name, res); 
}

const findOneMemberByParam = async (req,res,next) => {
    const name = req.params.name;
    searchThenRenderOne(name, res);
}
const searchPage  = async (req, res, next) => {
    const name = req.query.name;
    const renderParams = {title: 'Søk etter medlem'};
    if(name){
        try {
            const result = await member.find({$or:[{firstName:name},{lastName:name}]}).collation({locale: 'en', strength:2});
            renderParams.searchResult = result;
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
    res.render("search", renderParams);
}

//helper functions
async function findOneMemberByName(name) {
    let result;
    try {
        result = await member.findOne({firstName:name}).collation({locale: 'en', strength:2});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    return result;
}

async function searchThenRenderOne(name, res, view) { 
    if(name) {
        let result = await findOneMemberByName(name);  
        if(result){
            renderEmployeePage(res, result);
        } else {
            renderSearchFailed(res, name);
        }
    } else {
        res.render("search", {title: 'not found!', message: 'No member name provided'});
    } 
}

function renderEmployeePage(res, memberData) {
    const {
        firstName, lastName, birthYear, role, level, experienceYears, gender, salary, socialSecurityNumber, imageUrl
    } = memberData;

    res.render("employee", {
        title:'Personal data',
        firstName,          
        lastName,
        birthYear,
        role,
        level,
        experienceYears,    
        gender,
        salary,
        socialSecurityNumber,
        imageUrl
    });
}

function renderSearchFailed(res, name) {
    res.render("search", {title: 'not found!', message: `No member found with name: ${name}`});
}
module.exports={
    findOneMemberByQuery,
    findOneMemberByParam,
    searchPage
}