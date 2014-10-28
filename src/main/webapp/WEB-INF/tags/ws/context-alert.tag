<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="show" required="true" %>
<c:if test="${show eq 'true'}">
  <div class="alert-container">
    <div class="alert alert-success fade in">
      <button class="close" data-dismiss="alert" type="button">&times;</button>
      <jsp:doBody/>
    </div>
  </div>
</c:if>