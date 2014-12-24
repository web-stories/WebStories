<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<jsp:include page="/jsp/include/header.jsp"/>
<div ng-controller="PageController" ng-cloak>
  <div class="loading-dots" ng-show="!loader.loaded">
    <img src="${pageContext.request.contextPath}/static/img/loading-dots.gif">
  </div>
  <ws-alert data="alert"></ws-alert>
  <div class="story"
       ng-show="loader.loaded"
       ng-controller="StoryController"
       ng-init="init( ${param.id} )">
    <div class="story-content">
      <div class="container">
        <div jmpress-root
             jmpress-steps="story.slides">
          <div class="step"
               ng-repeat="slide in story.slides" ng-attr-id="section-{{ slide.chapter }}-{{ slide.section }}">
            <div ng-if="slide.type === 'INTRO'">
              <h1 class="story-home-title">
                {{ slide.title }}
                <small class="story-home-summary">
                  {{ slide.summary }}
                </small>
              </h1>
            </div>
            <div class="story-chapter" ng-if="slide.type === 'CHAPTER'">
              <h2 class="story-chapter-title">
                Capítulo {{ slide.chapter }}
                <small class="story-chapter-name">{{ slide.title }}</small>
              </h2>
            </div>
            <div class="story-section" ng-if="slide.type === 'SECTION'">
              <span ng-bind-html="slide.text | htmlTrusted"></span>
            </div>
          </div>
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
  </div>
</div>