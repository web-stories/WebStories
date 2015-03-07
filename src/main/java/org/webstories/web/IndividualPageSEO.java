package org.webstories.web;

import org.eclipse.jdt.annotation.Nullable;

public class IndividualPageSEO {
	private String description;
	private String title;
	private IndividualPageSEO( String description, String title ) {
		this.description = description;
		this.title = title;
	}
	public @Nullable String getDescription() {
		return description;
	}
	public @Nullable String getTitle() {
		return title;
	}
	public static class Builder implements PageSEOBuilder<IndividualPageSEO> {
		private String description;
		private String title;
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
		public IndividualPageSEO build() {
			return new IndividualPageSEO( description, title );
		}
	}
}
