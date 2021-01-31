const exp=require('express');
const userController=require('../../controller/user/users-controller')
const rout=exp.Router();
rout.post('/user-registraion',userController.userRegstration);
rout.post('/user-login',userController.userlogin);
rout.post('/get-user',userController.findUser);
rout.post('/update-user',userController.updateUser);
rout.post('/delete-user',userController.deleteUser);
rout.get('/get-all-user',userController.getAllUsers);
module.exports=rout;