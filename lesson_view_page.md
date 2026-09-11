# Lesson View Page — Full Feature Specification

## 1. Purpose

Build a complete Lesson View page for the KnoVerse learning platform.

The page allows a learner to:

- View video lessons.
- Read article/reading lessons.
- Complete quiz lessons.
- Navigate between lessons.
- See course/chapter structure.
- See lesson completion status.
- Track course progress.
- Save personal notes.
- View lesson attachments.
- Submit quizzes.
- Move to the previous or next lesson.

This specification covers the complete implementation:

- Frontend UI
- Frontend data flow
- Backend API integration
- Database persistence where required

The goal is to produce a real working Lesson View page connected to the existing backend/database.

Do NOT build a mock-only implementation.

---

# 2. Existing Project Constraints

Before implementing anything:

1. Inspect the existing project structure.
2. Reuse existing components whenever possible.
3. Reuse existing SCSS conventions and BEM utilities.
4. Reuse existing API/service patterns.
5. Reuse the existing lesson/course/chapter database structure.
6. Reuse existing authentication/current-user logic.
7. Reuse existing Header component.
8. Reuse existing Footer component.
9. Reuse existing Icon component.
10. Reuse existing RichTextRenderer if appropriate.
11. Do not create duplicate components that already exist.
12. Do not introduce a new state-management library.
13. Do not introduce a new database architecture.
14. Do not replace existing API routes unless there is a genuine architectural reason.

The existing application is transitioning from MSW mock data to the real backend/database.

The Lesson View page must use the real backend/database.

---

# 3. Page Structure

The overall page structure is:

```text
Header
│
├── Course Navigation Bar
│
└── Main Lesson Area
    │
    ├── Left: Lesson Content
    │
    │   ├── Lesson Content
    │   ├── Lesson Information
    │   ├── Notes
    │   ├── Attachments
    │   ├── Previous / Next navigation
    │
    └── Right: Course Content Sidebar
        │
        ├── Course progress
        ├── Chapter list
        └── Lesson list
│
Footer

The page should be responsive.

Desktop is the primary target.

4. Header

Use the existing Header component.

Do NOT recreate the header.

5. Course Navigation Bar

Immediately below the Header, create a thin horizontal course navigation bar.

Approximate height:

Around 50px.

Background:

White.

Layout:

←   Advanced TypeScript...   |   Nền tảng TypeScript nâng cao
                                  Cấu trúc dự án TypeScript hiện đại
                                             [Video]  1 / 19
Left side

Show:

Back/chevron-left icon.
Short course title.
Vertical divider.
Current chapter title.
Current lesson title.

Example:

‹   Advanced TypeScript...   |   Nền tảng TypeScript nâng cao
                                Cấu trúc dự án TypeScript hiện đại

The current lesson title should be visually stronger than the chapter title.

Right side

Show:

Lesson type badge.
Current lesson position / total lessons.

Example:

[ Video ]   1 / 19

Lesson type should dynamically change:

Video
Reading
Quiz

Do not hardcode "Video".

6. Main Layout

The main page consists of two columns.

┌───────────────────────────────────────────────┬──────────────────────┐
│                                               │                      │
│              LESSON CONTENT                   │ COURSE CONTENT       │
│                                               │ SIDEBAR              │
│                                               │                      │
│                                               │                      │
└───────────────────────────────────────────────┴──────────────────────┘
Left column

The lesson content area.

Right column

The course content sidebar.

The sidebar should have its own vertical scrolling area on desktop.

7. Lesson Content Types

The content area must render different UI depending on the lesson type.

Supported lesson types:

video
reading
quiz

Do NOT render every lesson as a video.

The rendering logic should be conceptually:

if lesson.type === "video"
    render Video Lesson

else if lesson.type === "reading"
    render Reading Lesson

else if lesson.type === "quiz"
    render Quiz Lesson

Use the actual lesson type/value already used by the existing backend/database.

Do not invent a new type system if one already exists.

8. VIDEO LESSON

For video lessons, show a large video player at the top of the lesson content.

Example structure:

┌───────────────────────────────────────┐
│                                       │
│             VIDEO PLAYER              │
│                                       │
│                                       │
└───────────────────────────────────────┘

Lesson title

Instructor information
Duration

Lesson description/content

Attachments

Notes

Previous                     Next
Video player

Use the existing video URL/content field if available.

Do NOT fake the video using a static image.

If the backend already has a video/content URL field, use it.

If the current schema does not have a suitable field:

Inspect the existing lesson schema.
Determine the smallest architecture-consistent solution.
Do not introduce a separate video-storage system.
9. READING / ARTICLE LESSON

Reading lessons must NOT display the video player.

Instead, show an article/reading content area.

Example:

┌──────────────────────────────────────────────┐
│                                              │
│              Reading content                 │
│                                              │
│  Heading                                     │
│                                              │
│  Paragraph text...                           │
│                                              │
│  Code / lists / formatted content...         │
│                                              │
└──────────────────────────────────────────────┘

Use the existing rich-text rendering architecture if the lesson content is stored as Tiptap JSON.

Do NOT stringify JSON.

If the content is:

{
  "type": "doc",
  "content": [...]
}

it must be rendered as formatted content.

It must NOT appear as:

{"type":"doc","content":[...]}

Existing plain-text content should continue to work if possible.

10. QUIZ LESSON

Quiz lessons use a completely different layout.

Do NOT show a video player.

The quiz should visually follow the provided quiz reference screenshot.

The overall appearance should be:

Light gray page background.
White question cards.
Rounded corners.
Thin borders.
Purple accent color.
Clear question hierarchy.
Spacious answer options.
Large submit button at the bottom.

Reference structure:

┌──────────────────────────────────────────────┐
│ Quiz · 2 câu hỏi                             │
│ Đã trả lời: 0/2                              │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ [Trắc nghiệm]  Câu 1: ...                    │
│                                              │
│ ○  Đáp án A                                  │
│ ○  Đáp án B                                  │
│ ○  Đáp án C                                  │
│ ○  Đáp án D                                  │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ [Tự luận]  Câu 2: ...                        │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Viết câu trả lời của bạn tại đây...      │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ [ Đính kèm ảnh bài làm ]                     │
│ Hỗ trợ JPG, PNG · Dùng khi làm bài ra giấy   │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│          ✓ Nộp bài (0/2 đã trả lời)          │
└──────────────────────────────────────────────┘
11. QUIZ HEADER

At the top of the quiz content, show a summary card.

Example:

☷   Quiz · 2 câu hỏi
    Đã trả lời: 0/2

The answer count must be dynamic.

Example:

Đã trả lời: 0/2
Đã trả lời: 1/2
Đã trả lời: 2/2

Do not hardcode the number.

12. MULTIPLE CHOICE QUESTION

For multiple-choice questions:

Show:

Question type badge.
Question number.
Question text.
Answer options.

Example:

[Trắc nghiệm]   Câu 1: Đây là ví dụ câu trắc nghiệm?

○  Đáp án A

○  Đáp án B

○  Đáp án C

○  Đáp án D

Each answer should be selectable.

Only one answer should be selected for a multiple-choice question unless the existing database model explicitly supports multiple answers.

Selected state should be visually clear.

13. ESSAY / SHORT ANSWER QUESTION

For open-ended questions:

Show:

[Tự luận]

Câu 2: Hãy giải thích khái niệm này bằng lời của bạn.

┌──────────────────────────────────────────────┐
│ Viết câu trả lời của bạn tại đây...          │
│                                              │
│                                              │
└──────────────────────────────────────────────┘

The answer should be stored in frontend state while the user is answering.

When the quiz is submitted, send the answer to the backend using the existing quiz/attempt architecture.

Do not invent a fake successful submission.

14. QUIZ ATTACHMENT

For essay/open-ended questions, support the existing attachment/file mechanism if available.

Example UI:

[ image icon ]  Đính kèm ảnh bài làm

Hỗ trợ JPG, PNG · Dùng khi làm bài ra giấy

Important:

Reuse the existing lesson/quiz attachment architecture.
Do not create a new file storage system if one already exists.
Do not fake persistence using React state.
If the existing backend already stores attachment metadata, use it.
If persistence is currently missing, inspect the database schema first and implement the smallest necessary persistence solution.
15. QUIZ SUBMIT BUTTON

At the bottom of the quiz:

✓  Nộp bài (0/2 đã trả lời)

The text must dynamically show the number of answered questions.

Example:

Nộp bài (0/2 đã trả lời)
Nộp bài (1/2 đã trả lời)
Nộp bài (2/2 đã trả lời)

The submit action should:

Validate the current answers.
Send the quiz attempt/submission to the backend.
Handle API success/error.
Update completion/progress state.
Prevent duplicate submissions if the existing architecture requires this.
Show appropriate feedback using existing UI patterns.

Do not simply mark the lesson complete in frontend state.

16. LESSON INFORMATION

For video and reading lessons, below the main content show:

Lesson title

Example:

Cấu trúc dự án TypeScript hiện đại
Instructor

Show existing instructor information.

Example:

[avatar]  KnoVerse Test User
Duration

Example:

12:20

Use actual lesson data.

Do not hardcode values.

17. LESSON NOTES

Below the lesson content, provide a notes section.

Example:

┌──────────────────────────────────────────────┐
│ Ghi chú                                      │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Ghi chú của bạn...                       │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│                         [Lưu ghi chú]         │
└──────────────────────────────────────────────┘

Requirements:

User can type notes.
User can save notes.
Notes should persist if the existing application supports lesson notes.
If no notes persistence exists, inspect the DB schema before adding anything.
Do not store notes only in React state if persistence is expected.

Use the existing current-user identity.

18. LESSON ATTACHMENTS

If the lesson has attachments/files, show them below the lesson content.

Example:

Tài liệu

[document icon]  TypeScript-guide.pdf
[download icon]

Use actual lesson attachment data.

Attachments must survive:

Save
→ refresh
→ reopen lesson

Do not fake attachment persistence.

19. PREVIOUS / NEXT LESSON NAVIGATION

Add navigation buttons at the END of the lesson content area.

IMPORTANT:

These buttons must NOT be placed in the right sidebar.

They appear after the user reaches the bottom of the current lesson content.

Example:

┌──────────────────────────────────────────────┐
│                                              │
│              Lesson content                  │
│                                              │
└──────────────────────────────────────────────┘


[ ← Bài trước ]                     [ Bài tiếp theo → ]

The navigation belongs to the main left content column.

Previous button

Navigate to the previous lesson in the course.

If the current lesson is the first lesson:

Disable the Previous button.
Next button

Navigate to the next lesson in the course.

If the current lesson is the final lesson:

Disable the Next button or replace it with an appropriate completion action.

Navigation must use the actual course curriculum order.

Do not rely only on lesson IDs.

The order should be:

Chapter 1
    Lesson 1
    Lesson 2
    Lesson 3

Chapter 2
    Lesson 4
    Lesson 5

Therefore:

Previous/Next navigation must understand chapter boundaries.

Example:

Chapter 1 / Lesson 3
        ↓ Next
Chapter 2 / Lesson 1
20. COURSE CONTENT SIDEBAR

The right side contains the course curriculum.

Header:

NỘI DUNG KHÓA HỌC

Below it:

9/19 hoàn thành

The numbers must be dynamic.

Show a thin progress bar if supported by the existing design.

21. CHAPTER / SECTION

Each chapter displays:

Nền tảng TypeScript nâng cao
5/5 bài

Example:

NỀN TẢNG TYPESCRIPT NÂNG CAO
5/5 bài

The progress should represent completed lessons in that chapter.

Do not hardcode progress values.

22. LESSON SIDEBAR ITEMS

Each lesson item should display:

Completion state icon.
Lesson title.
Duration.
Lesson type where appropriate.

Example:

✓  Cấu trúc dự án TypeScript hiện đại
   12:20

For quiz:

☷  Quiz chương 1
   10:00

Completed lesson:

Use a check-circle style icon.

Incomplete lesson:

Use play/circle style icon.

Quiz:

Use the existing quiz/document/list icon.
23. ACTIVE LESSON STATE

The currently opened lesson must be visually highlighted.

Example:

┌──────────────────────────────────────┐
││ ✓  Cấu trúc dự án TypeScript        │
││    12:20                             │
└──────────────────────────────────────┘

Use:

Very light lavender background.
Purple accent line on the left.
Purple/stronger title color.

Only the current lesson should have the active styling.

24. LESSON LOCK STATE

The lesson lock state must come from the backend.

IMPORTANT:

Do NOT assume all lessons are locked.

Do NOT hardcode:

isLocked: true

The API/database value must determine the UI.

Expected behavior:

isLocked === true
    → lesson appears locked
    → learner cannot open it unless existing course rules allow it

isLocked === false
    → lesson is available
    → learner can open it

Boolean handling must preserve both values:

true
false

Do not accidentally convert:

false

into:

true

or:

"false"
25. SIDEBAR SCROLL

The course content sidebar should have its own vertical scrolling behavior on desktop.

The sidebar should not make the entire page excessively tall.

Use:

overflow-y: auto;

where appropriate.

The scrollbar should be visible/natural according to the browser.

The sidebar contains enough content to demonstrate that scrolling works.

Do not create fake scrollbar UI.

26. COURSE PROGRESS

Course progress should be calculated from actual lesson completion data.

Example:

9 / 19 completed

The progress bar should reflect the same data.

Do not hardcode progress.

If lesson progress already exists in the backend, reuse it.

27. LESSON COMPLETION

The page should use the existing lesson progress architecture.

When the learner completes a lesson:

Lesson
→ completion/progress API
→ database
→ refreshed lesson/course progress
→ sidebar updates

Do not only update React state.

For video/reading lessons, use the existing completion behavior if already implemented.

For quizzes, successful submission should integrate with the existing lesson completion system.

28. DATA FLOW

The page should load data approximately like this:

Route
/course/:courseId/lesson/:lessonId

        ↓

Fetch course

        ↓

Fetch curriculum

        ↓

Find current lesson

        ↓

Fetch lesson-specific data if needed

        ↓

Render correct lesson type

        ↓

Fetch lesson progress

        ↓

Render sidebar

Do not make unnecessary duplicate requests.

Reuse existing service functions when possible.

29. REQUIRED API DATA

The frontend needs enough information to render:

Course
id
title
instructor
Chapter
id
courseId
title
position
Lesson
id
chapterId
title
type
position
durationSeconds
isLocked
content
attachments

Additional existing fields should remain supported.

Do not remove existing lesson fields.

30. BACKEND REQUIREMENTS

Inspect the existing backend before changing anything.

Check:

lessonController
lessonService
chapterService
courseService
quiz-related services
progress-related services
database schema

Use the existing architecture.

Do not create a second parallel lesson architecture.

31. DATABASE REQUIREMENTS

Before changing the database:

Inspect the existing schema.
Identify existing lesson content fields.
Identify existing attachment/file fields.
Identify is_locked.
Identify quiz/question/answer tables.
Identify progress tables.
Identify note-related tables if present.

Only add a migration if the required persistence truly does not exist.

Prefer the smallest safe schema change.

32. isLocked DATA CONTRACT

The API must return:

{
  "isLocked": true
}

or:

{
  "isLocked": false
}

It must be a real JSON boolean.

NOT:

{
  "isLocked": "false"
}

NOT:

{
  "isLocked": 0
}

unless the backend explicitly converts it to a boolean before returning it.

33. ATTACHMENT DATA CONTRACT

The lesson API should return persisted attachment information.

For example:

{
  "attachments": [
    {
      "id": 1,
      "name": "example.pdf",
      "url": "...",
      "type": "application/pdf"
    }
  ]
}

Use the project's actual existing schema/field names.

Do not force this exact structure if the backend already has an established attachment model.

The important requirement is:

Create/Edit
→ Save
→ Database
→ GET lesson
→ attachment is still present
34. RICH TEXT DATA

If lesson content uses Tiptap:

Store and return it consistently.

Example:

{
  "type": "doc",
  "content": [...]
}

The frontend must pass it to the existing rich-text renderer.

Never do:

JSON.stringify(content)

for display.

Existing plain text content should remain compatible where possible.

35. QUIZ DATA

Inspect the existing quiz database/API architecture.

The page should retrieve:

quiz
questions
question type
question text
options
correct answer information

Do not expose correct answers to the learner before submission if the existing architecture is designed to hide them.

Question types may include:

multiple choice
essay / short answer

Use the existing database representation.

36. QUIZ SUBMISSION FLOW

Expected flow:

User selects answers
        ↓
Frontend stores temporary answers
        ↓
User clicks "Nộp bài"
        ↓
Frontend validates submission
        ↓
POST quiz attempt / existing quiz endpoint
        ↓
Backend validates/processes answers
        ↓
Backend stores result
        ↓
Backend updates lesson progress if appropriate
        ↓
Frontend receives result
        ↓
UI updates completion/progress

Use existing API routes if they already exist.

Do not invent duplicate quiz endpoints.

37. ROUTING

Add a Lesson View route following the existing routing convention.

Expected conceptual route:

/courses/:courseId/lessons/:lessonId

If the project already has a different established route pattern, follow that pattern instead.

Do not create conflicting routes.

38. ERROR STATES

Implement basic error handling.

Examples:

Course not found

Show an appropriate existing error/empty state.

Lesson not found

Show:

Không tìm thấy bài học.

or use the project's existing error component/message.

API failure

Do not silently fail.

Show an appropriate error state.

Locked lesson

Show a clear locked state instead of rendering unavailable content.

39. LOADING STATES

The page should have a loading state while:

Course is loading.
Curriculum is loading.
Lesson is loading.
Quiz is loading.

Reuse existing loading components if available.

Do not introduce a completely new loading system.

40. RESPONSIVE BEHAVIOR

Desktop:

Main content                Sidebar
70%                         30%

approximately.

Mobile/tablet:

Sidebar can move below the lesson content or become collapsible.
Main content should remain readable.
Quiz cards should fit the viewport.
Previous/Next buttons should remain accessible.

Do not over-engineer responsive behavior beyond the project's existing design system.

41. VISUAL STYLE

Follow the existing project design system.

General visual direction:

White cards.
Light gray page background where appropriate.
Purple as primary accent.
Lavender active states.
Rounded corners.
Thin gray borders.
Minimal shadows.
Clean educational dashboard aesthetic.
Compact typography.
Clear spacing hierarchy.

Do not introduce a completely different visual language.

42. COMPONENT REUSE

Before creating components, inspect whether these already exist:

Header
Footer
Icon
RichTextRenderer
RatingStars
Button
Input
Modal
Loading
EmptyState

Reuse existing components whenever appropriate.

Create new components only when the functionality is genuinely new.

Possible new components if needed:

LessonView
LessonContent
VideoLesson
ReadingLesson
QuizLesson
QuizQuestion
LessonNotes
LessonAttachments
LessonNavigation
CourseContentSidebar
ChapterSection
LessonItem

These are suggestions only.

Follow the existing project architecture.

43. IMPORTANT: DO NOT MOCK PERSISTENCE

Do NOT solve any of these problems using mock data:

lesson lock
lesson progress
quiz submission
attachments
notes
lesson content
course curriculum

The real backend/database must be used.

MSW may remain available for unrelated existing screens, but the Lesson View implementation should use the real API.

44. TESTING REQUIREMENTS

After implementation, test the real API flow.

Test 1 — Video lesson

Verify:

GET lesson
→ type = video
→ video UI renders
Test 2 — Reading lesson

Verify:

GET lesson
→ type = reading
→ reading content renders
→ no video player
Test 3 — Quiz

Verify:

GET quiz
→ questions render
→ multiple choice works
→ essay input works
→ answer count updates
→ submit works
Test 4 — isLocked

Test both:

isLocked = false

and:

isLocked = true

Then:

PATCH/POST
→ GET

Verify the value survives refresh.

Test 5 — Previous/Next

Test:

first lesson
middle lesson
last lesson
chapter boundary

Verify correct navigation.

Test 6 — Progress

Verify:

complete lesson
→ backend
→ refresh
→ sidebar shows completed
→ course progress updates
Test 7 — Attachments

Verify:

add attachment
→ save
→ refresh
→ reopen lesson
→ attachment still exists
Test 8 — Notes

Verify:

write note
→ save
→ refresh
→ note remains

if notes persistence is supported/implemented.

45. ACCEPTANCE CRITERIA

The implementation is considered complete when:

Layout
Header is reused.
Course navigation bar exists.
Main lesson area exists.
Course sidebar exists.
Footer is reused.
Video
Video lesson renders video content.
No video player appears for reading/quiz lessons.
Reading
Reading content renders as formatted content.
Tiptap JSON is never displayed as raw JSON.
Quiz
Quiz summary is displayed.
Multiple-choice questions work.
Essay questions work.
Answer count updates.
Submit button works.
Quiz submission uses real backend data.
Quiz UI follows the provided reference design.
Navigation
Previous button works.
Next button works.
Buttons are located at the bottom of the lesson content.
Buttons are NOT inside the sidebar.
Chapter boundaries work correctly.
Sidebar
Course progress is dynamic.
Chapter progress is dynamic.
Current lesson is highlighted.
Completed lessons show completed state.
Uncompleted lessons show normal state.
Quiz lessons use quiz icon.
Sidebar scrolls independently on desktop.
Locking
isLocked=false remains unlocked.
isLocked=true remains locked.
Backend stores the real boolean.
GET returns the real boolean.
Frontend does not hardcode lock state.
Persistence
Lesson content persists.
Attachments persist.
Quiz data persists.
Progress persists.
Course/lesson data survives refresh.
46. IMPLEMENTATION STRATEGY

Follow this order:

Step 1 — Inspect

Inspect:

Frontend routes
Frontend lesson components
Frontend lesson service
CourseDetail
Course curriculum components
Backend lesson controller
Backend lesson service
Backend chapter service
Backend quiz services
Progress services
Database schema
Existing SCSS/components

Do not modify anything yet.

Step 2 — Identify existing architecture

Determine:

Existing lesson types.
Existing lesson content structure.
Existing quiz structure.
Existing attachment structure.
Existing progress structure.
Existing lock field.
Existing API endpoints.
Step 3 — Implement Lesson View UI

Build the layout and lesson-type rendering.

Step 4 — Connect real API

Replace any mock-only data with real backend requests.

Step 5 — Fix persistence gaps

Only modify backend/database where required.

Step 6 — Implement navigation

Use the real curriculum order.

Step 7 — Implement quiz interaction

Connect to the existing quiz architecture.

Step 8 — Test

Perform actual API requests and GET the resources again after mutations.

47. DO NOT CHANGE UNRELATED FEATURES

Do not rewrite unrelated course CRUD.

Do not change:

Course creation behavior unless required by this feature.
Course editing behavior unless required by this feature.
Existing chapter CRUD unless required.
Existing lesson CRUD unless required.
Existing homepage behavior.
Existing authentication behavior.
Existing header/footer.

Only change code that is necessary to make the Lesson View and its required data flow work correctly.

48. FINAL REPORT

After implementation, report:

1. Root causes

For every issue found, explain:

Issue
Root cause
Fix

At minimum report:

isLocked issue.
Attachment persistence issue.
Lesson content issue.
Quiz data issue if applicable.
Progress issue if applicable.
Navigation issue if applicable.
2. Files modified

List every modified file.

For each file:

path
reason for modification
3. Database changes

Clearly state:

No database changes

if no migration was necessary.

If changes were necessary:

migration file
table changed
column changed
reason
4. API changes

List:

GET ...
POST ...
PATCH ...

and explain what each is used for.

Do not change API routes unless necessary.

5. Tests performed

Report actual tests such as:

POST/PATCH
→ GET
→ verified persisted value

Include both success and edge cases.

49. IMPORTANT FINAL RULES
Do not create fake/mock persistence.
Do not hardcode lesson lock state.
Do not hardcode progress.
Do not hardcode lesson count.
Do not hardcode quiz question count.
Do not display Tiptap JSON using JSON.stringify.
Do not render a video player for reading lessons.
Do not render a video player for quiz lessons.
Do not put Previous/Next inside the sidebar.
Previous/Next belongs at the bottom of the main lesson content.
Use the real curriculum order for navigation.
Preserve existing API routes whenever possible.
Inspect the database before adding migrations.
Reuse existing components and SCSS.
Keep the implementation architecture-consistent with the existing project.
Test persistence by saving and then GETting the resource again.
Do not create a separate mock implementation for Lesson View.
The final result must be a real working frontend + backend + database feature.

## Implementation Structure

Do NOT implement the entire Lesson View in a single large file.

Follow the existing frontend project structure and component conventions.

The Lesson View should be divided into reasonable React components based on responsibility.

At minimum, separate these responsibilities:

- Main Lesson View/page
- Lesson content area
- Course content sidebar
- Lesson navigation (Previous / Next)
- Video lesson content
- Reading lesson content
- Quiz lesson content

Use separate `.jsx` and `.scss` files where appropriate.

Reuse existing shared components whenever possible, especially:
- Header
- Footer
- Icon
- existing UI components
- existing BEM utility
- existing styling conventions

Do NOT create duplicate versions of existing shared components.

Keep the main LessonView component responsible mainly for:
- fetching lesson/course/curriculum data
- determining the current lesson
- determining the lesson type
- coordinating navigation
- passing data to child components

Child components should handle their own presentation.

Do NOT put backend/database logic directly inside UI components.
Use the existing service/API layer.

Follow the existing project folder structure instead of inventing a completely new architecture.

## Lesson Navigation

At the bottom of the main lesson content area, after the lesson content:

- Show a Previous Lesson button when a previous lesson exists.
- Show a Next Lesson button when a next lesson exists.
- Do NOT place these buttons inside the right sidebar.
- The buttons must be part of the main lesson content flow.

Navigation should use the actual lesson order from the course curriculum.

When clicking Next:
- determine the next lesson from the curriculum
- navigate to that lesson
- reload/fetch the corresponding lesson data

When clicking Previous:
- determine the previous lesson from the curriculum
- navigate to that lesson
- reload/fetch the corresponding lesson data

Do not hardcode lesson IDs or lesson order.

## Implementation Rules

1. Inspect the existing project before modifying anything.
2. Reuse existing components and utilities whenever possible.
3. Do not create mock data to solve real persistence problems.
4. Keep existing API routes unless a change is genuinely required.
5. Split large UI into reusable components.
6. Keep component-specific styles in separate SCSS files following the existing BEM convention.
7. Keep API logic in existing service/controller/service layers.
8. Check the existing database schema before creating migrations.
9. Do not rewrite unrelated functionality.
10. Run the relevant tests/build/API checks after implementation.

## Expected Result

The Lesson View should be fully functional, not just visually similar to the specification.

It must:
- render video lessons;
- render reading lessons;
- render quizzes;
- display course/chapter/lesson navigation;
- support previous/next lesson navigation;
- persist and retrieve lesson data from the real backend/database;
- preserve existing course and curriculum functionality;
- work after page refresh;
- handle loading, empty, and error states.