package org.webstories.core.text.manipulable;



public abstract class BaseProcessor implements ProcessorVisitor {
	private ProcessorAlias alias;
	public BaseProcessor( ProcessorAlias alias ) {
		this.alias = alias;
	}
	@Override
	public ProcessorAlias getAlias() {
		return alias;
	}
	@Override
	public int compareTo( ProcessorVisitor other ) {
		return this.getAlias().compareTo( other.getAlias() );
	}
}
