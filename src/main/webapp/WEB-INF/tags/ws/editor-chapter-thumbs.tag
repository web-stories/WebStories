<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="id" %>
<c:if test="${not empty id}">
  <c:set var="idAttribute">
    id="${id}"
  </c:set>
</c:if>
<div class="editor-chapter-thumbs" ${idAttribute}>
  <ul class="nav nav-pills nav-stacked editor-chapter-thumbs-items">
    <jsp:doBody/>
  </ul>
  <button class="btn btn-default btn-block editor-chapter-thumb-add">
    Novo capítulo
  </button>
</div>