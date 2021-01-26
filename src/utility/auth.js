const jwt = require('jsonwebtoken');
const jwtKey = require('../config/jwtKey');
const rolesDao = require('../dao/roles.dao');

var authHandler = {

    generateToken: generateToken,
    validateToken: validateToken
}
function generateToken(user) {
    return jwt.sign({
        emailId: user.emailId,
        userId: user._id,
        role: user.role
    }, jwtKey,
        {
            expiresIn: "60 days"
        });
}

function validateToken(req, res, next) {
    try {
        if (jwt.verify(req.headers.token, jwtKey)) {
            var user = jwt.verify(req.headers.token, jwtKey);
            req.message = 'valid user';
            req.user = user;
            rolesDao.findByName(user.role).then(data => {
                if (data.length!==0) {
                    req.permission = JSON.stringify(data[0].permission);
                    next();
                } else {
                    next();
                }
            })
                .catch((error) => { console.log(error); });
        }
        else {
            res.header('Unauthorized', 1);
            res.header("Access-Control-Expose-Headers", "Unauthorized");
            res.status(401).send({ "message": "Token Corrupted" });
        }
    } catch (JsonWebTokenError) {
        res.header('Unauthorized', 1);
        res.header("Access-Control-Expose-Headers", "Unauthorized");
        res.send({ "message": "Token Corrupted" });
    }
}


module.exports = authHandler;