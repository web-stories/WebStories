package org.webstories.core.text.html;

import org.webstories.core.text.manipulable.BaseProcessor;
import org.webstories.core.text.manipulable.ProcessorAlias;

public class EntitiesProcessor {
	public static class Converter extends BaseProcessor {
		public Converter() {
			super( ProcessorAlias.HTML_ENTITIES );
		}
		@Override
		public String process( HTMLOutput message ) {
			String result = message.getCurrent();
			
			// XSS protection
			result = result
				.replace( "<", "&lt;" )
				.replace( ">", "&gt;" )
				.replace( "\"", "&quot;" );
				
			return result;
		}
	}
}
