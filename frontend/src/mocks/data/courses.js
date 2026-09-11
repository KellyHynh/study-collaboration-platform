const courses = [
    {
        id: 1,
        thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&auto=format",

        title: "Web Development",
        categoryId: 1,
        category: "Programming",
        level: "Beginner",
        tags: ["Web Development", "JavaScript", "Frontend"],
        isOwner: true,
        description: {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Learn the fundamentals of modern web development, from HTML and CSS to JavaScript and responsive design."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "You will build a strong foundation for creating modern websites and interactive web applications."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "By the end of this course, you will be able to "
                        },
                        {
                            type: "text",
                            marks: [{ type: "bold" }],
                            text: "build responsive web interfaces"
                        },
                        {
                            type: "text",
                            text: " using modern development practices. 🚀"
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Understand the fundamentals of modern web development",
            "Build responsive web interfaces",
            "Work with HTML, CSS, and JavaScript"
        ],

        requirements: [
            "Basic HTML and CSS knowledge",
            "Basic JavaScript knowledge",
            "A computer for practicing the exercises 💻"
        ],

        visibility: "public",
        joinCode: "KNO-7X29Q",

        instructor: {
            ownerId: 101,
            name: "John Smith",
            avatar: "https://i.pravatar.cc/150?img=12",
            students: 5420,
            courses: 8,
            description:
                "Frontend developer and instructor with years of experience building modern web applications."
        },

        lessons: 24,
        duration: "12 hours",
        language: "English",

        rating: 4.8,
        students: 1245,

        progress: 75,

        materials: [
            {
                id: 1,
                name: "Course Notes.pdf",
                type: "pdf",
                size: "2.4 MB",
                url: "#"
            },
            {
                id: 2,
                name: "HTML & CSS Exercises.zip",
                type: "zip",
                size: "8.1 MB",
                url: "#"
            }
        ],

        createdAt: "2026-07-10",
        updatedAt: "2026-07-28"
    },


    {
        id: 2,
        thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop&auto=format",

        title: "Database Fundamentals",
        categoryId: 2,
        category: "Data",
        level: "Beginner",
        tags: ["SQL", "Database"],
        isOwner: false,
        description: {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Understand relational databases, SQL queries, database design, and the fundamentals of data management."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "This course introduces the concepts behind storing, querying, and organizing structured data."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "No prior database experience is required. "
                        },
                        {
                            type: "text",
                            marks: [{ type: "italic" }],
                            text: "Start from the basics and build your knowledge step by step."
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Understand relational database concepts",
            "Write basic SQL queries",
            "Organize structured data effectively"
        ],

        requirements: [],

        visibility: "public",
        joinCode: "KNO-3P8LM",

        instructor: {
            ownerId: 102,
            name: "Sarah Lee",
            avatar: "https://i.pravatar.cc/150?img=47",
            students: 3180,
            courses: 5,
            description:
                "Data engineer and educator specializing in databases, SQL, and data systems."
        },

        lessons: 18,
        duration: "8 hours",
        language: "English",

        rating: 4.6,
        students: 892,

        progress: 100,

        materials: [
            {
                id: 3,
                name: "SQL Cheat Sheet.pdf",
                type: "pdf",
                size: "1.2 MB",
                url: "#"
            }
        ],

        createdAt: "2026-06-22",
        updatedAt: "2026-07-28"
    },


    {
        id: 3,
        thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop&auto=format",

        title: "Java Programming",
        categoryId: 1,
        category: "Programming",
        level: "Intermediate",
        tags: ["Java", "OOP"],
        isOwner: true,
        description: {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: {
                        level: 3
                    },
                    content: [
                        {
                            type: "text",
                            text: "Build a strong Java foundation"
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Build a strong foundation in Java programming, object-oriented programming, and application development."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "You will explore "
                        },
                        {
                            type: "text",
                            marks: [{ type: "bold" }],
                            text: "classes, objects, inheritance"
                        },
                        {
                            type: "text",
                            text: ", and other core OOP concepts."
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Understand core Java syntax and concepts",
            "Apply object-oriented programming principles",
            "Build basic Java applications"
        ],

        requirements: [
            "Basic programming knowledge",
            "Familiarity with fundamental programming concepts"
        ],

        visibility: "private",
        joinCode: "KNO-9F2XR",

        instructor: {
            ownerId: 103,
            name: "David Kim",
            avatar: "https://i.pravatar.cc/150?img=68",
            students: 6240,
            courses: 11,
            description:
                "Software engineer and Java instructor focused on object-oriented programming and application development."
        },

        lessons: 30,
        duration: "15 hours",
        language: "English",

        rating: 4.9,
        students: 2134,

        progress: 30,

        materials: [],

        createdAt: "2026-08-01",
        updatedAt: "2026-07-28"
    },


    {
        id: 4,
        thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop&auto=format",

        title: "UI/UX Design",
        categoryId: 3,
        category: "Design",
        level: "Beginner",
        tags: ["UI", "UX", "Figma"],
        isOwner: true,
        description: {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Explore user interface and user experience design principles, wireframing, prototyping, and usability."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Learn how thoughtful design can turn complex ideas into "
                        },
                        {
                            type: "text",
                            marks: [{ type: "bold" }],
                            text: "simple and intuitive experiences"
                        },
                        {
                            type: "text",
                            text: ". ✨"
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Understand basic UI/UX design principles",
            "Create wireframes and prototypes",
            "Apply usability principles to digital products"
        ],

        requirements: [],

        visibility: "public",
        joinCode: "KNO-5D7QA",

        instructor: {
            ownerId: 104,
            name: "Emily Chen",
            avatar: "https://i.pravatar.cc/150?img=32",
            students: 4720,
            courses: 7,
            description:
                "Product designer specializing in user experience, interface design, and digital product strategy."
        },

        lessons: 15,
        duration: "7 hours",
        language: "Vietnamese",

        rating: 4.7,
        students: 1678,

        progress: null,

        materials: [
            {
                id: 4,
                name: "UX Research Template.fig",
                type: "fig",
                size: "3.5 MB",
                url: "#"
            }
        ],

        createdAt: "2026-07-28",
        updatedAt: "2026-07-28"
    },


    {
        id: 5,
        thumbnailUrl: "/images/react.jpg",

        title: "React.js Essentials",
        categoryId: 1,
        category: "Programming",
        level: "Intermediate",
        tags: ["React", "JavaScript", "Frontend"],

        description: {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: {
                        level: 3
                    },
                    content: [
                        {
                            type: "text",
                            text: "Build modern React applications"
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Build interactive web applications with React, components, props, state, hooks, and modern patterns."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "You will learn how to structure reusable components and manage application state using "
                        },
                        {
                            type: "text",
                            marks: [{ type: "italic" }],
                            text: "modern React patterns"
                        },
                        {
                            type: "text",
                            text: "."
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Build reusable React components",
            "Manage state and props effectively",
            "Use React Hooks in modern applications"
        ],

        requirements: [
            "Basic JavaScript knowledge",
            "Basic HTML and CSS",
            "Familiarity with ES6+ syntax ⚡"
        ],

        visibility: "public",
        joinCode: "KNO-8R4TZ",

        instructor: {
            ownerId: 105,
            name: "Michael Brown",
            avatar: "https://i.pravatar.cc/150?img=13",
            students: 8920,
            courses: 14,
            description:
                "Frontend engineer and educator focused on React, modern JavaScript, and scalable frontend architecture."
        },

        lessons: 28,
        duration: "13 hours",
        language: "English",

        rating: 4.9,
        students: 3250,

        progress: null,

        materials: [
            {
                id: 5,
                name: "React Cheat Sheet.pdf",
                type: "pdf",
                size: "1.8 MB",
                url: "#"
            },
            {
                id: 6,
                name: "Starter Project.zip",
                type: "zip",
                size: "5.4 MB",
                url: "#"
            }
        ],

        createdAt: "2026-08-12",
        updatedAt: "2026-07-28"
    },


    {
        id: 6,
        thumbnailUrl: "/images/python.jpg",

        title: "Python for Beginners",
        categoryId: 1,
        category: "Programming",
        level: "Beginner",
        tags: ["Python"],

        description: {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Start programming with Python by learning syntax, data structures, functions, and problem-solving techniques."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "This course is designed for complete beginners who want a friendly and practical introduction to programming. 🐍"
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Understand Python syntax and basic concepts",
            "Work with data structures and functions",
            "Solve simple programming problems"
        ],

        requirements: [
            "No previous programming experience is required."
        ],

        visibility: "public",
        joinCode: "KNO-2M6VK",

        instructor: {
            ownerId: 106,
            name: "Sophia Wilson",
            avatar: "https://i.pravatar.cc/150?img=44",
            students: 7310,
            courses: 9,
            description:
                "Python developer and educator passionate about helping beginners build strong programming foundations."
        },

        lessons: 22,
        duration: "10 hours",
        language: "Vietnamese",

        rating: 4.5,
        students: 2890,

        progress: 0,

        materials: [],

        createdAt: "2026-08-18",
        updatedAt: "2026-07-28"
    },


    {
        id: 7,
        thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=675&fit=crop&auto=format",

        title: "Software Engineering Principles",
        categoryId: 4,
        category: "Engineering",
        level: "Advanced",
        tags: [],

        description: {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Learn software engineering fundamentals, development methodologies, system design concepts, and engineering best practices."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            marks: [{ type: "bold" }],
                            text: "From planning to delivery,"
                        },
                        {
                            type: "text",
                            text: " explore how professional engineering teams design and build reliable software systems."
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Understand professional software engineering practices",
            "Explore system design fundamentals",
            "Apply structured development methodologies"
        ],

        requirements: [
            "Basic programming experience"
        ],

        visibility: "public",
        joinCode: "KNO-6X3PW",

        instructor: {
            ownerId: 107,
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/150?img=56",
            students: 3810,
            courses: 6,
            description:
                "Senior software engineer with experience in large-scale systems and engineering practices."
        },

        lessons: 20,
        duration: "11 hours",
        language: "English",

        rating: 4.8,
        students: 756,

        progress: null,

        materials: [
            {
                id: 7,
                name: "Engineering Principles.pdf",
                type: "pdf",
                size: "4.2 MB",
                url: "#"
            }
        ],

        createdAt: "2026-08-20",
        updatedAt: "2026-07-28"
    },


    {
        id: 8,
        thumbnailUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=675&fit=crop&auto=format",

        title: "Advanced Design Systems",
        categoryId: 3,
        category: "Design",
        level: "Advanced",
        tags: ["UI", "Design Systems", "Figma"],

        description: {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: {
                        level: 3
                    },
                    content: [
                        {
                            type: "text",
                            text: "Design systems for scalable products"
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Learn how to create scalable design systems, reusable components, design tokens, and consistent product experiences."
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "Create systems that help teams move faster while maintaining "
                        },
                        {
                            type: "text",
                            marks: [{ type: "bold" }],
                            text: "consistency, accessibility, and quality"
                        },
                        {
                            type: "text",
                            text: "."
                        }
                    ]
                }
            ]
        },

        learningOutcomes: [
            "Build scalable design systems",
            "Create reusable design components",
            "Maintain consistency across digital products"
        ],

        requirements: [
            "Intermediate UI design knowledge",
            "Basic Figma experience",
            "Understanding of design principles and components"
        ],

        visibility: "private",
        joinCode: "KNO-4H9ZS",

        instructor: {
            ownerId: 108,
            name: "Olivia Martin",
            avatar: "https://i.pravatar.cc/150?img=49",
            students: 2140,
            courses: 4,
            description:
                "Product designer specializing in scalable design systems and enterprise product experiences."
        },

        lessons: 32,
        duration: "18 hours",
        language: "English",

        rating: 5.0,
        students: 421,

        progress: null,

        materials: [],

        createdAt: "2026-08-25",
        updatedAt: "2026-07-28"
    }
];

export default courses;