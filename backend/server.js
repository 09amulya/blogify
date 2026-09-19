const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Blog = require("./models/Blog");

const app = express();

const PORT = process.env.PORT || 5000;


// =================================
// MIDDLEWARE
// =================================

app.use(cors());

app.use(express.json());


// =================================
// CONNECT TO MONGODB
// =================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully.");

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });


// =================================
// HOME ROUTE
// =================================

app.get("/", (req, res) => {

    res.json({
        message: "Blogify Backend API is running 🚀"
    });

});


// =================================
// REGISTER USER
// =================================

app.post("/api/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Name, email and password are required."

            });

        }


        if (password.length < 6) {

            return res.status(400).json({

                message:
                    "Password must contain at least 6 characters."

            });

        }


        // Check existing user

        const existingUser =
            await User.findOne({
                email
            });


        if (existingUser) {

            return res.status(409).json({

                message:
                    "User already exists."

            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // Create user

        const user =
            await User.create({

                name,

                email,

                password:
                    hashedPassword

            });


        res.status(201).json({

            message:
                "Registration successful.",

            user: {

                id: user._id,

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


// =================================
// LOGIN USER
// =================================

app.post("/api/login", async (req, res) => {

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


        // Find user

        const user =
            await User.findOne({
                email
            });


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        // Compare password

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        res.json({

            message:
                "Login successful.",

            user: {

                id: user._id,

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


// =================================
// CREATE BLOG
// =================================

app.post("/api/blogs", async (req, res) => {

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


        const blog =
            await Blog.create({

                title,

                category,

                content,

                author:
                    author || "Anonymous"

            });


        res.status(201).json({

            message:
                "Blog created successfully.",

            blog

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Unable to create blog."

        });

    }

});


// =================================
// GET ALL BLOGS
// =================================

app.get("/api/blogs", async (req, res) => {

    try {

        const blogs =
            await Blog.find()
                .sort({
                    createdAt: -1
                });


        res.json(blogs);


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Unable to fetch blogs."

        });

    }

});


// =================================
// GET SINGLE BLOG
// =================================

app.get(
    "/api/blogs/:id",
    async (req, res) => {

        try {

            const blog =
                await Blog.findById(
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
                    "Unable to fetch blog."

            });

        }

    }
);


// =================================
// UPDATE BLOG
// =================================

app.put("/api/blogs/:id", async (req, res) => {

    try {

        const {
            title,
            category,
            content
        } = req.body;


        if (!title || !category || !content) {

            return res.status(400).json({

                message:
                    "Title, category and content are required."

            });

        }


        const updatedBlog =
            await Blog.findByIdAndUpdate(

                req.params.id,

                {
                    title,
                    category,
                    content
                },

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!updatedBlog) {

            return res.status(404).json({

                message:
                    "Blog not found."

            });

        }


        res.json({

            message:
                "Blog updated successfully.",

            blog:
                updatedBlog

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Unable to update blog."

        });

    }

});

// =================================
// DELETE BLOG
// =================================

app.delete("/api/blogs/:id", async (req, res) => {

    try {

        const deletedBlog =
            await Blog.findByIdAndDelete(
                req.params.id
            );


        if (!deletedBlog) {

            return res.status(404).json({

                message:
                    "Blog not found."

            });

        }


        res.json({

            message:
                "Blog deleted successfully."

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Unable to delete blog."

        });

    }

});


// =================================
// START SERVER
// =================================

app.listen(
    PORT,
    () => {

        console.log(
            `Blogify server running at http://localhost:${PORT}`
        );

    }
);