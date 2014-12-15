package org.webstories.core.text;


public interface ManipulableText {
	/**
	 * The current text after being manipulated or not
	 */
	String getCurrent();
	/**
	 * The original raw text without any manipulation
	 */
	String getContent();
}
