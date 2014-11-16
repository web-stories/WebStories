<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="sectionId" %>
<c:if test="${not empty sectionId}">
  <c:set var="dataSectionId">
    data-section-id="${sectionId}"
  </c:set>
  <c:set var="textareaLabelId">
    for="section-${sectionId}"
  </c:set>
  <c:set var="textareaId">
    id="section-${sectionId}"
  </c:set>
</c:if>
<div class="editor-chapter-section" ${dataSectionId}>
  <textarea class="form-control editor-chapter-section-text" ${textareaId}><jsp:doBody/></textarea>
  <div class="editor-chapter-section-footer">
    <div class="row">
      <div class="col-md-6">
        <label class="control-label editor-section-footer-msg" ${textareaLabelId}><!--
          Element should be empty to trigger :empty pseudo selector
        --></label>
      </div>
      <div class="col-md-6">
        <div class="editor-section-footer-toolbar">
          <button class="btn btn-primary editor-section-add">Nova seção</button>
          <button class="btn btn-danger editor-section-delete">
            <span class="icon-trash"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>