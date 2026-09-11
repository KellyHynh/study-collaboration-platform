BEGIN;

-- The frontend's temporary auth contract uses this user as the signed-in learner.
INSERT INTO users (id, name, email, phone, avatar_url, bio, country, timezone, language)
VALUES
    ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'Maya Nguyen', 'maya.nguyen@knoverse.local', '0900000001', 'http://localhost:3000/demo-assets/avatar-maya.svg', 'Frontend engineer learning in public.', 'Vietnam', 'Asia/Ho_Chi_Minh', 'en'),
    ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'Owen Carter', 'owen.carter@knoverse.local', '0900000002', 'http://localhost:3000/demo-assets/avatar-owen.svg', 'Product-minded backend engineer and course creator.', 'United Kingdom', 'Europe/London', 'en'),
    ('4f2a8b2c-8f60-4c65-8b1b-0b4e986e6e31', 'Linh Tran', 'linh.tran@knoverse.local', '0900000003', 'http://localhost:3000/demo-assets/avatar-linh.svg', 'Data analyst turning messy questions into useful stories.', 'Vietnam', 'Asia/Ho_Chi_Minh', 'en'),
    ('7b6a6a7a-ec4c-4cb6-a6ae-b5da2a6ef1d0', 'Sofia Alvarez', 'sofia.alvarez@knoverse.local', '0900000004', 'http://localhost:3000/demo-assets/avatar-sofia.svg', 'Designer interested in systems, not just screens.', 'Spain', 'Europe/Madrid', 'en')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name, email = EXCLUDED.email, phone = EXCLUDED.phone,
    avatar_url = EXCLUDED.avatar_url, bio = EXCLUDED.bio, country = EXCLUDED.country,
    timezone = EXCLUDED.timezone, language = EXCLUDED.language;

INSERT INTO categories (name)
VALUES ('Programming'), ('Data'), ('Design'), ('Business'), ('Engineering'), ('Language')
ON CONFLICT (name) DO NOTHING;

-- Remove only records owned by this seed. Cascades remove their curriculum/content.
DELETE FROM courses
WHERE join_code IN ('DEMO-REACT', 'DEMO-DATA', 'DEMO-DSGN', 'DEMO-TEAM', 'PYTHON-01', 'DEVOPS-01', 'PRODUCT-01', 'ENGLISH-01', 'OWNED-001', 'OWNED-002', 'SHARED-001');

INSERT INTO courses (
    owner_id, title, thumbnail_url, category_id, level, tags, description,
    learning_outcomes, requirements, visibility, join_code, language
)
SELECT
    v.owner_id::uuid, v.title, v.thumbnail_url, cat.id, v.level, v.tags::jsonb,
    v.description, v.learning_outcomes::jsonb, v.requirements::jsonb,
    'public', v.join_code, 'en'
FROM (VALUES
    ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'React Foundations: Build with Confidence', 'http://localhost:3000/demo-assets/knoverse-code.svg', 'Programming', 'beginner', '["react", "javascript", "frontend"]', 'A calm, project-based path from JSX fundamentals to reusable React architecture.', '["Build accessible React components", "Explain state and data flow clearly", "Ship a small polished interface"]', '["Comfort with modern JavaScript", "A code editor and browser"]', 'DEMO-REACT'),
    ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'Data Storytelling with SQL and Charts', 'http://localhost:3000/demo-assets/knoverse-data.svg', 'Data', 'intermediate', '["sql", "analytics", "storytelling"]', 'Learn to move from a vague business question to a trustworthy, human-readable data story.', '["Write analytical SQL with confidence", "Choose charts that fit the question", "Present uncertainty without losing the room"]', '["Basic SQL SELECT statements", "Curiosity about real-world data"]', 'DEMO-DATA'),
    ('7b6a6a7a-ec4c-4cb6-a6ae-b5da2a6ef1d0', 'Design Systems for Product Teams', 'http://localhost:3000/demo-assets/knoverse-design.svg', 'Design', 'intermediate', '["design-systems", "ux", "figma"]', 'A practical workshop for turning repeated interface decisions into a flexible, documented system.', '["Audit a product for consistency", "Design useful component APIs", "Create contribution rules a team can follow"]', '["Basic product design vocabulary", "One interface you can study"]', 'DEMO-DSGN'),
    ('4f2a8b2c-8f60-4c65-8b1b-0b4e986e6e31', 'Reliable APIs: Contracts, Errors, and Observability', 'http://localhost:3000/demo-assets/knoverse-code.svg', 'Engineering', 'advanced', '["node", "api-design", "reliability"]', 'A field guide to building APIs that are understandable under normal load and diagnosable under pressure.', '["Design stable resource contracts", "Model failure as part of the API", "Add useful operational signals"]', '["Experience with HTTP and JSON", "Comfort reading server-side JavaScript"]', 'DEMO-TEAM'),
    ('4f2a8b2c-8f60-4c65-8b1b-0b4e986e6e31', 'Python for Practical Automation', 'http://localhost:3000/demo-assets/knoverse-code.svg', 'Programming', 'beginner', '["python", "automation", "scripting"]', 'Turn repetitive work into small, readable Python programs you can trust and maintain.', '["Write useful Python scripts", "Work with files and APIs", "Structure a small automation project"]', '["Basic programming concepts", "A willingness to experiment"]', 'PYTHON-01'),
    ('7b6a6a7a-ec4c-4cb6-a6ae-b5da2a6ef1d0', 'Shipping Software with DevOps Habits', 'http://localhost:3000/demo-assets/knoverse-code.svg', 'Engineering', 'intermediate', '["ci-cd", "deployment", "teamwork"]', 'Learn the practical habits that help teams ship smaller changes with clearer feedback.', '["Read a deployment pipeline", "Choose useful checks", "Make releases easier to recover"]', '["Comfort with Git", "Basic command line experience"]', 'DEVOPS-01'),
    ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'Product Thinking for Technical Teams', 'http://localhost:3000/demo-assets/knoverse-design.svg', 'Business', 'advanced', '["product", "prioritization", "discovery"]', 'A shared vocabulary for choosing valuable problems before investing in solutions.', '["Frame a product problem", "Compare opportunities", "Write a decision-ready brief"]', '["Experience working on a product team"]', 'PRODUCT-01'),
    ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'English for Clear Technical Writing', 'http://localhost:3000/demo-assets/knoverse-data.svg', 'Language', 'intermediate', '["writing", "communication", "english"]', 'Practice concise technical writing for documentation, feedback, and everyday collaboration.', '["Structure a clear explanation", "Edit for busy readers", "Write useful technical feedback"]', '["Intermediate English reading", "A document you want to improve"]', 'ENGLISH-01')
) AS v(owner_id, title, thumbnail_url, category, level, tags, description, learning_outcomes, requirements, join_code)
JOIN categories cat ON cat.name = v.category
ON CONFLICT (join_code) DO UPDATE SET
    owner_id = EXCLUDED.owner_id, title = EXCLUDED.title, thumbnail_url = EXCLUDED.thumbnail_url,
    category_id = EXCLUDED.category_id, level = EXCLUDED.level, tags = EXCLUDED.tags,
    description = EXCLUDED.description, learning_outcomes = EXCLUDED.learning_outcomes,
    requirements = EXCLUDED.requirements, visibility = EXCLUDED.visibility, language = EXCLUDED.language,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO chapters (course_id, title, position)
SELECT c.id, v.title, v.position
FROM (VALUES
    ('DEMO-REACT', 'The React Mental Model', 1), ('DEMO-REACT', 'State, Events, and Composition', 2), ('DEMO-REACT', 'A Small Interface, Polished', 3),
    ('DEMO-DATA', 'Questions Before Queries', 1), ('DEMO-DATA', 'From Rows to Signals', 2), ('DEMO-DATA', 'Tell the Honest Story', 3),
    ('DEMO-DSGN', 'Foundations and Intent', 1), ('DEMO-DSGN', 'Components as Agreements', 2),
    ('DEMO-TEAM', 'Boundaries That Age Well', 1), ('DEMO-TEAM', 'Operate What You Build', 2)
) AS v(join_code, title, position)
JOIN courses c ON c.join_code = v.join_code
ON CONFLICT (course_id, position) DO UPDATE SET title = EXCLUDED.title, updated_at = CURRENT_TIMESTAMP;

INSERT INTO lessons (chapter_id, title, type, position, duration_seconds, is_locked)
SELECT ch.id, v.title, v.type, v.lesson_position, v.duration_seconds, v.is_locked
FROM (VALUES
    ('DEMO-REACT', 1, 'JSX Is a Description, Not a Template', 'reading', 1, 720, false), ('DEMO-REACT', 1, 'Render a Component Tree', 'video', 2, 840, false), ('DEMO-REACT', 2, 'State Changes Are Events', 'reading', 1, 780, false), ('DEMO-REACT', 2, 'Composition Checkpoint', 'quiz', 2, 420, false), ('DEMO-REACT', 3, 'Ship the Empty, Loading, and Error States', 'reading', 1, 900, true),
    ('DEMO-DATA', 1, 'Start with the Decision', 'reading', 1, 660, false), ('DEMO-DATA', 1, 'A Query You Can Explain', 'video', 2, 960, false), ('DEMO-DATA', 2, 'Aggregation Without Hand-Waving', 'reading', 1, 840, false), ('DEMO-DATA', 2, 'Chart Selection Lab', 'quiz', 2, 480, false), ('DEMO-DATA', 3, 'Presenting Uncertainty', 'video', 1, 720, true),
    ('DEMO-DSGN', 1, 'Tokens Before Components', 'reading', 1, 840, false), ('DEMO-DSGN', 1, 'A Button Is a Contract', 'video', 2, 780, false), ('DEMO-DSGN', 1, 'Foundations Quiz', 'quiz', 3, 360, false), ('DEMO-DSGN', 2, 'Document the Decisions', 'reading', 1, 720, true),
    ('DEMO-TEAM', 1, 'Resource Boundaries', 'reading', 1, 780, false), ('DEMO-TEAM', 1, 'Errors Users Can Recover From', 'video', 2, 900, false), ('DEMO-TEAM', 2, 'Reliability Review', 'quiz', 1, 480, true)
) AS v(join_code, chapter_position, title, type, lesson_position, duration_seconds, is_locked)
JOIN courses c ON c.join_code = v.join_code
JOIN chapters ch ON ch.course_id = c.id AND ch.position = v.chapter_position
ON CONFLICT (chapter_id, position) DO UPDATE SET
    title = EXCLUDED.title, type = EXCLUDED.type, duration_seconds = EXCLUDED.duration_seconds,
    is_locked = EXCLUDED.is_locked, updated_at = CURRENT_TIMESTAMP;

DELETE FROM lesson_readings WHERE lesson_id IN (SELECT l.id FROM lessons l JOIN chapters ch ON ch.id = l.chapter_id JOIN courses c ON c.id = ch.course_id WHERE c.join_code LIKE 'DEMO-%');
DELETE FROM lesson_videos WHERE lesson_id IN (SELECT l.id FROM lessons l JOIN chapters ch ON ch.id = l.chapter_id JOIN courses c ON c.id = ch.course_id WHERE c.join_code LIKE 'DEMO-%');
DELETE FROM lesson_attachments WHERE lesson_id IN (SELECT l.id FROM lessons l JOIN chapters ch ON ch.id = l.chapter_id JOIN courses c ON c.id = ch.course_id WHERE c.join_code LIKE 'DEMO-%');
DELETE FROM quizzes WHERE lesson_id IN (SELECT l.id FROM lessons l JOIN chapters ch ON ch.id = l.chapter_id JOIN courses c ON c.id = ch.course_id WHERE c.join_code LIKE 'DEMO-%');

INSERT INTO lesson_readings (lesson_id, body)
SELECT l.id, v.body
FROM (VALUES
    ('DEMO-REACT', 1, 1, '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"The useful shift"}]},{"type":"paragraph","content":[{"type":"text","text":"React is easiest to reason about when you treat a component as a function of inputs. JSX is the description of the UI for those inputs; it is not a string template that the browser edits for you."}]},{"type":"paragraph","content":[{"type":"text","text":"Start with the smallest honest component. Give it one responsibility, name the data it needs, and let the parent decide how the pieces compose."}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Props describe what a component receives."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"State describes what can change over time."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Rendering turns the current snapshot into UI."}]}]}]}]}'),
    ('DEMO-REACT', 2, 1, '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"State is a response to an event"}]},{"type":"paragraph","content":[{"type":"text","text":"A click, keystroke, or network response can change the next UI snapshot. Keep state close to the component that owns the decision, then pass behavior down as a named callback."}]},{"type":"paragraph","content":[{"type":"text","text":"When a value can be calculated from existing props and state, calculate it during render instead of storing a second copy."}]}]}'),
    ('DEMO-DATA', 1, 1, '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"The chart is not the question"}]},{"type":"paragraph","content":[{"type":"text","text":"Before writing SQL, write the decision your reader needs to make. A good analysis has a clear audience, a time window, and a definition of success."}]},{"type":"paragraph","content":[{"type":"text","text":"For example: which onboarding step should the team improve next month? That question tells us to define a cohort, preserve the step order, and show drop-off rather than simply counting every event."}]}]}'),
    ('DEMO-DATA', 2, 1, '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Aggregation is a promise"}]},{"type":"paragraph","content":[{"type":"text","text":"Every GROUP BY hides detail. Make the promise visible: state the grain of the rows, the population included, and the reason the aggregation answers the original question."}]},{"type":"paragraph","content":[{"type":"text","text":"A trustworthy chart makes it easy to inspect the definition behind the number. Labels, units, and a short note about missing data are part of the analysis, not decoration."}]}]}'),
    ('DEMO-DSGN', 1, 1, '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Tokens make intent portable"}]},{"type":"paragraph","content":[{"type":"text","text":"A token names a decision that repeats: spacing, color, type scale, motion, or shape. When the decision has a name, a product team can change it deliberately instead of hunting through isolated values."}]},{"type":"paragraph","content":[{"type":"text","text":"Begin with a small set. Choose roles such as surface, text, action, and danger; then map those roles to components."}]}]}'),
    ('DEMO-DSGN', 2, 1, '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Documentation is part of the component"}]},{"type":"paragraph","content":[{"type":"text","text":"A component is ready for a team when its intended use, states, and boundaries are clear. Document the decision it protects, not every implementation detail."}]}]}'),
    ('DEMO-TEAM', 1, 1, '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Boundaries are communication"}]},{"type":"paragraph","content":[{"type":"text","text":"An API boundary should make the valid path obvious and the invalid path useful. Pick resource names that reflect the domain, validate at the edge, and return errors that help a caller recover."}]},{"type":"paragraph","content":[{"type":"text","text":"The best contract is boring to use: predictable status codes, stable shapes, and enough context to debug without reading the server source."}]}]}')
) AS v(join_code, chapter_position, lesson_position, body)
JOIN courses c ON c.join_code = v.join_code JOIN chapters ch ON ch.course_id = c.id AND ch.position = v.chapter_position JOIN lessons l ON l.chapter_id = ch.id AND l.position = v.lesson_position;

INSERT INTO lesson_videos (lesson_id, video_url, file_name, mime_type)
SELECT l.id, 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', 'flower.mp4', 'video/mp4'
FROM (VALUES ('DEMO-REACT', 1, 2), ('DEMO-DATA', 1, 2), ('DEMO-DATA', 3, 1), ('DEMO-DSGN', 1, 2), ('DEMO-TEAM', 1, 2)) v(join_code, chapter_position, lesson_position)
JOIN courses c ON c.join_code = v.join_code JOIN chapters ch ON ch.course_id = c.id AND ch.position = v.chapter_position JOIN lessons l ON l.chapter_id = ch.id AND l.position = v.lesson_position;

INSERT INTO lesson_attachments (lesson_id, file_url, file_name, mime_type)
SELECT l.id, 'http://localhost:3000/demo-assets/reading-notes.pdf', 'reading-notes.pdf', 'application/pdf'
FROM courses c JOIN chapters ch ON ch.course_id = c.id AND ch.position = 1 JOIN lessons l ON l.chapter_id = ch.id AND l.position = 1
WHERE c.join_code = 'DEMO-REACT';

INSERT INTO quizzes (lesson_id)
SELECT l.id FROM (VALUES ('DEMO-REACT', 2, 2), ('DEMO-DATA', 2, 2), ('DEMO-DSGN', 1, 3), ('DEMO-TEAM', 2, 1)) v(join_code, chapter_position, lesson_position)
JOIN courses c ON c.join_code = v.join_code JOIN chapters ch ON ch.course_id = c.id AND ch.position = v.chapter_position JOIN lessons l ON l.chapter_id = ch.id AND l.position = v.lesson_position;

INSERT INTO quiz_questions (quiz_id, type, question, position, image_url, image_file_name, image_mime_type)
SELECT l.id, v.type, v.question, v.question_position, v.image_url, v.image_file_name, v.image_mime_type
FROM (VALUES
    ('DEMO-REACT', 2, 2, 1, 'multiple-choice', 'Which choice keeps a derived value from becoming a second source of truth?', null, null, null), ('DEMO-REACT', 2, 2, 2, 'essay', 'In two sentences, describe when a child component should receive a callback prop.', null, null, null),
    ('DEMO-DATA', 2, 2, 1, 'multiple-choice', 'Which chart best communicates a change in conversion across ordered steps?', null, null, null), ('DEMO-DATA', 2, 2, 2, 'multiple-choice', 'What should be stated before comparing two percentages?', null, null, null),
    ('DEMO-DSGN', 1, 3, 1, 'multiple-choice', 'What is the primary job of a semantic color token?', 'http://localhost:3000/demo-assets/quiz-network.svg', 'quiz-network.svg', 'image/svg+xml'), ('DEMO-DSGN', 1, 3, 2, 'essay', 'Name one component state that deserves explicit design and why.', null, null, null),
    ('DEMO-TEAM', 2, 1, 1, 'multiple-choice', 'Which response gives an API consumer the most useful failure?', null, null, null)
) AS v(join_code, chapter_position, lesson_position, question_position, type, question, image_url, image_file_name, image_mime_type)
JOIN courses c ON c.join_code = v.join_code JOIN chapters ch ON ch.course_id = c.id AND ch.position = v.chapter_position JOIN lessons l ON l.chapter_id = ch.id AND l.position = v.lesson_position;

INSERT INTO quiz_options (question_id, option_key, text, is_correct, position)
SELECT q.id, v.option_key, v.text, v.is_correct, v.option_position
FROM (VALUES
    ('DEMO-REACT', 2, 2, 1, 'A', 'Calculate it from current props and state', true, 1), ('DEMO-REACT', 2, 2, 1, 'B', 'Copy it into state whenever rendering starts', false, 2), ('DEMO-REACT', 2, 2, 1, 'C', 'Store it in a module-level variable', false, 3),
    ('DEMO-DATA', 2, 2, 1, 'A', 'A funnel chart or ordered step view', true, 1), ('DEMO-DATA', 2, 2, 1, 'B', 'A decorative word cloud', false, 2), ('DEMO-DATA', 2, 2, 1, 'C', 'A pie chart with no denominator', false, 3),
    ('DEMO-DATA', 2, 2, 2, 'A', 'The population and denominator', true, 1), ('DEMO-DATA', 2, 2, 2, 'B', 'Only the brighter color', false, 2), ('DEMO-DATA', 2, 2, 2, 'C', 'The dashboard title length', false, 3),
    ('DEMO-DSGN', 1, 3, 1, 'A', 'Communicate a role and intent', true, 1), ('DEMO-DSGN', 1, 3, 1, 'B', 'Hide every color from designers', false, 2), ('DEMO-DSGN', 1, 3, 1, 'C', 'Guarantee a single brand color', false, 3),
    ('DEMO-TEAM', 2, 1, 1, 'A', 'A stable code, message, and recovery hint', true, 1), ('DEMO-TEAM', 2, 1, 1, 'B', 'A blank 500 response', false, 2), ('DEMO-TEAM', 2, 1, 1, 'C', 'A stack trace shown to every user', false, 3)
) AS v(join_code, chapter_position, lesson_position, question_position, option_key, text, is_correct, option_position)
JOIN courses c ON c.join_code = v.join_code JOIN chapters ch ON ch.course_id = c.id AND ch.position = v.chapter_position JOIN lessons l ON l.chapter_id = ch.id AND l.position = v.lesson_position JOIN quiz_questions q ON q.quiz_id = l.id AND q.position = v.question_position;

INSERT INTO enrollments (user_id, course_id, enrolled_at, completed_at)
SELECT v.user_id::uuid, c.id, v.enrolled_at::timestamptz, v.completed_at::timestamptz
FROM (VALUES
    ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-REACT', '2026-08-01', null), ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-DATA', '2026-08-18', null), ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-DSGN', '2026-09-01', null), ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'PYTHON-01', '2026-09-03', null),
    ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'DEMO-REACT', '2026-07-12', '2026-08-10'), ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'DEMO-DATA', '2026-08-20', null),
    ('4f2a8b2c-8f60-4c65-8b1b-0b4e986e6e31', 'DEMO-DATA', '2026-08-05', null), ('4f2a8b2c-8f60-4c65-8b1b-0b4e986e6e31', 'DEMO-TEAM', '2026-08-28', null),
    ('7b6a6a7a-ec4c-4cb6-a6ae-b5da2a6ef1d0', 'DEMO-DSGN', '2026-07-25', '2026-08-30'), ('7b6a6a7a-ec4c-4cb6-a6ae-b5da2a6ef1d0', 'DEMO-TEAM', '2026-08-30', null)
) AS v(user_id, join_code, enrolled_at, completed_at)
JOIN courses c ON c.join_code = v.join_code
ON CONFLICT (user_id, course_id) DO UPDATE SET enrolled_at = EXCLUDED.enrolled_at, completed_at = EXCLUDED.completed_at;

INSERT INTO lesson_progress (user_id, lesson_id, completed_at)
SELECT v.user_id::uuid, l.id, v.completed_at::timestamptz
FROM (VALUES
    ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-REACT', 1, 1, '2026-08-02'), ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-REACT', 1, 2, '2026-08-03'), ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-REACT', 2, 1, '2026-08-05'),
    ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-DATA', 1, 1, '2026-08-19'), ('ec8574c6-f44d-40e0-ba80-68e1d0aa9da9', 'DEMO-DATA', 1, 2, '2026-08-21'),
    ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'DEMO-REACT', 1, 1, '2026-07-13'), ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'DEMO-REACT', 1, 2, '2026-07-14'), ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'DEMO-REACT', 2, 1, '2026-07-16'), ('2c5e3b74-0e74-4fa0-9e35-6df52d1e2a11', 'DEMO-REACT', 2, 2, '2026-07-18')
) AS v(user_id, join_code, chapter_position, lesson_position, completed_at)
JOIN courses c ON c.join_code = v.join_code JOIN chapters ch ON ch.course_id = c.id AND ch.position = v.chapter_position JOIN lessons l ON l.chapter_id = ch.id AND l.position = v.lesson_position
ON CONFLICT (user_id, lesson_id) DO UPDATE SET completed_at = EXCLUDED.completed_at, updated_at = CURRENT_TIMESTAMP;

COMMIT;
