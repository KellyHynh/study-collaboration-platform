
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
        durationSeconds: 500,
        isPreview: true,

        lock: {
            enabled: false,
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
        durationSeconds: 875,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 730,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 600,
        isPreview: false,

        lock: {
            enabled: true,
        },

        content: {
            questions: [
                {
                    id: 1,
                    position: 1,
                    type: "multiple-choice",

                    question:
                        "Which technology is primarily used to structure the content of a web page?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            isCorrect: false,
                            text: "HTML",
                        },
                        {
                            optionKey: "B",
                            isCorrect: false,
                            text: "CSS",
                        },
                        {
                            optionKey: "C",
                            isCorrect: false,
                            text: "JavaScript",
                        },
                        {
                            optionKey: "D",
                            isCorrect: false,
                            text: "SQL",
                        },
                    ],

                },

                {
                    id: 2,
                    position: 2,
                    type: "multiple-choice",

                    question:
                        "Which language is commonly used to style web pages?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            isCorrect: false,
                            text: "HTML",
                        },
                        {
                            optionKey: "B",
                            isCorrect: false,
                            text: "CSS",
                        },
                        {
                            optionKey: "C",
                            isCorrect: false,
                            text: "JavaScript",
                        },
                        {
                            optionKey: "D",
                            isCorrect: false,
                            text: "Python",
                        },
                    ],

                },

                {
                    id: 3,
                    position: 3,
                    type: "essay",

                    question:
                        "Explain briefly what happens when a user enters a website address in a browser.",

                    imageUrl: null,
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
        durationSeconds: 920,
        isPreview: true,

        lock: {
            enabled: false,
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
        durationSeconds: 825,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 600,
        isPreview: false,

        lock: {
            enabled: true,
        },

        content: {
            questions: [
                {
                    id: 1,
                    position: 1,
                    type: "multiple-choice",

                    question:
                        "Which keyword can be used to declare a variable in JavaScript?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            isCorrect: false,
                            text: "let",
                        },
                        {
                            optionKey: "B",
                            isCorrect: false,
                            text: "style",
                        },
                        {
                            optionKey: "C",
                            isCorrect: false,
                            text: "define",
                        },
                        {
                            optionKey: "D",
                            isCorrect: false,
                            text: "variable",
                        },
                    ],

                },

                {
                    id: 2,
                    position: 2,
                    type: "essay",

                    question:
                        "What is the purpose of a function in JavaScript?",

                    imageUrl: null,
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
        durationSeconds: 760,
        isPreview: true,

        lock: {
            enabled: false,
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
        durationSeconds: 1275,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 860,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 900,
        isPreview: false,

        lock: {
            enabled: true,
        },

        content: {
            questions: [
                {
                    id: 1,
                    position: 1,
                    type: "multiple-choice",

                    question:
                        "What is a React component?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            isCorrect: false,
                            text: "A reusable UI building block",
                        },
                        {
                            optionKey: "B",
                            isCorrect: false,
                            text: "A database",
                        },
                        {
                            optionKey: "C",
                            isCorrect: false,
                            text: "A CSS file",
                        },
                        {
                            optionKey: "D",
                            isCorrect: false,
                            text: "A server",
                        },
                    ],

                },

                {
                    id: 2,
                    position: 2,
                    type: "essay",

                    question:
                        "Explain why reusable components are useful.",

                    imageUrl: null,
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
        durationSeconds: 980,
        isPreview: true,

        lock: {
            enabled: false,
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
        durationSeconds: 900,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 1290,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 720,
        isPreview: false,

        lock: {
            enabled: true,
        },

        content: {
            questions: [
                {
                    id: 1,
                    position: 1,
                    type: "multiple-choice",

                    question:
                        "What is one purpose of a design system?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            isCorrect: false,
                            text: "Maintain consistency",
                        },
                        {
                            optionKey: "B",
                            isCorrect: false,
                            text: "Replace all developers",
                        },
                        {
                            optionKey: "C",
                            isCorrect: false,
                            text: "Store customer passwords",
                        },
                        {
                            optionKey: "D",
                            isCorrect: false,
                            text: "Manage databases",
                        },
                    ],

                },

                {
                    id: 2,
                    position: 2,
                    type: "multiple-choice",

                    question:
                        "Which is commonly represented as a design token?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            isCorrect: false,
                            text: "Color",
                        },
                        {
                            optionKey: "B",
                            isCorrect: false,
                            text: "User password",
                        },
                        {
                            optionKey: "C",
                            isCorrect: false,
                            text: "Database row",
                        },
                        {
                            optionKey: "D",
                            isCorrect: false,
                            text: "Server log",
                        },
                    ],

                },

                {
                    id: 3,
                    position: 3,
                    type: "essay",

                    question:
                        "Explain how design tokens can help maintain consistency.",

                    imageUrl: null,
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
        durationSeconds: 1080,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 1460,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 1050,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 900,
        isPreview: false,

        lock: {
            enabled: true,
        },

        content: {
            questions: [
                {
                    id: 1,
                    position: 1,
                    type: "multiple-choice",

                    question:
                        "What makes a component reusable?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            isCorrect: false,
                            text: "It can be used in multiple contexts",
                        },
                        {
                            optionKey: "B",
                            isCorrect: false,
                            text: "It only works once",
                        },
                        {
                            optionKey: "C",
                            isCorrect: false,
                            text: "It cannot accept changes",
                        },
                        {
                            optionKey: "D",
                            isCorrect: false,
                            text: "It must contain a database",
                        },
                    ],

                },

                {
                    id: 2,
                    position: 2,
                    type: "essay",

                    question:
                        "Describe one benefit of documenting reusable components.",

                    imageUrl: null,
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
        durationSeconds: 620,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 1180,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 970,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 750,
        isPreview: false,

        lock: {
            enabled: true,
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
        durationSeconds: 840,
        isPreview: false,

        lock: {
            enabled: true,
        },

        content: {
            questions: [
                {
                    id: 1,
                    position: 1,
                    type: "multiple-choice",

                    question:
                        "Which practice improves accessibility?",

                    imageUrl: null,

                    options: [
                        {
                            optionKey: "A",
                            text: "Providing meaningful labels",
                        },
                        {
                            optionKey: "B",
                            text: "Removing keyboard support",
                        },
                        {
                            optionKey: "C",
                            text: "Using unreadable text",
                        },
                        {
                            optionKey: "D",
                            text: "Hiding important information",
                        },
                    ],

                },

                {
                    id: 2,
                    position: 2,
                    type: "essay",

                    question:
                        "Why is keyboard accessibility important?",

                    imageUrl: null,
                },
            ],
        },
    },
];

export default lessons;
