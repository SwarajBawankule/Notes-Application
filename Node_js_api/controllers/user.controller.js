const manageUserModel = require("../models/user.model");
const status = require("../config/status");

// Add user
exports.create = async (req, res) => {
    try {
        const obj = {
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
        };
        const newManageUserModel = new manageUserModel(obj);
        await newManageUserModel.save();
        res.json({ success: true, status: status.OK, msg: 'Adding Notes is successfully.' });
    } catch (err) {
        console.log("err", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Notes failed.' });
    }
};

//update by id
exports.edit = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.query.id;
    try {
        let result = await manageUserModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    category: req.body.category,
                    title: req.body.title,
                    content: req.body.content,
                    date: req.body.date,
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Notes is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Notes Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Notes failed.' });

    }
}

//get all users 
exports.list = async (req, res) => {
    try {
        const data = await manageUserModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Notes failed.' });

    }
}

//delete user by id
exports.delete = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await manageUserModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Notes is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Notes Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Notes data failed.' });

    }
}
