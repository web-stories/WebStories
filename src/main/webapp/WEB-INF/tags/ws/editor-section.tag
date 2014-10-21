<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ attribute name="sectionId" %>
<c:if test="${not empty sectionId}">
  <c:set var="dataSectionId">
    data-section-id="${sectionId}"
  </c:set>
</c:if>
<div class="editor-chapter-section" ${dataSectionId}>
  <textarea class="form-control editor-chapter-section-text" rows="10"><jsp:doBody/></textarea>
  <div class="editor-chapter-section-footer">
    <button class="btn btn-primary editor-section-add">Nova seção</button>
    <button class="btn btn-danger editor-section-delete">
      <span class="icon-trash"></span>
    </button>
  </div>
</div>