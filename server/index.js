const { authenticateJwt } = require("./middleware/auth");
const {User, Admin} = require("./db");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();
const conf = require("./config.json")

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/me", authenticateJwt, async (req, res) => {
    try{
        let roletypo = req.user.role;

        if(roletypo==='admin'){
            const admin = await Admin.findOne({ username: req.user.username });
            if (!admin) {
                res.status(403).json({message: "Admin doesn't exist"});
                return;
            }
            res.json({
                role: roletypo,
                username: admin.username,
                name: admin.name
            });
        }else if(roletypo==='user'){
            const user = await User.findOne({ username: req.user.username });
            if (!user) {
                res.status(403).json({message: "User doesn't exist"});
                return;
            }
            res.json({
                role: roletypo,  
                username: user.username,
                name: user.name
            });
        }
    }catch(e){
        console.log(e.message);
        res.status(403).json({message: "Invalid role type."});
        return;
    }
});

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(conf.mongoStr, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.listen(3000, () => console.log('Server running on port 3000'));
