const courses = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop&auto=format",

        category: "Programming",
        name: "Web Development",
        instructor: "John Smith",

        description:
            "Learn the fundamentals of modern web development, from HTML and CSS to JavaScript and responsive design.",

        lessons: 24,
        duration: "12 hours",
        level: "Beginner",

        rating: 4.8,
        students: 1245,

        progress: 75,

        isPublic: true,

        createdAt: "2026-07-10"
    },

    {
        id: 2,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=480&h=270&fit=crop&auto=format",

        category: "Data",
        name: "Database Fundamentals",
        instructor: "Sarah Lee",

        description:
            "Understand relational databases, SQL queries, database design, and the fundamentals of data management.",

        lessons: 18,
        duration: "8 hours",
        level: "Beginner",

        rating: 4.6,
        students: 892,

        progress: 100,

        isPublic: true,

        createdAt: "2026-06-22"
    },

    {
        id: 3,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=270&fit=crop&auto=format",

        category: "Programming",
        name: "Java Programming",
        instructor: "David Kim",

        description:
            "Build a strong foundation in Java programming, object-oriented programming, and application development.",

        lessons: 30,
        duration: "15 hours",
        level: "Intermediate",

        rating: 4.9,
        students: 2134,

        progress: 30,

        isPublic: false,

        createdAt: "2026-08-01"
    },

    {
        id: 4,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=480&h=270&fit=crop&auto=format",

        category: "Design",
        name: "UI/UX Design",
        instructor: "Emily Chen",

        description:
            "Explore user interface and user experience design principles, wireframing, prototyping, and usability.",

        lessons: 15,
        duration: "7 hours",
        level: "Beginner",

        rating: 4.7,
        students: 1678,

        progress: 0,

        isPublic: true,

        createdAt: "2026-07-28"
    },

    {
        id: 5,
        image: "/images/react.jpg",

        category: "Programming",
        name: "React.js Essentials",
        instructor: "Michael Brown",

        description:
            "Build interactive web applications with React, components, props, state, hooks, and modern patterns.",

        lessons: 28,
        duration: "13 hours",
        level: "Intermediate",

        rating: 4.9,
        students: 3250,

        progress: 0,

        isPublic: true,

        createdAt: "2026-08-12"
    },

    {
        id: 6,
        image: "/images/python.jpg",

        category: "Programming",
        name: "Python for Beginners",
        instructor: "Sophia Wilson",

        description:
            "Start programming with Python by learning syntax, data structures, functions, and problem-solving techniques.",

        lessons: 22,
        duration: "10 hours",
        level: "Beginner",

        rating: 4.5,
        students: 2890,

        progress: 0,

        isPublic: true,

        createdAt: "2026-08-18"
    }
];

export default courses;
