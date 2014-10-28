<%@ tag pageEncoding="UTF-8" %>
<%@ attribute name="chapter" required="true" %>
<%@ attribute name="section" required="true" %>
<div class="step story-section" id="section-${chapter}-${section}">
  <jsp:doBody/>
</div>