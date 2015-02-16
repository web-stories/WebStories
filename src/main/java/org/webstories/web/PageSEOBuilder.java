package org.webstories.web;

public interface PageSEOBuilder<T> {
	PageSEOBuilder<T> description( String description );
	T build();
}
