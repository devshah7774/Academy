import {authenticateJwt} from "./middleware/auth";
import {Admin, User} from "./db";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import conf from "./config.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/me", authenticateJwt, async (req, res) => {
    try{
        let roletypo = req.headers.role;

        if(roletypo==='admin'){
            const admin = await Admin.findOne({ username: req.headers.userEmail });
            if (!admin) {
                res.status(403).json({message: "Admin doesn't exist"});
                return;
            };
            res.json({
                role: roletypo,
                username: admin.username,
                name: admin.name
            });
        }else if(roletypo==='user'){
            const user = await User.findOne({ username: req.headers.userEmail });
            if (!user) {
                res.status(403).json({message: "User doesn't exist"});
                return;
            };
            res.json({
                role: roletypo,  
                username: user.username,
                name: user.name
            });
        }
    }catch(e:any){
        console.log(e.message);
        res.status(403).json({message: "Invalid role type."});
        return;
    }
});

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(conf.mongoStr, { dbName: "courses" });

app.listen(3000, () => console.log('Server running on port 3000'));