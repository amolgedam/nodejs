import { Router } from 'express';
const router = Router();

/* Middleware */
import Auth, { localVariables } from '../middlewares/auth.js';

/* import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js';

/* Post Methods */
router.route('/register').post(controller.register); // register user

router.route('/register-mail').post(registerMail); // send the mail

router.route('/authenticate').post((req, res)=>{
    res.end();
}); // authenticate user

router.route('/login').post(controller.verifyUser, controller.login); // login in app

/* GET Methods */
router.route('/user/:username').get(controller.getUser); // user with username

router.route('/generate-otp').get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP

router.route('/verify-otp').get(controller.verifyOTP); // verify generated OTP

router.route('/create-reset-session').get(controller.createResetSession); // reset all the variables

/* Put Methods */
router.route('/update-user').put(Auth, controller.updateUser); // is use to update the user profile

router.route('/reset-password').put(controller.verifyUser, controller.resetPassword); // use to reset password


export default router;