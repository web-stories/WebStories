<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ attribute name="published" %>
<%@ attribute name="chapter" required="true" %>
<c:if test="${published}">
  <c:set var="publishedDisabledState">
    disabled=""
  </c:set>
</c:if>
<li>
  <a class="editor-chapter-thumb" href="#chapter-${chapter}">
    Capítulo ${chapter}
  </a>
  <c:if test="${not empty published}">
    <button class="btn btn-default btn-sm editor-chapter-thumb-publish" ${publishedDisabledState}>
      <c:if test="${published}">
        <span class="icon-checkmark"></span>
        Publicado
      </c:if>
      <c:if test="${not published}">
        Publicar
      </c:if>
    </button>
  </c:if>
</li>