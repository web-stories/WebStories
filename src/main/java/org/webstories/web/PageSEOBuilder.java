package org.webstories.web;

public interface PageSEOBuilder<T> {
	PageSEOBuilder<T> description( String description );
	PageSEOBuilder<T> title( String title );
	T build();
}
