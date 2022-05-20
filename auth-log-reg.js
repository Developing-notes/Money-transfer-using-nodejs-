//customise function//
const userel = require("../model/user");
const bcrypt = require("bcryptjs");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const adminel = require('../model/adminmod')
// passwordhashmethod
const hashgenerate = async (plainpassword) => {
    const saltel = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(plainpassword, saltel);
    return hash;
};
const hashvalidator = async (plainpassword, hashedpassword) => {
    const result = await bcrypt.compare(plainpassword, hashedpassword);
    return result;
};
// user_signup
exports.signup = async function (req, res) {
    const hashpassword = await hashgenerate(req.body.password);
    const dateel = new Date();
    const us = new userel();
    (us.username = req.body.username),
        (us.email = req.body.email),
        (us.password = hashpassword),
        (us.mobilenumber = req.body.mobilenumber);
    (us.date = dateel)
    // (us.Amount=req.body.Amount)

    us.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send("registration ");
        }
    });
};
// user_signin
exports.signin = async function (req, res) {
    try {
        const existinguser = await userel.
            findOne({ email: req.body.email });
        if (!existinguser) {
            res.send("email invalid");
        } else {
            const checkuser = await hashvalidator(
                req.body.password,
                existinguser.password
            );
            if (!checkuser) {
                res("password is invalid ");
            }
            else {
                const token = jwt.sign({ email: req.body.email },
                    "secret", {
                    expiresIn: "1hr",
                });
                res.json({
                    success: true,
                    message: "successfully login",
                    token: token,
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};
exports.deposit = function (req, res) {
    userel.findByIdAndUpdate(req.body._id,
        {
            Amount: req.body.Amount
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
exports.check = function (req, res) {
    var fromnumber = req.body.fromnumber
    var tonumber = req.body.tonumber
    var Amount = req.body.Amount
    //fromuserfindmobileno
    userel.findOne({ mobilenumber: fromnumber },
        function (err, data) {
            console.log(data)
            if (data == null) {
                console.log("error");
            }
            else if (data !== null) {
                //amount check
                userel.findOne({ mobilenumber: tonumber },
                    function (err, datas) {
                        if (datas == null) {
                            console.log("error")
                        }
                        else {
                            let incamt = Amount - 20;//adminfee
                            userel.findOneAndUpdate({ mobilenumber: fromnumber },
                                { $inc: { Amount: -Amount } },
                                function (err, data) {
                                    if (data == null) {
                                        console.log("amount n   ot debit");
                                    }
                                    else {
                                        console.log('updated' + incamt)
                                            userel.findOneAndUpdate(
                                                { mobilenumber: tonumber },
                                                { $inc: { Amount: incamt } },
                                                function (err, data) {
                                                    if (data == null) {
                                                        console.log("amount not add")
                                                    }
                                                    else {
                                                        console.log("amount added");
                                                        adminel.count({},
                                                        function (err, data) {
                                                            console.log(data)
                                                            if (data === 0) {
                                                                // firstinitiat_amount
                                                                adminel({
                                                                    username: 'david',
                                                                    Adminfees: 20
                                                                }).save(function (err) {
                                                                    if (err) {
                                                                        console.log(err)
                                                                    }
                                                                  })
                                                            }
                                                            else {
                                                                adminel.updateMany({ username: "david" },
                                                                    { $inc: { Adminfees: 20 } },
                                                                    //  newtrue:fieldaddnew
                                                                    { new: true }, function (err, data) {
                                                                        if (err) {
                                                                            console.log(err)
                                                                        }
                                                                        else {
                                                                            console.log('updated')
                                                                            console.log(data)
                                                                        }
                                                                    })

                                                            }
                                                        })

                                                }
                                            })
                                    }

                                })
                        }
                    })

            }
        })
}

