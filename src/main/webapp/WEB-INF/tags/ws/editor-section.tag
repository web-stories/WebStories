<%@ attribute name="chapter" required="true" %>
<%@ attribute name="section" required="true" %>
<textarea class="form-control editor-chapter-section" id="section-${chapter}-${section}"
          rows="10"><jsp:doBody/></textarea>