<%@ attribute name="chapter" required="true" %>
<%@ attribute name="title" required="true" %>
<div class="step story-chapter" id="section-${chapter}-0">
  <h1 class="story-chapter-title">
    Capítulo ${chapter}
    <small class="story-chapter-name">${title}</small>
  </h1>
</div>
<jsp:doBody/>