<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ attribute name="title" required="true" %>
<%@ attribute name="id" %>
<c:if test="${not empty id}">
  <c:set var="idAttribute">
    id="${id}"
  </c:set>
</c:if>
<div class="editor" ${idAttribute}>
  <div class="editor-title">
    <h1 class="editor-title-header">
      ${title}
    </h1>
  </div>
  <jsp:doBody/>
</div>