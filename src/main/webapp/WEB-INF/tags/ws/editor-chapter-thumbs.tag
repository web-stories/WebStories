<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ attribute name="id" %>
<c:if test="${not empty id}">
  <c:set var="idAttribute">
    id="${id}"
  </c:set>
</c:if>
<div class="editor-chapter-thumbs" ${idAttribute}>
  <ul class="nav">
    <jsp:doBody/>
  </ul>
  <button class="btn btn-primary btn-block editor-chapter-thumb-add">
    Novo capítulo
  </button>
</div>