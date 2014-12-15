package org.webstories.dao.activity;

import java.util.List;

import javax.ejb.Stateless;

import org.webstories.dao.Queries;

@Stateless
public class ActivityQueries extends Queries {
	public List<ActivityEntity> listNewsFeedActivities() {
		QActivityEntity tableActivity = QActivityEntity.activityEntity;
		return queryFrom( tableActivity )
			.orderBy( tableActivity.dt_inc.desc() )
			.limit( 30 )
			.list( tableActivity );
	}
}
