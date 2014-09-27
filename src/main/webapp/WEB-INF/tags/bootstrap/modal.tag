<%@ attribute name="id" required="true" %>
<%@ attribute name="title" required="true" %>
<div class="modal fade" id="${id}" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" data-dismiss="modal" type="button"></button>
        <h4 class="modal-title">${title}</h4>
      </div>
      <jsp:doBody/>
    </div>
  </div>
</div>