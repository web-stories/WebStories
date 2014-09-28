<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="id" required="true" %>
<%@ attribute name="title" required="true" %>
<%@ attribute name="closeable" %>
<div class="modal fade" id="${id}" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <c:if test="${empty closeable}">
          <button class="close" data-dismiss="modal" type="button">&times;</button>
        </c:if>
        <h4 class="modal-title">${title}</h4>
      </div>
      <jsp:doBody/>
    </div>
  </div>
</div>