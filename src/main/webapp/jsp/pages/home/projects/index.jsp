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
  <ws:editor title="${story.title}">
    <div class="row">
      <div class="col-sm-8 col-lg-9">
        <ws:editor-chapters>
          <c:forEach items="${story.chapters}" var="chapter">
            <ws:editor-chapter chapter="${chapter.position}" title="${chapter.title}" chapterId="${chapter.id}" published="${chapter.published}">
              <c:forEach items="${chapter.sections}" var="section">
                <ws:editor-section sectionId="${section.id}">${section.text}</ws:editor-section>
              </c:forEach>
            </ws:editor-chapter>
          </c:forEach>
        </ws:editor-chapters>
      </div>
      <div class="col-sm-4 col-lg-3 hidden-xs">
        <div class="editor-chapter-thumbs" id="chapter-menu"
             ng-controller="ThumbsController"
             ng-init="init( ${story.id} )"
             ng-cloak>
          <ul class="nav nav-pills nav-stacked editor-chapter-thumbs-items"
              ng-repeat="chapter in thumbs.chapters">
            <li class="editor-chapter-thumbs-item">
              <a class="editor-chapter-thumb" href="#chapter-{{ chapter.position }}">
                Capítulo {{ chapter.position }}
              </a>
              <form action="${pageContext.request.contextPath}/home/projects/publish" method="post"
                    ng-show="chapter.publishable">
                <input type="hidden" name="chapterId" value="{{ chapter.id }}">
                <button class="btn btn-default btn-sm editor-chapter-thumb-publish" type="button"
                        ng-disabled="chapter.publishable === false">
                  <span ng-show="!chapter.publishable">
                    <span class="icon-checkmark"></span>
                      Publicado
                  </span>
                  <span ng-show="chapter.publishable">
                    Publicar
                  </span>
                </button>
              </form>
            </li>
          </ul>
          <button class="btn btn-default btn-block editor-chapter-thumb-add">
            Novo capítulo
          </button>
        </div>
      </div>
    </div>
  </ws:editor>
</div>