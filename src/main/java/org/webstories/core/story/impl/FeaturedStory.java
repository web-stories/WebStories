package org.webstories.core.story.impl;

import org.webstories.core.story.StoryThumb;
import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.story.MetaEntity;

public class FeaturedStory implements StoryThumb {
	private Long id;
	private HTMLText title;
	private HTMLText description;
	private String author;
	private String authorAvatar;
	public static FeaturedStory from( FacebookEntity author, MetaEntity meta ) {
		FeaturedStory product = new FeaturedStory();
		product.id = meta.getId();
		product.title = HTMLText.fromPlainText( meta.getTitle() ); 
		product.description = HTMLText.fromPlainText( meta.getSummary() );
		product.author = author.getFirstName();
		
		String url = "https://graph.facebook.com/" +  author.getFacebookId() + "/picture";
		String query = "type=large";
		product.authorAvatar = url + "?" + query;
		
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
}
