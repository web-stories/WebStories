<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="storyTitle" required="true" %>
<%@ attribute name="storySummary" required="true" %>
<div class="story-content">
  <div class="container">
    <div id="slides-container" data-transition-duration="300">
      <div class="step story-home" id="section-0-0">
        <h1 class="story-home-title">
          ${storyTitle}
          <small class="story-home-summary">${storySummary}</small>
        </h1>
      </div>
      <jsp:doBody/>
    </div>
  </div>
</div>
<div class="story-footer">
  <div class="container story-controls">
    <button class="btn btn-default story-controls-prev-chapter">?</button>
    <div class="btn-group">
      <button class="btn btn-default story-prev">
        <span class="icon-previous"></span>
      </button>
      <button class="btn btn-default story-stop">
        <span class="icon-stop"></span>
      </button>
      <button class="btn btn-default story-next">
        <span class="icon-next"></span>
      </button>
    </div>
    <button class="btn btn-default story-controls-next-chapter">?</button>
  </div>
</div>