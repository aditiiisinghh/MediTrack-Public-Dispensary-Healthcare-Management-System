const UserModels = require('../Models/user');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'Lax'
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.register = async (req, res) => {
    try {
        const { name, email, password, roll } = req.body;
        const isExist = await UserModels.findOne({ email });

        if (isExist) {
            return res.status(400).json({ error: "Already have an account with this email id." });
        }

        let hashedPassword = await bcryptjs.hash(password, 10);
        const user = new UserModels({ name, email, password: hashedPassword, roll, role: "student" });
        await user.save();

        const token = jwt.sign({ userId: user._id }, "Its_My_Secret_Key", { expiresIn: "7d" });
        const userInfo = { _id: user._id, name: user.name, email: user.email, role: user.role, roll: user.roll };

        return res.status(200).cookie('token', token, cookieOptions).json({
            message: "Registration Successful",
            userInfo
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isExist = await UserModels.findOne({ email });

        if (isExist && await bcryptjs.compare(password, isExist.password)) {
            const token = jwt.sign({ userId: isExist._id }, "Its_My_Secret_Key", { expiresIn: "7d" });
            const userInfo = { _id: isExist._id, name: isExist.name, email: isExist.email, role: isExist.role, roll: isExist.roll };

            return res.status(200).cookie('token', token, cookieOptions).json({
                message: "Login Successful",
                userInfo
            });
        } else {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

// ✅ FIX: New function to create an admin user.
// There was NO way to create an admin in the original code — every user
// (register, addStaff) was hardcoded to role "student" or "staff".
// Call POST /api/auth/create-admin ONCE to seed your admin account,
// then you can remove this route if you want to lock it down.
exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please provide name, email and password" });
        }

        const isExist = await UserModels.findOne({ email });
        if (isExist) {
            return res.status(400).json({ error: "An account with this email already exists." });
        }

        let hashedPassword = await bcryptjs.hash(password, 10);
        const admin = new UserModels({ name, email, password: hashedPassword, role: "admin" });
        await admin.save();

        return res.status(200).json({
            message: "Admin created successfully! You can now log in.",
            admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No account found with this email." });
        }

        const buffer = crypto.randomBytes(4);
        let otp = buffer.readUInt32BE(0) % 900000 + 100000; // 6-digit OTP

        user.resetPasswordToken = otp.toString();
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset OTP - Dispensary System",
            html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p><p>This OTP is valid for 10 minutes.</p>`
        });

        res.status(200).json({ message: "OTP sent to your email." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const user = await UserModels.findOne({
            email,
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'OTP is invalid or has expired, Please Try Again.' });
        }
        res.status(200).json({ message: "OTP is Successfully Verified" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await UserModels.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        let hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json({ message: "Password Reset Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.updateStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateStudent = await UserModels.findByIdAndUpdate(id, req.body, { new: true });
        if (updateStudent) {
            return res.status(200).json({ message: "Student Updated Successfully", student: updateStudent });
        }
        return res.status(400).json({ error: "No Such Student is there" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.getStudentByRollNo = async (req, res) => {
    try {
        const { roll } = req.params;
        const student = await UserModels.findOne({ roll });
        if (student) {
            return res.status(200).json({ message: "Student fetched Successfully", student });
        }
        return res.status(400).json({ error: "No Such Student is there" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.registerStudentByStaff = async (req, res) => {
    try {
        const buffer = crypto.randomBytes(4);
        let token = buffer.readUInt32BE(0) % 900000 + 100000;

        const { name, email, roll } = req.body;
        const isExist = await UserModels.findOne({ email });

        if (isExist) {
            return res.status(400).json({ error: "Already have an account with this email id." });
        }

        let hashedPassword = await bcryptjs.hash(token.toString(), 10);
        const user = new UserModels({ name, email, password: hashedPassword, roll, role: "student" });
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your Account Created - Dispensary System",
            html: `<p>Hello ${name},</p><p>Your account has been created.</p><p>Your temporary password is: <strong>${token}</strong></p><p>Please login and change your password.</p>`
        });

        return res.status(200).json({ message: "Student Registered Successfully, Password sent to email.", student: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.addStaffsByAdmin = async (req, res) => {
    try {
        const { name, email, password, designation, mobileNo } = req.body;
        const searchStaff = await UserModels.findOne({ email });

        if (searchStaff) {
            return res.status(400).json({ error: "Already have an account with this email id." });
        }

        let updatedPass = await bcryptjs.hash(password, 10);
        const staff = new UserModels({ name, email, password: updatedPass, designation, mobileNo, role: "staff" });
        await staff.save();

        return res.status(200).json({ message: "Staff Added Successfully", staff });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.getAllStaffs = async (req, res) => {
    try {
        const staffs = await UserModels.find({ role: "staff" });
        return res.status(200).json({ staffs });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.updateStaffById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, designation, mobileNo } = req.body;
        const staff = await UserModels.findById(id);

        if (!staff) {
            return res.status(400).json({ error: "No Such Staff is there" });
        }

        staff.name = name || staff.name;
        staff.designation = designation || staff.designation;
        staff.mobileNo = mobileNo || staff.mobileNo;
        await staff.save();

        return res.status(200).json({ message: "Staff Updated Successfully", staff });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModels.findByIdAndDelete(id);
        if (deletedUser) {
            return res.status(200).json({ message: "Staff Getting Deleted" });
        }
        return res.status(400).json({ error: "No Such Staff is there" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}
