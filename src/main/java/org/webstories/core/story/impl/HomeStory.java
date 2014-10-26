package org.webstories.core.story.impl;

import org.webstories.core.story.StoryThumb;
import org.webstories.core.text.html.HTMLMessage;
import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;

public class HomeStory implements StoryThumb {
	private Long id;
	private HTMLMessage title;
	private HTMLMessage description;
	private String author;
	public static HomeStory from( IdentifiableEntity author, MetaEntity meta ) {
		HomeStory product = new HomeStory();
		product.id = meta.getId();
		product.title = HTMLMessage.fromPlainText( meta.getTitle() );
		product.description = HTMLMessage.fromPlainText( meta.getSummary() );
		product.author = author.getFirstName();
		return product;
	}
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public HTMLMessage getTitle() {
		return title;
	}
	@Override
	public HTMLMessage getDescription() {
		return description;
	}
	@Override
	public String getAuthor() {
		return author;
	}
}
