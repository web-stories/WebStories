<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ attribute name="publishable" %>
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
    <button class="btn btn-default btn-sm editor-chapter-thumb-publish" ${publishableDisabledState}>
      <c:if test="${not publishable}">
        <span class="icon-checkmark"></span>
        Publicado
      </c:if>
      <c:if test="${publishable}">
        Publicar
      </c:if>
    </button>
  </c:if>
</li>