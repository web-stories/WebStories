package org.webstories.web.util.params;

public class DefaultRequestParam implements RequestParam {
	private String value;
	public DefaultRequestParam( String value ) {
		this.value = value;
	}
	@Override
	public Long toLong() {
		if ( value == null ) {
			return null;
		}
		if ( value.isEmpty() ) {
			return 0L;
		}
		return Long.parseLong( value );
	}
	@Override
	public Integer toInteger() {
		if ( value == null ) {
			return null;
		}
		if ( value.isEmpty() ) {
			return 0;
		}
		return Integer.parseInt( value );
	}
	@Override
	public Double toDouble() {
		if ( value == null ) {
			return null;
		}
		if ( value.isEmpty() ) {
			return 0d;
		}
		return Double.parseDouble( value );
	}
	@Override
	public Boolean toBoolean() {
		if ( value == null ) {
			return null;
		}
		return "true".equals( value );
	}
	@Override
	public String toString() {
		return value;
	}
	@Override
	public boolean isEmpty() {
		if ( value == null ) {
			return true;
		}
		return value.isEmpty();
	}
	@Override
	public boolean exists() {
		return value != null;
	}
}
