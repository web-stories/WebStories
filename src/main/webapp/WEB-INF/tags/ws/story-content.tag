<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ attribute name="storyTitle" required="true" %>
<%@ attribute name="storySummary" required="true" %>
<div class="story-content">
  <div id="slides-container" data-transition-duration="300">
    <div class="step story-details" id="section-0-0">
      <h1 class="story-details-title">
        ${storyTitle}
        <small class="story-details-summary">${storySummary}</small>
      </h1>
    </div>
    <jsp:doBody/>
  </div>
</div>
<div class="story-footer">
  <div class="container">
    ${storyTitle}
  </div>
</div>