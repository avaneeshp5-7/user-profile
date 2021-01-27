const connection = require('../../config/db/conncetion');
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.userRegstration = (rq, rs) => {
   var sql = 'INSERT INTO users SET ?';
   delete rq.body.confirmPass;
   var email = rq.body.email;
   var password = rq.body.password;
   var sql = 'SELECT * FROM user_registration WHERE email = ? ';
   var sqls = "INSERT INTO user_registration SET ?";
   connection.query(sql, [email], (er, resu) => {
      if (resu.length === 1) {
         rs.json({
            success: false,
            message: 'Email exist, Please try another email id !'
         });
      } else {
         bcrypt.hash(password, saltRounds, function (err, hash) {
            rq.body.password = hash
            connection.query(sqls, rq.body, (errs, results) => {
               if (errs) {
                  console.log(errs)
                  rs.json({
                     success: false,
                     message: errs,
                  });
               } else {
                  rs.json({
                     success: true,
                     message: 'User sinup successfully !',
                     data: results
                  });
               }
            });
         });
      }
   });
}
exports.userlogin = (request, response) => {
   var email = request.body.email;
   var sql = 'SELECT * FROM user_registration WHERE email = ?';
   connection.query(sql, [email], (err, results) => {
      if (err) {
         response.json({
            success: false,
            message: err
         });
      } else {
         bcrypt.compare(request.body.password, results[0].password).then(function (result) {
            console.log(result);
            if (result == true) {
               response.json({
                  success: true,
                  data: results,
                  message: 'User login !'
               });
            } else {
               response.json({
                  success: false,
                  data: err,
                  message: 'Invalid credentials'
               });
            }
         });
      }
   });
}
exports.findUser = (req, res) => {
   connection.query('SELECT * FROM user_registration WHERE user_id = ? ', [req.body.id], (err, data) => {
      if (err) {
         res.send({
            success: false,
            message: 'data not found !'
         });
      } else {
         res.send({
            success: true,
            message: 'data found!',
            data: data
         });
      }
   });
}
exports.updateUser = (req, res) => {
   var ids = req.body.id;
   delete req.body.id;
   var sql = "UPDATE user_registration set ?  WHERE user_id = ? "
   connection.query(sql, [req.body, ids], (err, data) => {
      if (err) {
         res.send({
            success: false,
            message: 'not updated !',
            err: err
         });
      } else {
         res.send({
            success: true,
            message: 'updated !',
         });
      }
   });
}
// "update user_registration SET fname = '" + req.body.fname + "' , lname='" + req.body.lname + "' , '" + req.body.email + "' , '" + req.body.address + "' , '" + req.body.pincode + "' , '" + req.body.mobile + "' where user_id = '" + ids + "'"