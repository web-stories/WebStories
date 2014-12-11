<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ng" tagdir="/WEB-INF/tags/angular" %>
<jsp:include page="/jsp/include/header.jsp"/>
<div ng-controller="PageController">
  <ng:modal directive="bs-modal" modalShow="previewModal.show"
            modalOptionsShow="false"
            modalOnHidden="unloadPreview()">
    <div class="modal-header">
      <button class="close" type="button" data-dismiss="modal">&times;</button>
      <h4 class="modal-title">Pré-visualização</h4>
    </div>
    <div class="modal-body">
      <iframe class="preview-box" ng-src="{{ previewURL | trusted }}"></iframe>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" type="button" data-dismiss="modal">Fechar</button>
    </div>
  </ng:modal>
  <ws-alert data="alert"></ws-alert>
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
          Editor
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
    <div class="editor" ng-controller="EditorController" ng-init="init( ${story.id} )">
      <div class="editor-title">
        <h1 class="editor-title-header">
          ${story.title}
          <br>
          <small>${story.summary}</small>
        </h1>
      </div>
      <div class="loading-dots" ng-show="!loader.ready">
        <img src="${pageContext.request.contextPath}/static/img/loading-dots.gif">
      </div>
      <div class="row" ng-cloak>
        <div class="col-sm-8 col-lg-9">
          <div class="editor-chapters"
               ng-controller="EditableController"
               ng-show="loader.ready">
            <div ng-repeat="chapter in editor.chapters"
                 smooth-scroll
                   scroll-if="{{ scrollable.chapterId === chapter.id }}"
                   easing="easeOutQuint"
                   duration="800"
                   offset="71">
              <div class="editor-chapter" ng-attr-id="chapter-{{ chapter.position }}" ng-controller="ChapterController">
                <h2 class="editor-chapter-title-header">
                  Capítulo {{ chapter.position }}
                  <small class="text-success" ng-show="chapter.published">
                    publicado
                  </small>
                  <small ng-show="!chapter.published">
                    rascunho
                  </small>
                </h2>
                <input class="form-control editor-chapter-title-name" type="text"
                       ng-model="chapter.title"
                         ng-model-options="{ debounce: 1000 }">
                <div ng-repeat="section in chapter.sections"
                     smooth-scroll
                       scroll-if="{{ scrollable.sectionId === section.id }}"
                       easing="easeOutQuint"
                       duration="1000"
                       offset="80">
                  <div ng-controller="SectionController">
                    <div class="editor-chapter-section {{ validity.className }}">
                      <textarea class="form-control editor-chapter-section-text"
                                ng-model="section.text"
                                  <%-- Enable input validation upon typing "enter" --%>
                                  ng-trim="false"
                                ng-keydown="preventTyping( $event )"
                                ws-editor-focus
                                  focus-if="focusable.sectionId === section.id"></textarea>
                      <div class="editor-chapter-section-footer">
                        <div class="row">
                          <div class="col-md-5">
                            <label class="control-label editor-section-footer-msg"
                                   ng-attr-for="section-{{ section.position }}"
                                   ng-show="validity.text">{{ validity.text }}</label>
                          </div>
                          <div class="col-md-7">
                            <div class="editor-section-footer-toolbar">
                              <button class="btn btn-primary" ng-click="addSection( section.id, chapter.id )">
                                <span class="icon-down"></span>
                                <span class="hidden-xs">Nova seção</span>
                              </button>
                              <button class="btn btn-default"
                                      ng-click="previewSection( chapter.position, section.position )"
                                      ng-disabled="previewable === false">
                                <span class="icon-eye"></span>
                                <span class="hidden-xs">Pré-visualizar</span>
                              </button>
                              <button class="btn btn-danger"
                                      ng-click="removeSection( chapter.id, section.id )"
                                      ng-disabled="section.text">
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
          </div>
        </div>
        <div class="col-sm-4 col-lg-3 hidden-xs">
          <div class="editor-chapter-thumbs" id="chapter-menu"
               ws-editor-menu
               ng-controller="MenuController">
            <ul class="nav nav-pills nav-stacked editor-chapter-thumbs-items">
              <li class="editor-chapter-thumbs-item"
                  ng-repeat="chapter in editor.chapters">
                <a class="editor-chapter-thumb" ng-attr-href="#chapter-{{ chapter.position }}"
                   scroll-to="chapter-{{ chapter.position }}"
                     easing="easeOutQuint"
                     duration="500"
                     offset="71" <%-- navbar height --%>
                >
                  Capítulo {{ chapter.position }}
                </a>
                <div ng-show="chapter.publishable !== null">
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
            <button class="btn btn-default btn-block"
                    ng-click="addChapter()">
              Novo capítulo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>