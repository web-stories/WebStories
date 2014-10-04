<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<%@ attribute name="chapter" required="true" %>
<div class="editor-chapter" id="chapter-${chapter}">
  <div class="editor-chapter-title">
    <h2 class="editor-chapter-title-header">
      Capítulo ${chapter}
    </h2>
    <input class="form-control editor-chapter-title-name" type="text">
  </div>
  <div class="editor-chapter-sections">
    <jsp:doBody/>
  </div>
  <button class="btn btn-primary btn-block btn-lg editor-section-add">
    <span class="icon-plus"></span>
  </button>
</div>