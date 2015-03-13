package org.webstories.dao.invitation;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.eclipse.jdt.annotation.Nullable;
import org.webstories.core.invitation.InviteUtils;
import org.webstories.core.utils.SHA256Exception;
import org.webstories.dao.NumerableEntity;
import org.webstories.dao.user.UserEntity;

@Entity
@Table( name = "ws_invite" )
public class InviteEntity implements NumerableEntity {
	private InviteEntity() {}
	
	@Id
	@TableGenerator(
		name = "invite_sequence",
		pkColumnValue = "invite_sequence",
		table = "invite_sequences",
		allocationSize = 1
	)
	@GeneratedValue( strategy = GenerationType.TABLE, generator = "invite_sequence" )
	private Long id_invite;
	
	@Column( unique = true, length = 255 )
	private @Nullable String ds_email;
	
	@Column( nullable = false, unique = true, length = 255 )
	private String cod_invite;
	
	@ManyToOne( optional = false )
	@JoinColumn( name = "id_inviter", nullable = false )
	private UserEntity inviter;
	
	@OneToOne
	@JoinColumn( name = "id_invited" )
	@Nullable private UserEntity invited;
	
	/**
	 * 
	 * @param  inviter
	 *         A managed and persistent instance
	 */
	public static InviteEntity create( UserEntity inviter ) throws SHA256Exception {
		InviteEntity invite = new InviteEntity();
		invite.cod_invite = InviteUtils.generateCode();
		invite.inviter = inviter;
		return invite;
	}
	
	@Override
	public Long getId() {
		return id_invite;
	}
	
	public @Nullable String getEmail() {
		return ds_email;
	}
	public void setEmail( String ds_email ) {
		this.ds_email = ds_email;
	}
	
	public String getInviteCode() {
		return cod_invite;
	}
	
	public UserEntity getInviter() {
		return inviter;
	}
	
	public @Nullable UserEntity getInvited() {
		return invited;
	} 
	public void setInvited( UserEntity invited ) {
		this.invited = invited;
	}
}
