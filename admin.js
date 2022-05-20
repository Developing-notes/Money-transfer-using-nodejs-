//customise function//
const jwt = require('jsonwebtoken');
// const admininfo = require("../model/notify")
exports.admin = async function (req, res) { 
    const user = {
        username: "John",
        email: "John@gmail.com",
        age: 22,
        password: 5643
    };
    var uname = req.body.username
    var upassword = req.body.password
    if ((user.username == uname) && (user.password == upassword)) {
        jwt.sign({ user: user }, "secret", { expiresIn: '1hr' }, (err, token) => {
            res.json({
                token
            });

        });
    }
    else {
        res.send("invalid username & password")
    }
}
// add_details
exports.Adddetails = async (req, res) => {
    const bearerHeader = req.headers['authorization'];

    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            const decodedToken = jwt.verify(bearerToken, "secret");
            const stores = admininfo();
            const { NotificationNO, NotificationDate, PostName, DateOfExamination, Activity } = req.body;
            const productlist = await admininfo.findOne({ NotificationNO });
            if (productlist) {
                return res.json({
                    success: false,
                    message: 'This Notification is already in upload!',
                });
            }
            else {
                stores.NotificationNO = NotificationNO;
                stores.NotificationDate = NotificationDate;
                stores.PostName = PostName;
                stores.DateOfExamination = DateOfExamination;
                stores.Activity = Activity
                stores.save();
                res.json({ success: true, msg: "Notification insert successfully!!", stores });
                ;
            }
        }
        else {
            res.send('not valid')
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}
//find_details
exports.finddetails = (req, res) => {
    const bearerHeader = req.headers['authorization'];
    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            const decodedToken = jwt.verify(bearerToken, "secret");
            admininfo.find(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            });
        }
        else {
            res.send('not valid')
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}

//update_details
exports.updatedetails = async (req, res) => {
    const bearerHeader = req.headers['authorization'];
    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            const decodedToken = jwt.verify(bearerToken, "secret");

            if (req.body.id == "") {
                res.send("please enter  id")
            }
            admininfo.findByIdAndUpdate(req.body._id,
                {

                    NotificationNO: req.body.NotificationNO,
                    NotificationDate: req.body.NotificationDate,
                    PostName: req.body.PostName,
                    DateOfExamination: req.body.DateOfExamination,
                    Activity: req.body.Activity
                },
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(data);
                    }
                })
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}
// remove_details
exports.removedetails = async (req, res) => {
    const bearerHeader = req.headers['authorization'];
    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            const decodedToken = jwt.verify(bearerToken, "secret");

            if (req.body.id == "") {
                res.send("Please enter product id")
            }
            else {
                const id = req.body._id;

                const list = await admininfo.findOne({ id });
                if (list) {

                    admininfo.findByIdAndDelete((req.body._id),
                        function (err, data) {
                            if (err) {
                                res.json({ success: false, msg: "Notification not available!!", data: data })
                            }
                            else {
                                res.json({ success: true, msg: "Notification deleted successfully!!", data: data })
                            }
                        });
                }
                else {
                    res.json({ success: false, msg: "Notification not available!!", data: data })
                }
            }
        }
        else {
            res.send('not valid')
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}
