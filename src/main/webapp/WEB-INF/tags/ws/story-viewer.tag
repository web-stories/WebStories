<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="isPreview" %>

<c:if test="${ empty isPreview }">
  <c:set var="isPreview" value="false"/>
</c:if>

<div ng-controller="PageController">
  <div class="loading-dots" ng-show="!loader.loaded">
    <img src="${pageContext.request.contextPath}/static/img/loading-dots.gif">
  </div>
  <ws-alert data="alert"></ws-alert>
  <div ng-show="loader.loaded"
       ng-controller="StoryController"
       ng-cloak>
    <div class="story">
      <div class="story-content">
        <div class="container"
             ng-controller="SlidesController"
             ng-init="init( ${param.id}, ${isPreview} )">
          <div jmpress-root
               jmpress-steps="story.slides"
               data-transition-duration="300">
            <div class="step"
                 ng-repeat="slide in steps"
                 ng-class="{ 'story-chapter': slide.type === 'CHAPTER' }"
                 ng-attr-id="section-{{ slide.chapter }}-{{ slide.section }}"
                 jmpress-step>
              <div class="story-content">
                <div ng-if="slide.type === 'INTRO'">
                  <h1 class="story-title">
                    {{ slide.title }}
                    <small class="story-intro-summary">
                      {{ slide.summary }}
                    </small>
                  </h1>
                </div>
                <div ng-if="slide.type === 'CHAPTER'">
                  <h2 class="story-title">
                    Capítulo {{ slide.chapter }}
                    <small class="story-chapter-name">{{ slide.title }}</small>
                  </h2>
                </div>
                <div ng-if="slide.type === 'SECTION'">
                  <span ng-bind-html="slide.text | htmlTrusted"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="story-footer">
        <div class="container story-controls" ng-controller="ControlsController">
          <button class="btn btn-default story-controls-prev-chapter"
                  ng-class="{ 'story-controls-visible': story.controls.prevChapter }"
                  ng-click="prevChapter( story.controls.prevChapter )">
            Cap. {{ story.controls.prevChapter }}
          </button>
          <div class="btn-group">
            <button class="btn btn-default story-prev"
                    ng-click="prevSlide()">
              <span class="icon-previous"></span>
            </button>
            <button class="btn btn-default story-stop"
                    ng-click="stop()">
              <span class="icon-stop"></span>
            </button>
            <button class="btn btn-default story-next"
                    ng-click="nextSlide()">
              <span class="icon-next"></span>
            </button>
          </div>
          <button class="btn btn-default story-controls-next-chapter"
                  ng-class="{ 'story-controls-visible': story.controls.nextChapter }"
                  ng-click="nextChapter( story.controls.nextChapter )">
            Cap. {{ story.controls.nextChapter }}
          </button>
        </div>
      </div>
    </div>
    <div ng-controller="ChapterEndingController">
      <div class="modal fade" tabindex="-1" role="dialog"
           bs-modal
           is-open="modal.open"
           show="false"
           backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                {{ modal.title }}
              </h4>
            </div>
            <div class="modal-body">
              <div ng-if="story.finished">
                <p>
                  Obrigado por ler esta história!<br>
                </p>
              </div>
              <div ng-if="!story.finished">
                <p>
                  Este capítulo chegou ao fim, mas a história ainda não acabou!
                </p>
                <p>
                  Fique ligado!
                </p>
              </div>
              <p class="text-muted">
                Se quiser ficar por dentro ou ajudar com sugestões visite  
                <a href="http://facebook.com/webstories.org">fb.com/webstories.org</a>.
              </p>
            </div>
            <div class="modal-footer">
              <a class="btn btn-primary" type="button" href="${pageContext.request.contextPath}/">
                Página inicial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>