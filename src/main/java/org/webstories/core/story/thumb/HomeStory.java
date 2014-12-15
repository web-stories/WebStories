package org.webstories.core.story.thumb;

import org.webstories.core.story.StoryUtils;
import org.webstories.core.text.html.HTMLOutput;
import org.webstories.core.user.ThumbnailUserInfoFactory;
import org.webstories.core.user.UserInfo;
import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;

public class HomeStory implements HomeStoryThumb {
	private Long id;
	private HTMLOutput title;
	private HTMLOutput description;
	private UserInfo author;
	private boolean removable;
	
	public static HomeStory from( IdentifiableEntity author, StoryEntity story ) {
		MetaEntity meta = story.getMeta();
		HomeStory product = new HomeStory();
		
		product.id = meta.getId();
		product.title = HTMLOutput.fromUnsafeInput( meta.getTitle() );
		product.description = HTMLOutput.fromUnsafeInput( meta.getSummary() );
		
		ThumbnailUserInfoFactory factory = new ThumbnailUserInfoFactory( author );
		UserInfo authorInfo = new UserInfo( factory );
		product.author = authorInfo;
		
		product.removable = StoryUtils.isRemovable( story );
		
		return product;
	}
	
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public HTMLOutput getTitle() {
		return title;
	}
	@Override
	public HTMLOutput getDescription() {
		return description;
	}
	@Override
	public UserInfo getAuthor() {
		return author;
	}
	@Override
	public boolean isRemovable() {
		return removable;
	}
}
