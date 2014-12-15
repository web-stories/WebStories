package org.webstories.core.text.manipulable;

/**
 * To avoid conflicts, each processor is applied according to the order in this enum.
 */
public enum ProcessorAlias {
	/**
	 * Default HTML entities conversion
	 */
	HTML_ENTITIES,
	/**
	 * Given a text, convert to the respective HTML equivalent
	 */
	HTML_ELEMENTS,
}
