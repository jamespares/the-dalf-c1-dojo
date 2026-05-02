-- users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch() * 1000)
);

-- sessions
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at INTEGER NOT NULL
);

-- exams
CREATE TABLE exams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  generated_content TEXT NOT NULL,
  audio_keys TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  created_at INTEGER DEFAULT (unixepoch() * 1000)
);

-- attempts
CREATE TABLE attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  exam_id INTEGER NOT NULL,
  section TEXT NOT NULL,
  started_at INTEGER DEFAULT (unixepoch() * 1000),
  submitted_at INTEGER,
  scores TEXT NOT NULL DEFAULT '{}',
  total_score REAL,
  ai_feedback TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'in_progress'
);

-- answers
CREATE TABLE answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_id INTEGER NOT NULL,
  question_id TEXT NOT NULL,
  user_answer TEXT,
  audio_key TEXT,
  ai_score REAL,
  ai_feedback TEXT,
  created_at INTEGER DEFAULT (unixepoch() * 1000)
);

-- error_logs
CREATE TABLE error_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  attempt_id INTEGER,
  error_type TEXT NOT NULL,
  original_text TEXT NOT NULL,
  correction TEXT NOT NULL,
  explanation TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch() * 1000)
);
