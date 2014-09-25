package org.webstories.core.resources;

import java.util.Properties;

public class Facebook {
	private FacebookApp app;
	private Facebook( FacebookApp app ) {
		this.app = app;
	}
	public static Facebook from( Properties properties ) {
		FacebookApp app = FacebookApp.from( properties );
		return new Facebook( app );
	}
	public FacebookApp getApp() {
		return app;
	}
}
