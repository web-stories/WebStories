package org.webstories.core.story.impl;

import org.webstories.core.story.StoryThumb;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;

public class FeaturedStory implements StoryThumb {
	private Long id;
	private HTMLText title;
	private HTMLText description;
	private String author;
	public static FeaturedStory from( IdentifiableEntity author, MetaEntity meta ) {
		FeaturedStory product = new FeaturedStory();
		product.id = meta.getId();
		product.title = HTMLText.fromPlainText( meta.getTitle() ); 
		product.description = HTMLText.fromPlainText( meta.getSummary() );
		product.author = author.getFirstName();
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
}
