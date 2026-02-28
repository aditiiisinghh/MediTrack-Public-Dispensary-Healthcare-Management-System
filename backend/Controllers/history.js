const HistoryModel = require("../Models/history");
const MedicineModel = require("../Models/medicine");

exports.addHistory = async (req, res) => {
    try {
        let { roll, student, medicines } = req.body;

        let medicineData = medicines.map((item) => {
            let { _id, name, requiredQuantity } = item;
            return { _id, name, requiredQuantity };
        });

        // Deduct quantities from medicine stock
        for (let med of medicines) {
            const medicineRecord = await MedicineModel.findById(med._id);
            if (medicineRecord) {
                let currentQty = parseInt(medicineRecord.quantity) || 0;
                let required = parseInt(med.requiredQuantity) || 0;
                let newQty = currentQty - required;
                if (newQty < 0) newQty = 0;
                await MedicineModel.findByIdAndUpdate(med._id, { quantity: newQty.toString() });
            }
        }

        const history = new HistoryModel({ roll, student, medicines: medicineData });
        await history.save();

        return res.status(200).json({ message: "History Added Successfully", history });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.getHistoryByDate = async (req, res) => {
    try {
        let { month, year } = req.query;
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth(); // 0-11

        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59);

        const history = await HistoryModel.find({
            createdAt: { $gte: startDate, $lte: endDate }
        }).populate("student").sort({ createdAt: -1 });

        return res.status(200).json({ message: "Fetched Successfully", history });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}

exports.getStudentHistory = async (req, res) => {
    try {
        const { roll } = req.query;
        const history = await HistoryModel.find({ roll }).populate("student").sort({ createdAt: -1 });
        return res.status(200).json({ message: "History Fetched Successfully", history });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something Went Wrong", issue: err.message });
    }
}
