ALTER TABLE ws_invite ALTER ds_email DROP NOT NULL;
ALTER TABLE ws_invite ADD id_inviter BIGINT NOT NULL DEFAULT 1 REFERENCES ws_user;
ALTER TABLE ws_invite ADD id_invited BIGINT REFERENCES ws_user;