package org.webstories.dao.activity;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.webstories.dao.user.UserEntity;

@Entity
@Table( name = "ws_joined" )
public class JoinedActivityEntity extends ActivityEntity {
	protected JoinedActivityEntity() {}
	public JoinedActivityEntity( UserEntity activityAuthor ) {
		super( activityAuthor );
	}
}
