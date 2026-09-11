const curriculums = [
    {
        courseId: 1,

        chapters: [
            {
                id: 101,
                title: "Introduction to Web Development",

                lessons: [
                    {
                        id: 1001,
                        title: "Welcome to the Course",
                        type: "video",
                        durationSeconds: 500,
                        isPreview: true
                    },
                    {
                        id: 1002,
                        title: "How the Web Works",
                        type: "video",
                        durationSeconds: 875,
                        isPreview: false
                    },
                    {
                        id: 1003,
                        title: "Setting Up Your Environment",
                        type: "reading",
                        durationSeconds: 730,
                        isPreview: false
                    },
                    {
                        id: 1008,
                        title: "Introduction Quiz",
                        type: "quiz",
                        durationSeconds: 600,
                        isPreview: false
                    }
                ]
            },

            {
                id: 102,
                title: "HTML and CSS Fundamentals",

                lessons: [
                    {
                        id: 1004,
                        title: "HTML Structure",
                        type: "video",
                        durationSeconds: 1120,
                        isPreview: false
                    },
                    {
                        id: 1005,
                        title: "CSS Basics",
                        type: "video",
                        durationSeconds: 1275,
                        isPreview: false
                    },
                    {
                        id: 1006,
                        title: "Responsive Design",
                        type: "reading",
                        durationSeconds: 1530,
                        isPreview: false
                    },
                    {
                        id: 1007,
                        title: "CSS Fundamentals Quiz",
                        type: "quiz",
                        durationSeconds: 600,
                        isPreview: false
                    },
                    {
                        id: 1009,
                        title: "HTML & CSS Reference",
                        type: "reading",
                        durationSeconds: 900,
                        isPreview: false
                    }
                ]
            },

            {
                id: 103,
                title: "JavaScript Fundamentals",

                lessons: [
                    {
                        id: 1010,
                        title: "Introduction to JavaScript",
                        type: "video",
                        durationSeconds: 980,
                        isPreview: false
                    },
                    {
                        id: 1011,
                        title: "Variables and Data Types",
                        type: "reading",
                        durationSeconds: 1090,
                        isPreview: false
                    },
                    {
                        id: 1012,
                        title: "JavaScript Basics Podcast",
                        type: "reading",
                        durationSeconds: 765,
                        isPreview: false
                    },
                    {
                        id: 1013,
                        title: "JavaScript Fundamentals Quiz",
                        type: "quiz",
                        durationSeconds: 900,
                        isPreview: false
                    }
                ]
            }
        ]
    },

    {
        courseId: 2,

        chapters: [
            {
                id: 201,
                title: "Database Basics",

                lessons: [
                    {
                        id: 2001,
                        title: "What Is a Database?",
                        type: "video",
                        durationSeconds: 620,
                        isPreview: true
                    },
                    {
                        id: 2002,
                        title: "Relational Database Concepts",
                        type: "reading",
                        durationSeconds: 1000,
                        isPreview: false
                    },
                    {
                        id: 2005,
                        title: "Database Concepts Quiz",
                        type: "quiz",
                        durationSeconds: 720,
                        isPreview: false
                    }
                ]
            },

            {
                id: 202,
                title: "SQL Fundamentals",

                lessons: [
                    {
                        id: 2003,
                        title: "SELECT Queries",
                        type: "video",
                        durationSeconds: 1090,
                        isPreview: false
                    },
                    {
                        id: 2004,
                        title: "Filtering and Sorting",
                        type: "video",
                        durationSeconds: 945,
                        isPreview: false
                    },
                    {
                        id: 2006,
                        title: "SQL Cheat Sheet",
                        type: "reading",
                        durationSeconds: 600,
                        isPreview: false
                    }
                ]
            }
        ]
    },

    {
        courseId: 3,

        chapters: [
            {
                id: 301,
                title: "Java Fundamentals",

                lessons: [
                    {
                        id: 3001,
                        title: "Introduction to Java",
                        type: "video",
                        durationSeconds: 685,
                        isPreview: false
                    },
                    {
                        id: 3002,
                        title: "Variables and Data Types",
                        type: "reading",
                        durationSeconds: 1050,
                        isPreview: false
                    },
                    {
                        id: 3005,
                        title: "Java Basics Audio Lesson",
                        type: "reading",
                        durationSeconds: 580,
                        isPreview: false
                    }
                ]
            },

            {
                id: 302,
                title: "Object-Oriented Programming",

                lessons: [
                    {
                        id: 3003,
                        title: "Classes and Objects",
                        type: "video",
                        durationSeconds: 1335,
                        isPreview: false
                    },
                    {
                        id: 3004,
                        title: "Inheritance",
                        type: "video",
                        durationSeconds: 1180,
                        isPreview: false
                    },
                    {
                        id: 3006,
                        title: "OOP Practice Quiz",
                        type: "quiz",
                        durationSeconds: 900,
                        isPreview: false
                    }
                ]
            }
        ]
    },

    {
        courseId: 4,

        chapters: [
            {
                id: 401,
                title: "UX Fundamentals",

                lessons: [
                    {
                        id: 4001,
                        title: "Introduction to UX",
                        type: "video",
                        durationSeconds: 740,
                        isPreview: true
                    },
                    {
                        id: 4002,
                        title: "Understanding Users",
                        type: "video",
                        durationSeconds: 1125,
                        isPreview: false
                    },
                    {
                        id: 4003,
                        title: "UX Research Reading",
                        type: "reading",
                        durationSeconds: 860,
                        isPreview: false
                    }
                ]
            },

            {
                id: 402,
                title: "Wireframing and Prototyping",

                lessons: [
                    {
                        id: 4004,
                        title: "Wireframing Basics",
                        type: "video",
                        durationSeconds: 1210,
                        isPreview: false
                    },
                    {
                        id: 4005,
                        title: "Prototype Walkthrough",
                        type: "video",
                        durationSeconds: 1350,
                        isPreview: false
                    },
                    {
                        id: 4006,
                        title: "UX Fundamentals Quiz",
                        type: "quiz",
                        durationSeconds: 720,
                        isPreview: false
                    }
                ]
            }
        ]
    },

    {
        courseId: 5,

        chapters: [
            {
                id: 501,
                title: "React Fundamentals",

                lessons: [
                    {
                        id: 5001,
                        title: "Introduction to React",
                        type: "video",
                        durationSeconds: 800,
                        isPreview: true
                    },
                    {
                        id: 5002,
                        title: "Components and JSX",
                        type: "video",
                        durationSeconds: 1210,
                        isPreview: false
                    },
                    {
                        id: 5003,
                        title: "Props and State",
                        type: "reading",
                        durationSeconds: 1475,
                        isPreview: false
                    }
                ]
            },

            {
                id: 502,
                title: "React Hooks",

                lessons: [
                    {
                        id: 5004,
                        title: "useState",
                        type: "video",
                        durationSeconds: 1120,
                        isPreview: false
                    },
                    {
                        id: 5005,
                        title: "useEffect",
                        type: "video",
                        durationSeconds: 1335,
                        isPreview: false
                    },
                    {
                        id: 5006,
                        title: "React Hooks Quiz",
                        type: "quiz",
                        durationSeconds: 900,
                        isPreview: false
                    },
                    {
                        id: 5007,
                        title: "React Reference Guide",
                        type: "reading",
                        durationSeconds: 720,
                        isPreview: false
                    }
                ]
            }
        ]
    },

    {
        courseId: 6,

        chapters: [
            {
                id: 601,
                title: "Python Basics",

                lessons: [
                    {
                        id: 6001,
                        title: "Getting Started with Python",
                        type: "video",
                        durationSeconds: 630,
                        isPreview: true
                    },
                    {
                        id: 6002,
                        title: "Variables and Data Types",
                        type: "reading",
                        durationSeconds: 920,
                        isPreview: false
                    },
                    {
                        id: 6003,
                        title: "Python Basics Audio",
                        type: "reading",
                        durationSeconds: 675,
                        isPreview: false
                    }
                ]
            },

            {
                id: 602,
                title: "Functions and Data Structures",

                lessons: [
                    {
                        id: 6004,
                        title: "Functions",
                        type: "video",
                        durationSeconds: 1105,
                        isPreview: false
                    },
                    {
                        id: 6005,
                        title: "Lists and Dictionaries",
                        type: "video",
                        durationSeconds: 1240,
                        isPreview: false
                    },
                    {
                        id: 6006,
                        title: "Python Practice Quiz",
                        type: "quiz",
                        durationSeconds: 900,
                        isPreview: false
                    }
                ]
            }
        ]
    },

    {
        courseId: 7,

        chapters: [
            {
                id: 701,
                title: "Engineering Fundamentals",

                lessons: [
                    {
                        id: 7001,
                        title: "What Is Software Engineering?",
                        type: "video",
                        durationSeconds: 790,
                        isPreview: true
                    },
                    {
                        id: 7002,
                        title: "Development Methodologies",
                        type: "reading",
                        durationSeconds: 720,
                        isPreview: false
                    },
                    {
                        id: 7003,
                        title: "Engineering Principles",
                        type: "reading",
                        durationSeconds: 1200,
                        isPreview: false
                    }
                ]
            },

            {
                id: 702,
                title: "System Design",

                lessons: [
                    {
                        id: 7004,
                        title: "System Design Fundamentals",
                        type: "video",
                        durationSeconds: 1460,
                        isPreview: false
                    },
                    {
                        id: 7005,
                        title: "Architecture Patterns",
                        type: "video",
                        durationSeconds: 1300,
                        isPreview: false
                    },
                    {
                        id: 7006,
                        title: "System Design Quiz",
                        type: "quiz",
                        durationSeconds: 900,
                        isPreview: false
                    }
                ]
            }
        ]
    },

    {
        courseId: 8,

        chapters: [
            {
                id: 801,
                title: "Design System Foundations",

                lessons: [
                    {
                        id: 8001,
                        title: "What Is a Design System?",
                        type: "video",
                        durationSeconds: 980,
                        isPreview: false
                    },
                    {
                        id: 8002,
                        title: "Design Tokens",
                        type: "reading",
                        durationSeconds: 900,
                        isPreview: false
                    },
                    {
                        id: 8003,
                        title: "Design Systems Audio Guide",
                        type: "reading",
                        durationSeconds: 750,
                        isPreview: false
                    },
                    {
                        id: 8004,
                        title: "Design System Documentation",
                        type: "reading",
                        durationSeconds: 1080,
                        isPreview: false
                    },
                    {
                        id: 8005,
                        title: "Design System Foundations Quiz",
                        type: "quiz",
                        durationSeconds: 900,
                        isPreview: false
                    }
                ]
            },

            {
                id: 802,
                title: "Reusable Components",

                lessons: [
                    {
                        id: 8006,
                        title: "Component Architecture",
                        type: "video",
                        durationSeconds: 1230,
                        isPreview: false
                    },
                    {
                        id: 8007,
                        title: "Component Variants",
                        type: "reading",
                        durationSeconds: 1065,
                        isPreview: false
                    },
                    {
                        id: 8008,
                        title: "Component Library Walkthrough",
                        type: "video",
                        durationSeconds: 1330,
                        isPreview: false
                    },
                    {
                        id: 8009,
                        title: "Reusable Components Quiz",
                        type: "quiz",
                        durationSeconds: 720,
                        isPreview: false
                    }
                ]
            },

            {
                id: 803,
                title: "Design Tokens and Accessibility",

                lessons: [
                    {
                        id: 8010,
                        title: "Advanced Design Tokens",
                        type: "video",
                        durationSeconds: 1160,
                        isPreview: false
                    },
                    {
                        id: 8011,
                        title: "Accessibility Guidelines",
                        type: "reading",
                        durationSeconds: 960,
                        isPreview: false
                    },
                    {
                        id: 8012,
                        title: "Accessibility Audio Lesson",
                        type: "reading",
                        durationSeconds: 850,
                        isPreview: false
                    },
                    {
                        id: 8013,
                        title: "Final Design Systems Quiz",
                        type: "quiz",
                        durationSeconds: 1200,
                        isPreview: false
                    }
                ]
            }
        ]
    }
];

export default curriculums;