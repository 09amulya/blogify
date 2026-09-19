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
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();


            const email =
                document.getElementById("email").value.trim();


            const password =
                document.getElementById("password").value;


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            alert(
                "Registration successful! Please login."
            );


            window.location.href =
                "login.html";

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
        function (event) {

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


            const storedUser =
                JSON.parse(
                    localStorage.getItem("user")
                );


            if (!storedUser) {

                alert(
                    "No account found. Please register first."
                );

                return;

            }


            if (
                storedUser.email === email &&
                storedUser.password === password
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                alert(
                    "Login successful!"
                );


                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    "Invalid email or password."
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


/* =====================================
   CREATE BLOG
===================================== */

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        function (event) {

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


            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );


            let author = "Anonymous";


            if (user) {

                author = user.name;

            }


            const newBlog = {

                title: title,

                category: category,

                content: content,

                author: author,

                date:
                    new Date()
                        .toLocaleDateString(),

                views: 0,

                likes: 0

            };


            let blogs =
                JSON.parse(
                    localStorage.getItem("blogs")
                ) || [];


            blogs.unshift(newBlog);


            localStorage.setItem(
                "blogs",
                JSON.stringify(blogs)
            );


            alert(
                "Your blog has been published!"
            );


            window.location.href =
                "dashboard.html";

        }
    );

}


/* =====================================
   DISPLAY BLOGS ON HOME PAGE
===================================== */

function displayHomeBlogs() {

    const container =
        document.getElementById(
            "blogContainer"
        );


    if (!container) {

        return;

    }


    const blogs =
        JSON.parse(
            localStorage.getItem("blogs")
        ) || [];


    container.innerHTML = "";


    if (blogs.length === 0) {

        container.innerHTML = `
            <div class="empty-message">
                <h3>No blogs yet</h3>
                <p>Be the first person to publish a blog.</p>
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
                    ${escapeHTML(blog.category)}
                </span>

                <h3>
                    ${escapeHTML(blog.title)}
                </h3>

                <p>
                    ${escapeHTML(
                        blog.content.substring(0, 120)
                    )}...
                </p>

                <div class="blog-meta">
                    By ${escapeHTML(blog.author)}
                    · ${escapeHTML(blog.date)}
                </div>

            `;


            container.appendChild(card);

        }
    );

}


displayHomeBlogs();


/* =====================================
   DASHBOARD
===================================== */

function loadDashboard() {

    const dashboardContainer =
        document.getElementById(
            "dashboardBlogContainer"
        );


    if (!dashboardContainer) {

        return;

    }


    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (user) {

        const userName =
            document.getElementById(
                "userName"
            );


        if (userName) {

            userName.textContent =
                user.name;

        }

    }


    const blogs =
        JSON.parse(
            localStorage.getItem("blogs")
        ) || [];


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


    if (postCount) {

        postCount.textContent =
            blogs.length;

    }


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


    if (viewCount) {

        viewCount.textContent =
            totalViews;

    }


    if (likeCount) {

        likeCount.textContent =
            totalLikes;

    }


    dashboardContainer.innerHTML = "";


    if (blogs.length === 0) {

        dashboardContainer.innerHTML = `

            <div class="empty-message">

                <h3>
                    You haven't created any blogs yet.
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
                "blog-card";


            card.innerHTML = `

                <span class="blog-category">
                    ${escapeHTML(blog.category)}
                </span>

                <h3>
                    ${escapeHTML(blog.title)}
                </h3>

                <p>
                    ${escapeHTML(blog.content.substring(0, 120))}
                    ...
                </p>

                <div class="blog-meta">

                    ${escapeHTML(blog.date)}
                    · ${blog.views} views
                    · ${blog.likes} likes

                </div>

            `;


            dashboardContainer.appendChild(
                card
            );

        }
    );

}


loadDashboard();


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