package org.webstories.dao.story;

import java.util.List;

import javax.ejb.Stateless;

import org.webstories.dao.Queries;

import com.mysema.query.jpa.impl.JPAQuery;

@Stateless
public class StoryQueries extends Queries {
	public List<StoryEntity> listAuthorStories( long idAuthor ) {
		QStoryEntity tableStory = QStoryEntity.storyEntity;
		JPAQuery query = queryFrom( tableStory ).where(
			tableStory.author.id_user.eq( idAuthor )
		);
		return query.list( tableStory );
	}
	public List<StoryEntity> listLastStories( int limit ) {
		QStoryEntity tableStory = QStoryEntity.storyEntity;
		JPAQuery query = queryFrom( tableStory )
			.orderBy( tableStory.id_story.desc() )
			.limit( limit );
		return query.list( tableStory );
	}
	public StoryEntity findByPrimaryKey( long idStory ) {
		return entityManager.find( StoryEntity.class, idStory );
	}
}
