<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<jsp:include page="/jsp/include/header.jsp"/>
<div id="meta" data-story-id="${story.id}"></div>
<div id="action-alert"></div>
<div class="container">
  <ol class="breadcrumb breadcumb-clear toolbar">
    <li>
      <a href="${pageContext.request.contextPath}/home/projects">
        <span class="icon-draft"></span>
        Meus projetos
      </a>
    </li>
    <li class="active">
      ${story.title}
    </li>
  </ol>
</div>
<div class="container">
  <ul class="nav nav-tabs editor-tabs">
    <li class="active">
      <a href="${pageContext.request.contextPath}/home/projects/?id=${story.id}">
        História
      </a>
    </li>
    <li>
      <a href="${pageContext.request.contextPath}/home/projects/details?id=${story.id}">
        Detalhes
      </a>
    </li>
  </ul>
</div>
<div class="container">
  <div class="editor"
       ng-controller="StoryController"
       ng-init="init( ${story.id} )">
    <div class="editor-title">
      <h1 class="editor-title-header">
        ${story.title}
        <br>
        <small>${story.summary}</small>
      </h1>
    </div>
    <div class="row">
      <div class="col-sm-8 col-lg-9">
        <div class="editor-chapters"
             ng-controller="EditableController"
             ng-cloak>
          <div class="editor-chapter" id="chapter-{{ chapter.position }}"
               ng-repeat="chapter in chapters">
            <div class="editor-chapter-title">
              <h2 class="editor-chapter-title-header">
                Capítulo
                <span class="editor-chapter-title-header-number">
                  {{ chapter.position }}
                </span>
                <small class="text-success" ng-show="chapter.published">
                  publicado
                </small>
                <small ng-show="!chapter.published">
                  rascunho
                </small>
              </h2>
              <input class="form-control editor-chapter-title-name" type="text"
                     ng-model="chapter.title">
            </div>
            <div class="editor-chapter-sections">
              <div class="editor-chapter-section"
                   ng-repeat="section in chapter.sections">
                <textarea class="form-control editor-chapter-section-text" id="section-{{ section.position }}"
                          ng-model="section.text"></textarea>
                <div class="editor-chapter-section-footer">
                  <div class="row">
                    <div class="col-md-6">
                      <label class="control-label editor-section-footer-msg" for="section-{{ section.position }}"><!--
                        Element should be empty to trigger :empty pseudo selector
                      --></label>
                    </div>
                    <div class="col-md-6">
                      <div class="editor-section-footer-toolbar">
                        <button class="btn btn-primary editor-section-add">Nova seção</button>
                        <button class="btn btn-danger editor-section-delete">
                          <span class="icon-trash"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-lg-3 hidden-xs">
        <div class="editor-chapter-thumbs" id="chapter-menu"
             ng-controller="MenuController"
             ng-cloak>
          <ul class="nav nav-pills nav-stacked editor-chapter-thumbs-items">
            <li class="editor-chapter-thumbs-item"
                ng-repeat="chapter in chapters">
              <a class="editor-chapter-thumb" href="#chapter-{{ chapter.position }}">
                Capítulo {{ chapter.position }}
              </a>
              <div ng-show="chapter.publishable !== null">
                <input type="hidden" name="chapterId" value="{{ chapter.id }}">
                <button class="btn btn-default btn-sm editor-chapter-thumb-publish" type="button"
                        ng-disabled="!chapter.publishable"
                        ng-click="publish( chapter.id )">
                  <span ng-show="!chapter.publishable">
                    <span class="icon-checkmark"></span>
                      Publicado
                  </span>
                  <span ng-show="chapter.publishable">
                    Publicar
                  </span>
                </button>
              </div>
            </li>
          </ul>
          <button class="btn btn-default btn-block editor-chapter-thumb-add"
                  ng-click="addChapter()">
            Novo capítulo
          </button>
        </div>
      </div>
    </div>
  </div>
</div>