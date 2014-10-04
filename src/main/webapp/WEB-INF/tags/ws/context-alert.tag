<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="show" required="true" %>
<c:if test="${show eq 'true'}">
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="alert alert-success fade in">
          <button class="close" data-dismiss="alert" type="button">&times;</button>
          <jsp:doBody/>
        </div>
      </div>
    </div>
  </div>
</c:if>