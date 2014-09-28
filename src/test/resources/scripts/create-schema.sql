-------------------------------------------------------------------------------
-- ws_invite
-------------------------------------------------------------------------------
CREATE TABLE ws_invite (
	id_invite BIGINT NOT NULL PRIMARY KEY,
	ds_email VARCHAR( 255 ) NOT NULL UNIQUE,
	cod_invite VARCHAR( 255 ) NOT NULL UNIQUE
);
CREATE TABLE invite_sequences (
	sequence_name VARCHAR( 255 ) NOT NULL PRIMARY KEY,
	next_val BIGINT
);
INSERT INTO invite_sequences VALUES ( 'invite_sequence', 1 );

-------------------------------------------------------------------------------
-- ws_user
-------------------------------------------------------------------------------
CREATE TABLE ws_user (
	id_user BIGINT NOT NULL PRIMARY KEY
);
CREATE TABLE user_sequences (
	sequence_name VARCHAR( 255 ) NOT NULL PRIMARY KEY,
	next_val BIGINT
);
INSERT INTO user_sequences VALUES ( 'facebook_sequence', 1 );

-------------------------------------------------------------------------------
-- ws_facebook
-------------------------------------------------------------------------------
CREATE TABLE ws_facebook (
	id_user BIGINT NOT NULL PRIMARY KEY REFERENCES ws_user,
	cod_uid VARCHAR( 255 ) NOT NULL UNIQUE,
	ds_email VARCHAR( 255 ) NOT NULL UNIQUE,
	nm_first VARCHAR( 255 ) NOT NULL,
	nm_last VARCHAR( 255 ) NOT NULL
);

-------------------------------------------------------------------------------
-- ws_story
-------------------------------------------------------------------------------
CREATE TABLE ws_story (
	id_story BIGINT NOT NULL PRIMARY KEY,
	id_author BIGINT NOT NULL REFERENCES ws_user
);
CREATE TABLE story_sequences (
	sequence_name VARCHAR( 255 ) NOT NULL PRIMARY KEY,
	next_val BIGINT
);
INSERT INTO story_sequences VALUES ( 'story_sequence', 1 );

-------------------------------------------------------------------------------
-- ws_meta
-------------------------------------------------------------------------------
CREATE TABLE ws_meta (
	id_story BIGINT NOT NULL PRIMARY KEY REFERENCES ws_story,
	ds_title VARCHAR( 255 ) NOT NULL,
	ds_summary VARCHAR( 255 ) NOT NULL,
	ds_synopsis TEXT NOT NULL
);