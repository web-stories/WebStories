<%@ attribute name="firstPane" %>
<button class="btn btn-default wizard-control-prev" ${not empty firstPane ? 'disabled' : ''}>
  <span class="icon-left"></span>
  <jsp:doBody/>
</button>