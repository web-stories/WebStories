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
    <div class="row">
      <div class="col-sm-6 col-md-8 col-lg-9">
        (menu)
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 story-footer-title">
        ${storyTitle}
      </div>
    </div>
  </div>
</div>