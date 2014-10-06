<%@ attribute name="chapter" required="true" %>
<%@ attribute name="section" required="true" %>
<div class="editor-chapter-section">
  <textarea class="form-control editor-chapter-section-text"
            id="section-${chapter}-${section}"
            rows="10"><jsp:doBody/></textarea>
  <div class="editor-chapter-section-footer">
    <button class="btn btn-primary editor-section-add">Nova seção</button>
  </div>
</div>