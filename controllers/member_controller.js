const member = require('../model/member');

const findOneMember = async (req,res,next) => {
    const name = req.query.name;
    console.log(name);
    try {
        if(name) {
            let result = await member.findOne({firstName:name}).collation({locale: 'en', strength:2});
            console.log(result);
            if(result){  
                const {
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
                } = result;

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
            } else {
                res.render("notfound", {title: 'not found!'});
            }
        } else {
            res.render("notfound", {title: 'no valid search param'});
        }
        

    } catch (error) {
        console.log(error);
    }
};


module.exports={
    findOneMember
}