<%@ tag pageEncoding="UTF-8" %>
<%@ attribute name="title" required="true" %>
<div class="story-content">
  <div id="slides-container" data-transition-duration="300">
    <jsp:doBody/>
  </div>
</div>
<div class="story-footer">
  <div class="container">
    ${title}
  </div>
</div>