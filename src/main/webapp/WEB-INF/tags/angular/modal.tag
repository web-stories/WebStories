<%@ attribute name="directive" required="true" %>
<%@ attribute name="modalOptionsBackdrop" %>
<%@ attribute name="modalOptionsKeyboard" %>
<%@ attribute name="modalOptionsShow" %>
<%@ attribute name="modalOnShow" %>
<%@ attribute name="modalOnShown" %>
<%@ attribute name="modalOnHide" %>
<%@ attribute name="modalOnHidden" %>
<%@ attribute name="modalShow" %>
<div class="modal fade" tabindex="-1" role="dialog"
     ${directive}
     modal-options-backdrop="${modalOptionsBackdrop}" modal-options-keyboard="${modalOptionsKeyboard}" modal-options-show="${modalOptionsShow}"
     modal-show="${modalShow}"
     modal-on-show="${modalOnShow}" modal-on-shown="${modalOnShown}"
     modal-on-hide="${modalOnHide}" modal-on-hidden="${modalOnHidden}">
  <div class="modal-dialog">
    <div class="modal-content"><jsp:doBody/></div>
  </div>
</div>