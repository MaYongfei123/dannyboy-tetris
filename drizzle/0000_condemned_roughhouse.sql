CREATE TABLE `tetris_scores` (
	`player_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`score` integer DEFAULT 0 NOT NULL,
	`lines` integer DEFAULT 0 NOT NULL,
	`level` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL
);
