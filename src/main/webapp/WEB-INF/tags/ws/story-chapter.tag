<%@ tag pageEncoding="UTF-8" %>
<%@ attribute name="chapter" required="true" %>
<%@ attribute name="title" required="true" %>
<div class="step story-content-step story-chapter" id="section-${chapter}-0"
     data-transition-duration="600">
  <h2 class="story-chapter-title">
    Capítulo ${chapter}
    <small class="story-chapter-name">${title}</small>
  </h2>
</div>
<jsp:doBody/>