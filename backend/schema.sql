CREATE TABLE IF NOT EXISTS blessings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id CHAR(36) NOT NULL,
  user_name VARCHAR(80) NOT NULL,
  user_wish VARCHAR(500) NOT NULL,
  bappa_response TEXT NOT NULL,
  ganesh_name VARCHAR(64) NOT NULL DEFAULT 'Ganapati',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blessings_user_id (user_id),
  KEY idx_blessings_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
