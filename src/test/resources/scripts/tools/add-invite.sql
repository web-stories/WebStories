INSERT INTO ws_invite (id_invite, ds_email, cod_invite) VALUES (
	(SELECT next_val FROM invite_sequences WHERE sequence_name = 'invite_sequence'),
	null,
	null
);
UPDATE invite_sequences SET next_val = (
	SELECT next_val FROM invite_sequences WHERE sequence_name = 'invite_sequence'
) WHERE sequence_name = 'invite_sequence';