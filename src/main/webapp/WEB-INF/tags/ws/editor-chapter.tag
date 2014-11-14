<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<%@ attribute name="chapter" required="true" %>
<%@ attribute name="chapterId" %>
<%@ attribute name="title" %>
<%@ attribute name="published" %>
<c:if test="${not empty chapterId}">
  <c:set var="dataChapterId">
    data-chapter-id="${chapterId}"
  </c:set>
</c:if>
<div class="editor-chapter" ${dataChapterId} id="chapter-${chapter}">
  <div class="editor-chapter-title">
    <h2 class="editor-chapter-title-header">
      Capítulo
      <span class="editor-chapter-title-header-number">
        ${chapter}
      </span>
      <c:if test="${published}">
        <small class="text-success">
          publicado
        </small>
      </c:if>
      <c:if test="${ not published }">
        <small>
          rascunho
        </small>
      </c:if>
    </h2>
    <input class="form-control editor-chapter-title-name" type="text" value="${title}">
  </div>
  <div class="editor-chapter-sections">
    <jsp:doBody/>
  </div>
</div>