const path = require('path');

exports.homepage = (req, res, next) => {
    res.status(202).sendFile(path.join(__dirname,'../','frontend/login.html'));
}
