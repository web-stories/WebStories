package org.webstories.core.story;

import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;

public class FeaturedStoryItem implements StoryThumb {
	private Long id;
	private String title;
	private String description;
	private String author;
	public static FeaturedStoryItem from( IdentifiableEntity author, MetaEntity meta ) {
		FeaturedStoryItem product = new FeaturedStoryItem();
		product.id = meta.getId();
		product.title = meta.getTitle();
		product.description = meta.getSummary();
		product.author = author.getFirstName();
		return product;
	}
	@Override
	public Long getId() {
		return id;
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
