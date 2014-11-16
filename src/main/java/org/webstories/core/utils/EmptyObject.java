package org.webstories.core.utils;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonValue;

public final class EmptyObject implements Serializable {
	private static final long serialVersionUID = 1;
	// For JAX-RS serialization
	@Override
	@JsonValue
	public String toString() {
		return "{}";
	}
}
