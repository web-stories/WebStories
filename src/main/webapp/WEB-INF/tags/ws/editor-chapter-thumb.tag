<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ attribute name="publishable" %>
<%@ attribute name="chapterId" %>
<%@ attribute name="chapter" required="true" %>
<c:if test="${not publishable}">
  <c:set var="publishableDisabledState">
    disabled=""
  </c:set>
</c:if>
<li>
  <a class="editor-chapter-thumb" href="#chapter-${chapter}">
    Capítulo ${chapter}
  </a>
  <c:if test="${not empty publishable}">
    <form action="${pageContext.request.contextPath}/home/projects/publish" method="post">
      <input type="hidden" name="chapterId" value="${chapterId}">
      <button class="btn btn-default btn-sm editor-chapter-thumb-publish" type="button" ${publishableDisabledState}>
        <c:if test="${not publishable}">
          <span class="icon-checkmark"></span>
          Publicado
        </c:if>
        <c:if test="${publishable}">
          Publicar
        </c:if>
      </button>
    </form>
  </c:if>
</li>