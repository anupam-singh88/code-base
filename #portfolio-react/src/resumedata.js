const yourName = 'Anupam Singh';

export const heroData = {
    name: yourName,
    type: 'MERN Stack Developer',
    // Same substring at the start will only be typed out once, initially
    // wait 1s before replacing "next value" 
    autoText: ['I am a MERN stack developer', 1000, 'I develop website using ReactJS,Nodejs', 1000, 'I am a ReactJS Developer', 1000, 'I am a NodeJS Developer', 1000],
    profileImgPath: "/images/profile.png",
    msg: "Hello! I'm Anupam Singh, a Full-Stack Developer with 3 years of experience building dynamic and scalable web applications. I specialize in backend development using Node.js, NestJS, Express.js, and RESTful API design, with expertise in MongoDB, PostgreSQL, and MySQL.I have extensive experience integrating payment systems like PayPal and Paddle, optimizing performance through Redis and RabbitMQ, and leveraging Docker for deployment. My frontend skills include ReactJS, NextJS, and modern UI frameworks like Ant Design and Shadcn UI. I excel at creating secure, high-performance systems, ensuring seamless user experiences and robust database solutions."
}

// --------------------------------------- Project List
export const ProjectList = [
    {
        img: "images/next-jobportal.png",
        title: "NEXTJS - Job Portal",
        description: "This project is a comprehensive Job Portal built using Next.js. It facilitates seamless interaction between candidates and recruiters, providing features for job applications, candidate management, and social engagement.",
        tech_stack: "NEXTJS, Arcjet,MongoDB",
        github_url: "https://github.com/anupam-singh88/nextjs-job-portal-clerkjs",
        demo_url: "https://nextjs-job-portal-clerkjs.vercel.app/",
    },
    {
        img: "images/next-blog.png",
        title: "Medium Clone - NextJS",
        description: "This project is a Medium clone built using Next.js. It provides features for reading, writing, and sharing articles, as well as following other users and recommending articles.",
        tech_stack: "NEXTJS, Clertk, MongoDB",
        github_url: "https://github.com/anupam-singh88/nextjs-arcjet-blog-arcjet",
        demo_url: "https://nextjs-arcjet-blog-arcjet.vercel.app/",
    },
    {
        img: "images/meri_dukan_pic.png",
        title: "Meri Dukan React Ecommerce",
        description: "Meri Dukan is an e-commerce application built with React.js.",
        tech_stack: "React.js, BrowserAuth",
        github_url: "https://github.com/anupam-singh88/meri-dukan-react-ecommerce",
        demo_url: "https://meri-dukan-react-ecommerce.netlify.app/",
    },
    {
        img: "images/blog-master.png",
        title: "Blog-Master NodeJs",
        description: "Blog-Master is a comprehensive blogging application built with Node.js, EJS, and MongoDB.",
        tech_stack: "Nodejs, EJS, MongoDB",
        github_url: "https://github.com/anupam-singh88/blog_master",
        demo_url: "https://blog-master.onrender.com/",
    },
    {
        img: "images/mern-todo.png",
        title: "MERN Todo App",
        description: "This is a comprehensive application designed to manage your todos effectively and efficiently.",
        tech_stack: "MongoDB,ExpressJs, ReactJs, NodeJS",
        github_url: "https://github.com/anupam-singh88/mern-todo-app",
        demo_url: "https://mern-todo-app-4e58b.web.app/",
    },
    {
        img: "images/newsmaster.png",
        title: "NewsMaster ReactJS",
        description: "NewsMaster is a real-time news website built with React.js. It fetches data from the News API.",
        tech_stack: "ReactJs, HTML/CSS, BOOTSTRAP",
        github_url: "https://github.com/anupam-singh88/newsmaster",
        demo_url: "https://drive.google.com/file/d/1EfXpVOvqacYTp5QmblNHQEIMiz1nI--s/view?usp=sharing",
    },
    {
        img: "images/registration-form-node.png",
        title: "Form in Node.js & MongoDB",
        description: "This is a registration form application built with Node.js, Express, and MongoDB with all validations.",
        tech_stack: "MongoDB, ExpressJs, NodeJS",
        github_url: "https://github.com/anupam-singh88/node-registration-form",
        demo_url: "https://anupam-singh88.github.io/node-registration-form/",
    },
    {
        img: "images/netflix.png",
        title: "Netflix Movie App ",
        description: "This project is a simple movie app created using React.js. It dynamically displays movie posters fetched from a movie database.",
        tech_stack: "ReactJS, Movies API",
        github_url: "https://github.com/anupam-singh88/netflix-movie-app",
        demo_url: "https://netflix-clone-bb923.web.app/",
    },
    {
        img: "images/git-proj.png",
        title: "GitHub Profile Viewer",
        description: " The application uses the GitHub API to dynamically fetch user details  and shows all the followers and repositories of the user.",
        tech_stack: "HTML, CSS, JAVASCRIPT",
        github_url: "https://github.com/anupam-singh88/github_profiles",
        demo_url: "https://anupam-singh88.github.io/github_profiles/",
    },
    {
        img: "images/movie-proj.png",
        title: "Movie App JavaScript",
        description: "The application uses the MovieDB API to dynamically fetch all the movies as entered in the input box and shows all the movies as searched.",
        tech_stack: "HTML, CSS, JAVASCRIPT",
        github_url: "https://github.com/anupam-singh88/movie_app",
        demo_url: "https://anupam-singh88.github.io/movie_app/",
    },

];

// --------------------------------------- Skills

export const stackList = [
    {
        img: "https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/skill/html5.svg",
        name: "HTML",
    },
    {
        img: "https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/skill/css3.svg",
        name: "CSS",
    },
    {
        img: "https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/skill/javascript.svg",
        name: "JavaScript",
    },
    {
        img: "https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/skill/react.svg",
        name: "ReactJS",
    },
    // {
    //   img: "https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/skill/bootstrap.svg",
    //   name: "Bootstrap",
    // },
    {
        img: "images/nodejs.png",
        name: "NodeJS",
    },
    {
        img: "images/mongodb.png",
        name: "MongoDB",
    },
    {
        img: "https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/skill/git.svg",
        name: "Git",
    },
    {
        img: "https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/skill/responsive.svg",
        name: "Responsive",
    },
    {
        img: "images/php.png",
        name: "PHP",
    },
];


export const socialLinks = {
    linkedIn: "https://www.linkedin.com/in/anupam-singh88/",
    github: "https://github.com/anupam-singh88",
    twitter: "https://twitter.com/anupam_singh88",
    emailId: 'anupamsingh2389@gmail.com',
    whatsapp: '7065169819'
}

export const resumePath = {
    rPath: "/uploads/anupam_resume_mern.pdf"
}
