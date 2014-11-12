package org.webstories.core.story.impl;

import org.webstories.core.story.HomeStoryThumb;
import org.webstories.core.story.StoryUtils;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;
import org.webstories.dao.story.StoryEntity;

public class HomeStory implements HomeStoryThumb {
	private Long id;
	private HTMLText title;
	private HTMLText description;
	private String author;
	private String authorAvatar;
	private String authorProfile;
	private boolean removable;
	public static HomeStory from( IdentifiableEntity author, StoryEntity story ) {
		MetaEntity meta = story.getMeta();
		HomeStory product = new HomeStory();
		
		product.id = meta.getId();
		product.title = HTMLText.fromPlainText( meta.getTitle() );
		product.description = HTMLText.fromPlainText( meta.getSummary() );
		product.author = author.getFirstName();
		product.authorProfile = author.getProfileURL();
		product.authorAvatar = author.getAvatarURL();
		product.removable = StoryUtils.isRemovable( story );
		
		return product;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public HTMLText getTitle() {
		return title;
	}
	@Override
	public HTMLText getDescription() {
		return description;
	}
	@Override
	public String getAuthor() {
		return author;
	}
	@Override
	public String getAuthorAvatar() {
		return authorAvatar;
	}
	@Override
	public String getAuthorProfile() {
		return authorProfile;
	}
	@Override
	public boolean isRemovable() {
		return removable;
	}
}
