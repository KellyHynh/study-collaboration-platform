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
                        duration: "08:20",
                        isPreview: true
                    },
                    {
                        id: 1002,
                        title: "How the Web Works",
                        type: "video",
                        duration: "14:35",
                        isPreview: false
                    },
                    {
                        id: 1003,
                        title: "Setting Up Your Environment",
                        type: "reading",
                        duration: "12:10",
                        isPreview: false
                    },
                    {
                        id: 1008,
                        title: "Introduction Quiz",
                        type: "quiz",
                        duration: "10:00",
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
                        duration: "18:40",
                        isPreview: false
                    },
                    {
                        id: 1005,
                        title: "CSS Basics",
                        type: "video",
                        duration: "21:15",
                        isPreview: false
                    },
                    {
                        id: 1006,
                        title: "Responsive Design",
                        type: "reading",
                        duration: "25:30",
                        isPreview: false
                    },
                    {
                        id: 1007,
                        title: "CSS Fundamentals Quiz",
                        type: "quiz",
                        duration: "10:00",
                        isPreview: false
                    },
                    {
                        id: 1009,
                        title: "HTML & CSS Reference",
                        type: "reading",
                        duration: "15:00",
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
                        duration: "16:20",
                        isPreview: false
                    },
                    {
                        id: 1011,
                        title: "Variables and Data Types",
                        type: "reading",
                        duration: "18:10",
                        isPreview: false
                    },
                    {
                        id: 1012,
                        title: "JavaScript Basics Podcast",
                        type: "reading",
                        duration: "12:45",
                        isPreview: false
                    },
                    {
                        id: 1013,
                        title: "JavaScript Fundamentals Quiz",
                        type: "quiz",
                        duration: "15:00",
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
                        duration: "10:20",
                        isPreview: true
                    },
                    {
                        id: 2002,
                        title: "Relational Database Concepts",
                        type: "reading",
                        duration: "16:40",
                        isPreview: false
                    },
                    {
                        id: 2005,
                        title: "Database Concepts Quiz",
                        type: "quiz",
                        duration: "12:00",
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
                        duration: "18:10",
                        isPreview: false
                    },
                    {
                        id: 2004,
                        title: "Filtering and Sorting",
                        type: "video",
                        duration: "15:45",
                        isPreview: false
                    },
                    {
                        id: 2006,
                        title: "SQL Cheat Sheet",
                        type: "reading",
                        duration: "10:00",
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
                        duration: "11:25",
                        isPreview: false
                    },
                    {
                        id: 3002,
                        title: "Variables and Data Types",
                        type: "reading",
                        duration: "17:30",
                        isPreview: false
                    },
                    {
                        id: 3005,
                        title: "Java Basics Audio Lesson",
                        type: "reading",
                        duration: "09:40",
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
                        duration: "22:15",
                        isPreview: false
                    },
                    {
                        id: 3004,
                        title: "Inheritance",
                        type: "video",
                        duration: "19:40",
                        isPreview: false
                    },
                    {
                        id: 3006,
                        title: "OOP Practice Quiz",
                        type: "quiz",
                        duration: "15:00",
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
                        duration: "12:20",
                        isPreview: true
                    },
                    {
                        id: 4002,
                        title: "Understanding Users",
                        type: "video",
                        duration: "18:45",
                        isPreview: false
                    },
                    {
                        id: 4003,
                        title: "UX Research Reading",
                        type: "reading",
                        duration: "14:20",
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
                        duration: "20:10",
                        isPreview: false
                    },
                    {
                        id: 4005,
                        title: "Prototype Walkthrough",
                        type: "video",
                        duration: "22:30",
                        isPreview: false
                    },
                    {
                        id: 4006,
                        title: "UX Fundamentals Quiz",
                        type: "quiz",
                        duration: "12:00",
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
                        duration: "13:20",
                        isPreview: true
                    },
                    {
                        id: 5002,
                        title: "Components and JSX",
                        type: "video",
                        duration: "20:10",
                        isPreview: false
                    },
                    {
                        id: 5003,
                        title: "Props and State",
                        type: "reading",
                        duration: "24:35",
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
                        duration: "18:40",
                        isPreview: false
                    },
                    {
                        id: 5005,
                        title: "useEffect",
                        type: "video",
                        duration: "22:15",
                        isPreview: false
                    },
                    {
                        id: 5006,
                        title: "React Hooks Quiz",
                        type: "quiz",
                        duration: "15:00",
                        isPreview: false
                    },
                    {
                        id: 5007,
                        title: "React Reference Guide",
                        type: "reading",
                        duration: "12:00",
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
                        duration: "10:30",
                        isPreview: true
                    },
                    {
                        id: 6002,
                        title: "Variables and Data Types",
                        type: "reading",
                        duration: "15:20",
                        isPreview: false
                    },
                    {
                        id: 6003,
                        title: "Python Basics Audio",
                        type: "reading",
                        duration: "11:15",
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
                        duration: "18:25",
                        isPreview: false
                    },
                    {
                        id: 6005,
                        title: "Lists and Dictionaries",
                        type: "video",
                        duration: "20:40",
                        isPreview: false
                    },
                    {
                        id: 6006,
                        title: "Python Practice Quiz",
                        type: "quiz",
                        duration: "15:00",
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
                        duration: "13:10",
                        isPreview: true
                    },
                    {
                        id: 7002,
                        title: "Development Methodologies",
                        type: "reading",
                        duration: "12:00",
                        isPreview: false
                    },
                    {
                        id: 7003,
                        title: "Engineering Principles",
                        type: "reading",
                        duration: "20:00",
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
                        duration: "24:20",
                        isPreview: false
                    },
                    {
                        id: 7005,
                        title: "Architecture Patterns",
                        type: "video",
                        duration: "21:40",
                        isPreview: false
                    },
                    {
                        id: 7006,
                        title: "System Design Quiz",
                        type: "quiz",
                        duration: "15:00",
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
                        duration: "16:20",
                        isPreview: false
                    },
                    {
                        id: 8002,
                        title: "Design Tokens",
                        type: "reading",
                        duration: "15:00",
                        isPreview: false
                    },
                    {
                        id: 8003,
                        title: "Design Systems Audio Guide",
                        type: "reading",
                        duration: "12:30",
                        isPreview: false
                    },
                    {
                        id: 8004,
                        title: "Design System Documentation",
                        type: "reading",
                        duration: "18:00",
                        isPreview: false
                    },
                    {
                        id: 8005,
                        title: "Design System Foundations Quiz",
                        type: "quiz",
                        duration: "15:00",
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
                        duration: "20:30",
                        isPreview: false
                    },
                    {
                        id: 8007,
                        title: "Component Variants",
                        type: "reading",
                        duration: "17:45",
                        isPreview: false
                    },
                    {
                        id: 8008,
                        title: "Component Library Walkthrough",
                        type: "video",
                        duration: "22:10",
                        isPreview: false
                    },
                    {
                        id: 8009,
                        title: "Reusable Components Quiz",
                        type: "quiz",
                        duration: "12:00",
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
                        duration: "19:20",
                        isPreview: false
                    },
                    {
                        id: 8011,
                        title: "Accessibility Guidelines",
                        type: "reading",
                        duration: "16:00",
                        isPreview: false
                    },
                    {
                        id: 8012,
                        title: "Accessibility Audio Lesson",
                        type: "reading",
                        duration: "14:10",
                        isPreview: false
                    },
                    {
                        id: 8013,
                        title: "Final Design Systems Quiz",
                        type: "quiz",
                        duration: "20:00",
                        isPreview: false
                    }
                ]
            }
        ]
    }
];

export default curriculums;