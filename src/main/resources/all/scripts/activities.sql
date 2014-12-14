CREATE TABLE ws_activity (
	id_activity BIGINT NOT NULL PRIMARY KEY,
	id_author BIGINT NOT NULL REFERENCES ws_user
);
CREATE TABLE activity_sequences (
	sequence_name VARCHAR( 255 ) NOT NULL PRIMARY KEY,
	next_val BIGINT
);
INSERT INTO activity_sequences VALUES ( 'activity_sequence', 1 );

CREATE TABLE ws_joined (
	id_activity BIGINT NOT NULL PRIMARY KEY REFERENCES ws_activity
);

CREATE TABLE ws_new_story (
	id_activity BIGINT NOT NULL PRIMARY KEY REFERENCES ws_activity,
	id_story BIGINT NOT NULL REFERENCES ws_story
);

CREATE TABLE ws_chapter_published (
	id_activity BIGINT NOT NULL PRIMARY KEY REFERENCES ws_activity,
	id_chapter BIGINT NOT NULL REFERENCES ws_chapter
);