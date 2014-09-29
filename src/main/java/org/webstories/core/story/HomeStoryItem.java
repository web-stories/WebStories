package org.webstories.core.story;

import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;

public class HomeStoryItem implements StoryThumb {
	private String title;
	private String description;
	private String author;
	public static HomeStoryItem from( IdentifiableEntity author, MetaEntity meta ) {
		HomeStoryItem product = new HomeStoryItem();
		product.title = meta.getTitle();
		product.description = meta.getSummary();
		product.author = author.getFirstName();
		return product;
	}
	@Override
	public String getTitle() {
		return title;
	}
	@Override
	public String getDescription() {
		return description;
	}
	@Override
	public String getAuthor() {
		return author;
	}
}
