const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/user');
const Authentication = require('../Authentication/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/send-otp', UserController.sendOtp);
router.post('/verify-otp', UserController.verifyOtp);
router.post('/reset-password', UserController.resetPassword);

// ✅ FIX: This route creates an admin user in the database.
// The original code had NO way to create an admin — every signup was hardcoded
// to role "student". Call this route ONCE using Postman or the browser, then
// you can delete this line if you want to prevent new admins from being created.
// HOW TO USE: POST http://localhost:4000/api/auth/create-admin
// BODY (JSON): { "name": "Admin", "email": "admin@gmail.com", "password": "yourpassword" }
router.post('/create-admin', UserController.createAdmin);

router.get('/get-student/:roll', Authentication.adminFacultyAuth, UserController.getStudentByRollNo);
router.put('/update-student/:id', Authentication.adminFacultyAuth, UserController.updateStudentById);
router.post('/register-student', Authentication.adminFacultyAuth, UserController.registerStudentByStaff);

router.post('/add-staff', Authentication.adminFacultyAuth, UserController.addStaffsByAdmin);
router.get('/get-staffs', UserController.getAllStaffs);
router.put('/update-staff/:id', Authentication.adminFacultyAuth, UserController.updateStaffById);
router.delete('/delete-staff/:id', Authentication.adminFacultyAuth, UserController.deleteStaff);

router.post('/logout', Authentication.studentAuth, UserController.logout);

module.exports = router;
