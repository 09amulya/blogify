/* =====================================
   BLOGIFY JAVASCRIPT
===================================== */


/* =====================================
   DEFAULT BLOGS
===================================== */

const defaultBlogs = [

    {
        title: "Getting Started with Web Development",

        category: "Technology",

        content:
            "Learn the fundamentals of HTML, CSS and JavaScript and start your journey as a web developer.",

        author: "Blogify Team",

        date: "18/09/2026",

        views: 120,

        likes: 25
    },


    {
        title: "Why JavaScript is Important",

        category: "Programming",

        content:
            "JavaScript allows developers to create interactive and dynamic experiences on the web.",

        author: "Blogify Team",

        date: "17/09/2026",

        views: 95,

        likes: 18
    },


    {
        title: "How to Build Better Study Habits",

        category: "Education",

        content:
            "Small and consistent improvements can help you create better study habits and become more productive.",

        author: "Blogify Team",

        date: "16/09/2026",

        views: 75,

        likes: 12
    }

];


/* =====================================
   LOAD DEFAULT BLOGS
===================================== */

function initializeBlogs() {

    const blogs = localStorage.getItem("blogs");

    if (!blogs) {

        localStorage.setItem(
            "blogs",
            JSON.stringify(defaultBlogs)
        );

    }

}


initializeBlogs();


/* =====================================
   REGISTER
===================================== */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/register",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    name,
                                    email,
                                    password

                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message
                    );

                    return;

                }


                alert(
                    "Registration successful!"
                );


                window.location.href =
                    "login.html";


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to connect to server."
                );

            }

        }
    );

}

/* =====================================
   LOGIN
===================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/login",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    email,
                                    password

                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message
                    );

                    return;

                }


                // Save logged-in user
                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(
                        data.user
                    )
                );


                alert(
                    "Login successful!"
                );


                window.location.href =
                    "dashboard.html";


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to connect to server."
                );

            }

        }
    );

}


/* =====================================
   LOGOUT
===================================== */

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href =
        "index.html";

}


const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logout
    );

}


const dashboardLogout =
    document.getElementById(
        "dashboardLogout"
    );


if (dashboardLogout) {

    dashboardLogout.addEventListener(
        "click",
        logout
    );

}


// =================================
// CREATE / UPDATE BLOG
// =================================

const blogForm =
    document.getElementById(
        "blogForm"
    );


if (blogForm) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const blogId =
        params.get("id");


    const formTitle =
        document.getElementById(
            "formTitle"
        );


    const submitButton =
        document.getElementById(
            "submitBlogBtn"
        );


    // =========================
    // EDIT MODE
    // =========================

    if (blogId) {

        if (formTitle) {

            formTitle.textContent =
                "Edit Your Blog";

        }


        if (submitButton) {

            submitButton.textContent =
                "Update Blog";

        }


        loadBlogForEditing(
            blogId
        );

    }


    // =========================
    // FORM SUBMIT
    // =========================

    blogForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const title =
                document
                    .getElementById("title")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("category")
                    .value;


            const content =
                document
                    .getElementById("content")
                    .value
                    .trim();


            try {

                let response;


                // =========================
                // UPDATE
                // =========================

                if (blogId) {

                    response =
                        await fetch(
                            `http://localhost:5000/api/blogs/${blogId}`,
                            {

                                method: "PUT",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify({

                                        title,

                                        category,

                                        content

                                    })

                            }
                        );

                }


                // =========================
                // CREATE
                // =========================

                else {

                    const currentUser =
                        JSON.parse(
                            localStorage.getItem(
                                "currentUser"
                            )
                        );


                    const author =
                        currentUser
                            ? currentUser.name
                            : "Anonymous";


                    response =
                        await fetch(
                            "http://localhost:5000/api/blogs",
                            {

                                method: "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify({

                                        title,

                                        category,

                                        content,

                                        author

                                    })

                            }
                        );

                }


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message
                    );

                    return;

                }


                if (blogId) {

                    alert(
                        "Blog updated successfully!"
                    );

                } else {

                    alert(
                        "Blog published successfully!"
                    );

                }


                window.location.href =
                    "dashboard.html";


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to connect to server."
                );

            }

        }
    );

}


// =================================
// LOAD BLOG FOR EDITING
// =================================

async function loadBlogForEditing(blogId) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/blogs/${blogId}`
            );


        const blog =
            await response.json();


        if (!response.ok) {

            alert(
                blog.message
            );

            return;

        }


        document.getElementById(
            "title"
        ).value =
            blog.title;


        document.getElementById(
            "category"
        ).value =
            blog.category;


        document.getElementById(
            "content"
        ).value =
            blog.content;


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load blog."
        );

    }

}

/* =====================================
   DISPLAY BLOGS ON HOME PAGE
===================================== */

async function displayHomeBlogs() {

    const container =
        document.getElementById(
            "blogContainer"
        );


    if (!container) {

        return;

    }


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/blogs"
            );


        const blogs =
            await response.json();


        container.innerHTML = "";


        if (blogs.length === 0) {

            container.innerHTML = `

                <div class="empty-message">

                    <h3>
                        No blogs yet
                    </h3>

                    <p>
                        Be the first person
                        to publish a blog.
                    </p>

                </div>

            `;

            return;

        }


        blogs.forEach(
            function (blog) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "blog-card";


                card.innerHTML = `

                    <span class="blog-category">

                        ${escapeHTML(
                            blog.category
                        )}

                    </span>


                    <h3>

                        ${escapeHTML(
                            blog.title
                        )}

                    </h3>


                    <p>

                        ${escapeHTML(
                            blog.content.substring(
                                0,
                                120
                            )
                        )}...

                    </p>


                    <div class="blog-meta">

                        By
                        ${escapeHTML(
                            blog.author
                        )}

                        ·

                        ${escapeHTML(
                            blog.date
                        )}

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="empty-message">

                <h3>
                    Unable to load blogs
                </h3>

                <p>
                    Please make sure the backend
                    server is running.
                </p>

            </div>

        `;

    }

}


displayHomeBlogs();


/* =====================================
   DASHBOARD
===================================== */


async function loadDashboard() {

    const dashboardContainer =
        document.getElementById(
            "dashboardBlogContainer"
        );


    if (!dashboardContainer) {

        return;

    }


    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    // Display user name

    if (currentUser) {

        const userName =
            document.getElementById(
                "userName"
            );


        if (userName) {

            userName.textContent =
                currentUser.name;

        }

    }


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/blogs"
            );


        const blogs =
            await response.json();


        if (!response.ok) {

            throw new Error(
                blogs.message
            );

        }


        // =========================
        // STATISTICS
        // =========================

        const postCount =
            document.getElementById(
                "postCount"
            );


        const viewCount =
            document.getElementById(
                "viewCount"
            );


        const likeCount =
            document.getElementById(
                "likeCount"
            );


        postCount.textContent =
            blogs.length;


        let totalViews = 0;

        let totalLikes = 0;


        blogs.forEach(
            function (blog) {

                totalViews +=
                    Number(blog.views) || 0;

                totalLikes +=
                    Number(blog.likes) || 0;

            }
        );


        viewCount.textContent =
            totalViews;


        likeCount.textContent =
            totalLikes;


        // =========================
        // DISPLAY BLOGS
        // =========================

        dashboardContainer.innerHTML =
            "";


        if (blogs.length === 0) {

            dashboardContainer.innerHTML = `

                <div class="empty-message">

                    <h3>
                        No blogs yet
                    </h3>

                    <p>
                        Start writing your first blog.
                    </p>

                </div>

            `;

            return;

        }


        blogs.forEach(
            function (blog) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "blog-card dashboard-card";


                card.innerHTML = `

                    <span class="blog-category">

                        ${escapeHTML(
                            blog.category
                        )}

                    </span>


                    <h3>

                        ${escapeHTML(
                            blog.title
                        )}

                    </h3>


                    <p>

                        ${escapeHTML(
                            blog.content.substring(
                                0,
                                120
                            )
                        )}...

                    </p>


                    <div class="blog-meta">

                        By
                        ${escapeHTML(
                            blog.author
                        )}

                        ·

                        ${new Date(
                            blog.createdAt
                        ).toLocaleDateString()}

                    </div>


                    <div class="blog-actions">

                        <button
                            class="edit-btn"
                            onclick="editBlog('${blog._id}')">

                            ✏️ Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteBlog('${blog._id}')">

                            🗑️ Delete

                        </button>

                    </div>

                `;


                dashboardContainer.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(error);

        dashboardContainer.innerHTML = `

            <div class="empty-message">

                <h3>
                    Unable to load blogs
                </h3>

                <p>
                    Make sure your backend
                    server is running.
                </p>

            </div>

        `;

    }

}


// =================================
// DELETE BLOG
// =================================

async function deleteBlog(blogId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/blogs/${blogId}`,
                {

                    method: "DELETE"

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message
            );

            return;

        }


        alert(
            "Blog deleted successfully."
        );


        loadDashboard();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete blog."
        );

    }

}

// =================================
// EDIT BLOG
// =================================

function editBlog(blogId) {

    window.location.href =
        `create-blog.html?id=${blogId}`;

}

/* =====================================
   SECURITY HELPER
===================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}