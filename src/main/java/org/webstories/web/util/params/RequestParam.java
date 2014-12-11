package org.webstories.web.util.params;

public interface RequestParam {
	Long toLong();
	Integer toInteger();
	Boolean toBoolean();
	Double toDouble();
	String toString();
	boolean isEmpty();
	boolean exists();
}
