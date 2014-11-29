-------------------------------------------------------------------------------
-- ws_log
-------------------------------------------------------------------------------
CREATE TABLE ws_log (
	id_log BIGINT NOT NULL PRIMARY KEY
);
CREATE TABLE log_sequences (
	sequence_name VARCHAR( 255 ) NOT NULL PRIMARY KEY,
	next_val BIGINT
);
INSERT INTO log_sequences VALUES ( 'log_sequence', 1 );

-------------------------------------------------------------------------------
-- ws_exception
-------------------------------------------------------------------------------
CREATE TABLE ws_exception (
	id_exception BIGINT NOT NULL PRIMARY KEY,
	id_log BIGINT NOT NULL REFERENCES ws_log,
	ds_exception TEXT NOT NULL,
	ds_cause TEXT,
	ds_cause2 TEXT,
	ds_cause3 TEXT,
	dt_inc BIGINT NOT NULL
);
CREATE TABLE exception_sequences (
	sequence_name VARCHAR( 255 ) NOT NULL PRIMARY KEY,
	next_val BIGINT
);
INSERT INTO exception_sequences VALUES ( 'exception_sequence', 1 );

-------------------------------------------------------------------------------
-- ws_access
-------------------------------------------------------------------------------
CREATE TABLE ws_access (
	id_access BIGINT NOT NULL PRIMARY KEY,
	id_log BIGINT NOT NULL REFERENCES ws_log,
	id_user BIGINT REFERENCES ws_user,
	ds_ip VARCHAR( 255 ) NOT NULL,
	ds_data TEXT NOT NULL
);
CREATE TABLE access_sequences (
	sequence_name VARCHAR( 255 ) NOT NULL PRIMARY KEY,
	next_val BIGINT
);
INSERT INTO access_sequences VALUES ( 'access_sequence', 1 );