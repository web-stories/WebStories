package org.webstories.core.invitation;

import java.util.UUID;

import org.webstories.core.utils.SHA256;
import org.webstories.core.utils.SHA256Exception;

public class InviteUtils {
	public static String generateCode() throws SHA256Exception {
		Long now = System.currentTimeMillis();
		String sum = UUID.randomUUID() + now.toString();
		return SHA256.encrypt( sum ).substring( 0, 30 );
	}
}
