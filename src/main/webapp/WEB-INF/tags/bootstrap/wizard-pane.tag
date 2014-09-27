<%@ attribute name="active" %>
<div class="wizard-pane fade ${not empty active ? 'in active' : ''}">
  <jsp:doBody/>
</div>