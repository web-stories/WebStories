package org.webstories.dao.story;

import java.util.List;

import javax.ejb.Stateless;

import org.webstories.dao.Queries;

import com.mysema.query.jpa.impl.JPAQuery;

@Stateless
public class StoryQueries extends Queries {
	public List<MetaEntity> listAuthorStories( long idAuthor ) {
		QMetaEntity tableMeta = QMetaEntity.metaEntity;
		JPAQuery query = queryFrom( tableMeta ).where(
			tableMeta.story.author.id_user.eq( idAuthor )
		);
		return query.list( tableMeta );
	}
}
