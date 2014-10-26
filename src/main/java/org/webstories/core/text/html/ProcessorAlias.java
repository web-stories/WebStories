package org.webstories.core.text.html;

/**
 * To avoid conflict, each processor is applied according to the order in this enum.
 */
public enum ProcessorAlias {
	/**
	 * Default HTML entities conversion
	 */
	HTML_ENTITIES,
	HTML_ENTITIES_REVERT,
	/**
	 * Given a text, convert to the respective HTML equivalent
	 */
	HTML_ELEMENTS,
	HTML_ELEMENTS_REVERT,
}
