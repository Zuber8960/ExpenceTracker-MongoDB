const path =require('path');

exports.get404 = (req, res, next) => {
    // res.status(404).send(`<html>Go to home page ===> <a href=http://localhost:3000/login.html>click me</a></html>`);
    res.status(200).sendFile(path.join(__dirname, '../','frontend/error.html'));
}
