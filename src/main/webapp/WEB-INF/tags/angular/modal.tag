<%@ attribute name="directive" required="true" %>
<%@ attribute name="modalOptionsBackdrop" %>
<%@ attribute name="modalOptionsKeyboard" %>
<%@ attribute name="modalOptionsShow" %>
<%@ attribute name="modalShow" %>
<div class="modal fade" tabindex="-1" role="dialog"
     ${directive} modal-options-backdrop="${modalOptionsBackdrop}" modal-options-keyboard="${modalOptionsKeyboard}"
     modal-options-show="${modalOptionsShow}" modal-show="${modalShow}">
  <div class="modal-dialog">
    <div class="modal-content"><jsp:doBody/></div>
  </div>
</div>