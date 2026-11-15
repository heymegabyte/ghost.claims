CREATE TABLE IF NOT EXISTS chat_feedback (
  message_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating IN (-1, 1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (message_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_feedback_session
  ON chat_feedback(session_id, updated_at DESC);
