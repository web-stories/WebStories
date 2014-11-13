package org.webstories.core.story.thumb;

import org.webstories.core.text.html.HTMLText;
import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;

public class FeaturedStory implements StoryThumb {
	private Long id;
	private HTMLText title;
	private HTMLText description;
	private String author;
	private String authorAvatar;
	private String authorProfile;
	public static FeaturedStory from( IdentifiableEntity author, MetaEntity meta ) {
		FeaturedStory product = new FeaturedStory();
		
		product.id = meta.getId();
		product.title = HTMLText.fromPlainText( meta.getTitle() ); 
		product.description = HTMLText.fromPlainText( meta.getSummary() );
		product.author = author.getFirstName();
		product.authorProfile = author.getProfileURL();
		product.authorAvatar = author.getAvatarURL();
		
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
}
