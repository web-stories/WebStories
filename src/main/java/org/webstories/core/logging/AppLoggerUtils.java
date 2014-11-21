package org.webstories.core.logging;

import org.webstories.dao.logging.AccessEntity;
import org.webstories.dao.user.UserEntity;

public class AppLoggerUtils {
	public static AccessEntity createAccess( String ip, String data ) {
		AccessEntity access = new AccessEntity();
		access.setIp( ip );
		access.setData( data );
		return access;
	}
	/**
	 * @param  loggedUser
	 *         A managed and persistent user instance  
	 */
	public static AccessEntity createAccess( String ip, String data, UserEntity loggedUser ) {
		AccessEntity access = new AccessEntity();
		access.setIp( ip );
		access.setData( data );
		access.setLogged( loggedUser );
		return access;
	}
}
