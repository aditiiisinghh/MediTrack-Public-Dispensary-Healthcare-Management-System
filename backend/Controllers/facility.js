const FacilityModel = require('../Models/facility');

exports.addFacility = async (req, res) => {
    try {
        let body = { ...req.body };
        const facility = new FacilityModel({ ...body, addedBy: req.user._id });
        await facility.save();
        res.status(200).json({ message: "Facility Added Successfully", facility });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.updateFacility = async (req, res) => {
    try {
        const { id } = req.params;
        let body = { ...req.body };
        const facility = await FacilityModel.findByIdAndUpdate(id, { ...body }, { new: true });
        if (facility) {
            return res.status(200).json({ message: "Facility Updated Successfully", facility });
        }
        return res.status(400).json({ error: "No Such Facility Found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.getAllFacility = async (req, res) => {
    try {
        const facilities = await FacilityModel.find().populate("addedBy", "name").sort({ createdAt: -1 });
        return res.status(200).json({ message: "Facilities Fetched Successfully", facilities });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.deleteFacility = async (req, res) => {
    try {
        const { id } = req.params;
        const facility = await FacilityModel.findByIdAndDelete(id);
        if (facility) {
            return res.status(200).json({ message: "Facility Deleted Successfully" });
        }
        return res.status(400).json({ error: "No Such Facility Found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}
