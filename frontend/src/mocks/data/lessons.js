
const lessons = [
    // =========================================================
    // COURSE 1
    // =========================================================

    {
        id: 1001,
        courseId: 1,
        chapterId: 101,

        title: "Welcome to the Course",
        type: "video",
        duration: "08:20",
        isPreview: true,

        lock: {
            enabled: false,
            type: "none",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 1002,
        courseId: 1,
        chapterId: 101,

        title: "How the Web Works",
        type: "video",
        duration: "14:35",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 1003,
        courseId: 1,
        chapterId: 101,

        title: "Setting Up Your Environment",
        type: "reading",
        duration: "12:10",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "Setting Up Your Environment",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Before starting the exercises, prepare a development environment with a modern browser and a code editor.",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Make sure your environment is ready before moving to the next lesson.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 1004,
        courseId: 1,
        chapterId: 101,

        title: "Introduction Quiz",
        type: "quiz",
        duration: "10:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            questions: [
                {
                    id: 1,
                    order: 1,
                    type: "multiple-choice",

                    question:
                        "Which technology is primarily used to structure the content of a web page?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "HTML",
                        },
                        {
                            id: "b",
                            text: "CSS",
                        },
                        {
                            id: "c",
                            text: "JavaScript",
                        },
                        {
                            id: "d",
                            text: "SQL",
                        },
                    ],

                    correctAnswer: "a",
                },

                {
                    id: 2,
                    order: 2,
                    type: "multiple-choice",

                    question:
                        "Which language is commonly used to style web pages?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "HTML",
                        },
                        {
                            id: "b",
                            text: "CSS",
                        },
                        {
                            id: "c",
                            text: "JavaScript",
                        },
                        {
                            id: "d",
                            text: "Python",
                        },
                    ],

                    correctAnswer: "b",
                },

                {
                    id: 3,
                    order: 3,
                    type: "essay",

                    question:
                        "Explain briefly what happens when a user enters a website address in a browser.",

                    image: null,
                },
            ],
        },
    },


    // =========================================================
    // COURSE 2
    // =========================================================

    {
        id: 2001,
        courseId: 2,
        chapterId: 201,

        title: "Variables and Data Types",
        type: "video",
        duration: "15:20",
        isPreview: true,

        lock: {
            enabled: false,
            type: "none",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 2002,
        courseId: 2,
        chapterId: 201,

        title: "Functions",
        type: "reading",
        duration: "13:45",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "JavaScript Functions",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Functions allow developers to group reusable pieces of logic.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 2003,
        courseId: 2,
        chapterId: 201,

        title: "JavaScript Basics Quiz",
        type: "quiz",
        duration: "10:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            questions: [
                {
                    id: 1,
                    order: 1,
                    type: "multiple-choice",

                    question:
                        "Which keyword can be used to declare a variable in JavaScript?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "let",
                        },
                        {
                            id: "b",
                            text: "style",
                        },
                        {
                            id: "c",
                            text: "define",
                        },
                        {
                            id: "d",
                            text: "variable",
                        },
                    ],

                    correctAnswer: "a",
                },

                {
                    id: 2,
                    order: 2,
                    type: "essay",

                    question:
                        "What is the purpose of a function in JavaScript?",

                    image: null,
                },
            ],
        },
    },


    // =========================================================
    // COURSE 3
    // =========================================================

    {
        id: 3001,
        courseId: 3,
        chapterId: 301,

        title: "What Is React?",
        type: "video",
        duration: "12:40",
        isPreview: true,

        lock: {
            enabled: false,
            type: "none",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 3002,
        courseId: 3,
        chapterId: 301,

        title: "Components and Props",
        type: "video",
        duration: "21:15",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 3003,
        courseId: 3,
        chapterId: 301,

        title: "React Components Reading",
        type: "reading",
        duration: "14:20",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "React Components",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Components are reusable building blocks for React applications.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 3006,
        courseId: 3,
        chapterId: 302,

        title: "React Fundamentals Quiz",
        type: "quiz",
        duration: "15:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            questions: [
                {
                    id: 1,
                    order: 1,
                    type: "multiple-choice",

                    question:
                        "What is a React component?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "A reusable UI building block",
                        },
                        {
                            id: "b",
                            text: "A database",
                        },
                        {
                            id: "c",
                            text: "A CSS file",
                        },
                        {
                            id: "d",
                            text: "A server",
                        },
                    ],

                    correctAnswer: "a",
                },

                {
                    id: 2,
                    order: 2,
                    type: "essay",

                    question:
                        "Explain why reusable components are useful.",

                    image: null,
                },
            ],
        },
    },


    // =========================================================
    // COURSE 8
    // =========================================================

    {
        id: 8001,
        courseId: 8,
        chapterId: 801,

        title: "What Is a Design System?",
        type: "video",
        duration: "16:20",
        isPreview: true,

        lock: {
            enabled: false,
            type: "none",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 8002,
        courseId: 8,
        chapterId: 801,

        title: "Design Tokens",
        type: "reading",
        duration: "15:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "Design Tokens",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Design tokens store reusable visual decisions such as colors, spacing, typography, and sizing.",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "They help design and engineering teams maintain consistency across products.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 8003,
        courseId: 8,
        chapterId: 801,

        title: "Component Foundations",
        type: "video",
        duration: "21:30",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 8004,
        courseId: 8,
        chapterId: 801,

        title: "Foundations Quiz",
        type: "quiz",
        duration: "12:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            questions: [
                {
                    id: 1,
                    order: 1,
                    type: "multiple-choice",

                    question:
                        "What is one purpose of a design system?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "Maintain consistency",
                        },
                        {
                            id: "b",
                            text: "Replace all developers",
                        },
                        {
                            id: "c",
                            text: "Store customer passwords",
                        },
                        {
                            id: "d",
                            text: "Manage databases",
                        },
                    ],

                    correctAnswer: "a",
                },

                {
                    id: 2,
                    order: 2,
                    type: "multiple-choice",

                    question:
                        "Which is commonly represented as a design token?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "Color",
                        },
                        {
                            id: "b",
                            text: "User password",
                        },
                        {
                            id: "c",
                            text: "Database row",
                        },
                        {
                            id: "d",
                            text: "Server log",
                        },
                    ],

                    correctAnswer: "a",
                },

                {
                    id: 3,
                    order: 3,
                    type: "essay",

                    question:
                        "Explain how design tokens can help maintain consistency.",

                    image: null,
                },
            ],
        },
    },

    {
        id: 8005,
        courseId: 8,
        chapterId: 801,

        title: "Design System Reference",
        type: "reading",
        duration: "18:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "Design System Reference",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Use this reference when working with the course design system exercises.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 8006,
        courseId: 8,
        chapterId: 802,

        title: "Building Reusable Components",
        type: "video",
        duration: "24:20",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 8007,
        courseId: 8,
        chapterId: 802,

        title: "Component Documentation",
        type: "reading",
        duration: "17:30",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "Component Documentation",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Good documentation makes reusable components easier to discover, understand, and maintain.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 8008,
        courseId: 8,
        chapterId: 802,

        title: "Component Review Quiz",
        type: "quiz",
        duration: "15:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            questions: [
                {
                    id: 1,
                    order: 1,
                    type: "multiple-choice",

                    question:
                        "What makes a component reusable?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "It can be used in multiple contexts",
                        },
                        {
                            id: "b",
                            text: "It only works once",
                        },
                        {
                            id: "c",
                            text: "It cannot accept changes",
                        },
                        {
                            id: "d",
                            text: "It must contain a database",
                        },
                    ],

                    correctAnswer: "a",
                },

                {
                    id: 2,
                    order: 2,
                    type: "essay",

                    question:
                        "Describe one benefit of documenting reusable components.",

                    image: null,
                },
            ],
        },
    },

    {
        id: 8009,
        courseId: 8,
        chapterId: 802,

        title: "Design Review Audio",
        type: "reading",
        duration: "10:20",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Design review notes and discussion material.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 8010,
        courseId: 8,
        chapterId: 803,

        title: "Accessibility Principles",
        type: "video",
        duration: "19:40",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            videoUrl:
                "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
    },

    {
        id: 8011,
        courseId: 8,
        chapterId: 803,

        title: "Accessible Components",
        type: "reading",
        duration: "16:10",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "Accessible Components",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Accessible components help people with different abilities interact with digital products.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 8012,
        courseId: 8,
        chapterId: 803,

        title: "Accessibility Checklist",
        type: "reading",
        duration: "12:30",
        isPreview: false,

        lock: {
            enabled: true,
            type: "enrollment",
        },

        content: {
            format: "rich-text",

            body: {
                type: "doc",

                content: [
                    {
                        type: "heading",
                        attrs: {
                            level: 2,
                        },
                        content: [
                            {
                                type: "text",
                                text: "Accessibility Checklist",
                            },
                        ],
                    },

                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Use this checklist to review common accessibility considerations before publishing a component.",
                            },
                        ],
                    },
                ],
            },
        },
    },

    {
        id: 8013,
        courseId: 8,
        chapterId: 803,

        title: "Accessibility Quiz",
        type: "quiz",
        duration: "14:00",
        isPreview: false,

        lock: {
            enabled: true,
            type: "sequential",
        },

        content: {
            questions: [
                {
                    id: 1,
                    order: 1,
                    type: "multiple-choice",

                    question:
                        "Which practice improves accessibility?",

                    image: null,

                    options: [
                        {
                            id: "a",
                            text: "Providing meaningful labels",
                        },
                        {
                            id: "b",
                            text: "Removing keyboard support",
                        },
                        {
                            id: "c",
                            text: "Using unreadable text",
                        },
                        {
                            id: "d",
                            text: "Hiding important information",
                        },
                    ],

                    correctAnswer: "a",
                },

                {
                    id: 2,
                    order: 2,
                    type: "essay",

                    question:
                        "Why is keyboard accessibility important?",

                    image: null,
                },
            ],
        },
    },
];

export default lessons;
