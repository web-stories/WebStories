package org.webstories.core.text.html;

public class EntitiesProcessor {
	public static class Converter extends BaseProcessor {
		public Converter() {
			super( ProcessorAlias.HTML_ENTITIES );
		}
		@Override
		public String process( Message message ) {
			String result = message.getCurrent();
			
			// XSS protection
			result = result
				.replace( "<", "&lt;" )
				.replace( ">", "&gt;" );
				
			return result;
		}
	}
	public static class Reverter extends BaseProcessor {
		public Reverter() {
			super( ProcessorAlias.HTML_ENTITIES_REVERT );
		}
		@Override
		public String process( Message message ) {
			String result = message.getCurrent();
			
			result = result
				.replace( "&lt;", "<" )
				.replace( "&gt;", ">" );
				
			return result;
		}
	}

}
