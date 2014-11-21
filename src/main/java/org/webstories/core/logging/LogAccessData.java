package org.webstories.core.logging;

import java.util.ArrayList;
import java.util.List;

import com.google.common.base.Joiner;

public class LogAccessData extends AccessData {
	public LogAccessData( AccessDataFactory factory ) {
		super( factory );
	}
	
	@Override
	public String toString() {
		List<String> sections = new ArrayList<String>();
		
		uri = originalURI != null ? uri + " ( " + originalURI + " )" : uri;
		
		sections.add( method + " " + uri + " " + protocol );
		sections.add( Joiner.on( "\n" ).withKeyValueSeparator( ": " ).join( headers ) );
		sections.add( Joiner.on( "&" ).withKeyValueSeparator( "=" ).join( parameters ) );
		
		return Joiner.on( "\n\n" ).join( sections );
	}
}
