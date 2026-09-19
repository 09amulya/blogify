const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5000;


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());

app.use(express.json());


// ==============================
// DATABASE FILE
// ==============================

const dbPath = path.join(
    __dirname,
    "data",
    "db.json"
);


// ==============================
// DATABASE FUNCTIONS
// ==============================

function readDatabase() {

    const data =
        fs.readFileSync(
            dbPath,
            "utf-8"
        );

    return JSON.parse(data);
}


function writeDatabase(data) {

    fs.writeFileSync(
        dbPath,
        JSON.stringify(data, null, 4)
    );

}


// ==============================
// HOME ROUTE
// ==============================

app.get("/", (req, res) => {

    res.json({
        message: "Blogify Backend API is running 🚀"
    });

});


// ==============================
// REGISTER USER
// ==============================

app.post("/api/register", (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Check missing fields

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Please provide name, email and password."

            });

        }


        const db =
            readDatabase();


        // Check existing user

        const existingUser =
            db.users.find(
                user =>
                    user.email === email
            );


        if (existingUser) {

            return res.status(409).json({

                message:
                    "User already exists."

            });

        }


        // Create user

        const newUser = {

            id:
                Date.now(),

            name,

            email,

            password

        };


        db.users.push(
            newUser
        );


        writeDatabase(db);


        res.status(201).json({

            message:
                "Registration successful.",

            user: {

                id: newUser.id,

                name: newUser.name,

                email: newUser.email

            }

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error."

        });

    }

});


// ==============================
// LOGIN USER
// ==============================

app.post("/api/login", (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Email and password are required."

            });

        }


        const db =
            readDatabase();


        const user =
            db.users.find(
                user =>
                    user.email === email &&
                    user.password === password
            );


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        res.json({

            message:
                "Login successful.",

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            }

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error."

        });

    }

});


// ==============================
// CREATE BLOG
// ==============================

app.post("/api/blogs", (req, res) => {

    try {

        const {
            title,
            category,
            content,
            author
        } = req.body;


        if (
            !title ||
            !category ||
            !content
        ) {

            return res.status(400).json({

                message:
                    "Title, category and content are required."

            });

        }


        const db =
            readDatabase();


        const newBlog = {

            id:
                Date.now(),

            title,

            category,

            content,

            author:
                author || "Anonymous",

            date:
                new Date()
                    .toLocaleDateString(),

            views: 0,

            likes: 0

        };


        db.blogs.unshift(
            newBlog
        );


        writeDatabase(db);


        res.status(201).json({

            message:
                "Blog created successfully.",

            blog:
                newBlog

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error."

        });

    }

});


// ==============================
// GET ALL BLOGS
// ==============================

app.get("/api/blogs", (req, res) => {

    try {

        const db =
            readDatabase();


        res.json(
            db.blogs
        );


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Unable to fetch blogs."

        });

    }

});


// ==============================
// GET SINGLE BLOG
// ==============================

app.get(
    "/api/blogs/:id",
    (req, res) => {

        try {

            const db =
                readDatabase();


            const blog =
                db.blogs.find(
                    blog =>
                        blog.id ==
                        req.params.id
                );


            if (!blog) {

                return res.status(404).json({

                    message:
                        "Blog not found."

                });

            }


            res.json(blog);


        } catch (error) {

            console.error(error);

            res.status(500).json({

                message:
                    "Server error."

            });

        }

    }
);


// ==============================
// START SERVER
// ==============================

app.listen(
    PORT,
    () => {

        console.log(
            `Blogify server running at http://localhost:${PORT}`
        );

    }
);