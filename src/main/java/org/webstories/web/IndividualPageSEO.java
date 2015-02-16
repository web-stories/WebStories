package org.webstories.web;

import org.eclipse.jdt.annotation.Nullable;

public class IndividualPageSEO {
	private String description;
	private IndividualPageSEO( String description ) {
		this.description = description;
	}
	public @Nullable String getDescription() {
		return description;
	}
	public static class Builder implements PageSEOBuilder<IndividualPageSEO> {
		private String description;
		@Override
		public PageSEOBuilder<IndividualPageSEO> description( String description ) {
			this.description = description;
			return this;
		}
		@Override
		public IndividualPageSEO build() {
			return new IndividualPageSEO( description );
		}
	}
}
