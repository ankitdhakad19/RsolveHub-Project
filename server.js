const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(express.urlencoded());


// const currentCitizen = null;

mongoose
    .connect("mongodb://localhost:27017/ResolveHub_Db")
    .then(() => console.log("mongodb connect succesfully"))
    .catch(() => console.log("connection failed "))


// -----------------------------------------------user schema ----------------------------------
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

})

const user = mongoose.model("user", userSchema)


//   ------------------------------------------------ complainForm schema  ------------------------------------

const complainSchema = mongoose.Schema({

    complaintCategory: { type: String, required: true },
    complaintType: { type: String, required: true },
    tittle: { type: String, required: true },
    Description: { type: String, required: true },
    Location: { type: String, required: true },
    date: { type: String, required: true, },
    time: { type: String, required: true, },
    status: { type: String, default: "pending" }

})

const complain = mongoose.model("complain", complainSchema)


// ---------------------------------------------------  API for Registor -----------------------------------
app.post("/Register", async (req, res) => {

    try {

        const { email, password, name } = req.body;

        const exist = await user.findOne({ email });

        if (exist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await user.create({
            name,
            email,
            password: hashPassword
        });

        res.json({
            message: "Registration Successful",
            user: exist
        });

    }

    catch (err) {
        res.status(500).json(err);
    }

});


// -------------------------API for login---------------------------------

app.post("/Login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const exist = await user.findOne({ email });

        if (!exist) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const checkPassword = await bcrypt.compare(
            password,
            exist.password
        );

        if (!checkPassword) {
            currentCitizen = exist.name;
            return res.status(401).json({
                message: "Incorrect Password"
            });
        }
        res.json({
            message: "Login Successful",
        });

    }
    catch (err) {
        res.status(500).json(err);
    }

});


// -----------------------------------------to add the complain---------------------------
app.post("/complain", async (req, res) => {

    // let complaintCategory = req.body.complaintCategory;
    // let complaintType = req.body.complaintType;
    // let tittle = req.body.tittle;
    // let Description = req.body.Description;
    // let Location = req.body.Location;
    // let date = req.body.date;
    // let time = req.body.time;


    try {
        const NewComplain = new complain(req.body );
        const saveComplian = await NewComplain.save();

        res.status(200).json({
            message: "complain added",
            complain: saveComplian

        });
    }

    catch (error) {
        res.status(404).send(error);
    }


});

// for all complain 

app.get("/complain", async (req, res) => {
    try {

        const complaint = await complain.find().sort({ _id: -1 });
        res.status(200).json(complaint);
    }
    catch (error) {
        res.status(404).send(error)
    }

});

// for recent complain
app.get("/complain/recent", async (req, res) => {
    try {

        const complaint = await complain.find().sort({ _id: -1 }).limit(4);
        res.status(200).json(complaint);
    }
    catch (error) {
        res.status(404).send(error)
    }

});


// for specific complain 

app.get("/complain/:id", async (req, res) => {
    try {

        const complaint = await complain.findById(req.params.id);
        res.status(200).json(complaint);
    }
    catch (error) {
        res.status(404).send(error)
    }

});

// statics 

app.get("/stats", async (req, res) => {

    try {

        const total = await complain.countDocuments();

        const pending = await complain.countDocuments({
            status: "Pending"
        });

        const progress = await complain.countDocuments({
            status: "In Progress"
        });

        const resolved = await complain.countDocuments({
            status: "Resolved"
        });


        res.json({
            total,
            pending,
            progress,
            resolved
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

//for update status 

app.patch("/complain/:id", async (req, res) => {
    try {

        const complaint = await complain.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(complaint);
    }
    catch (error) {
        res.status(404).send(error)
    }
});



app.listen(3000, () => {
    console.log("server is running")
})

