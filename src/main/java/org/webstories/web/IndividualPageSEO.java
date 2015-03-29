package org.webstories.web;

import org.eclipse.jdt.annotation.Nullable;

public class IndividualPageSEO {
	private String description;
	private String title;
	private String author;
	private IndividualPageSEO( String description, String title, String author ) {
		this.description = description;
		this.title = title;
		this.author = author;
	}
	public @Nullable String getDescription() {
		return description;
	}
	public @Nullable String getTitle() {
		return title;
	}
	public @Nullable String getAuthor() {
		return author;
	}
	public static class Builder implements PageSEOBuilder<IndividualPageSEO> {
		private String description;
		private String title;
		private String author;
		@Override
		public PageSEOBuilder<IndividualPageSEO> description( String description ) {
			this.description = description;
			return this;
		}
		@Override
		public PageSEOBuilder<IndividualPageSEO> title( String title ) {
			this.title = title;
			return this;
		}
		@Override
		public PageSEOBuilder<IndividualPageSEO> author( String author ) {
			this.author = author;
			return this;
		}
		@Override
		public IndividualPageSEO build() {
			return new IndividualPageSEO( description, title, author );
		}
	}
}
