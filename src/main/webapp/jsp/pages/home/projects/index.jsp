<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<div id="meta" data-story-id="${story.id}"></div>
<ws:alert-saving id="saving-feedback"></ws:alert-saving>
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
      <div class="col-sm-9 col-lg-10 editor-chapters">
        <c:forEach items="${story.chapters}" var="chapter" varStatus="loop">
          <ws:editor-chapter chapter="${loop.index + 1}" title="${chapter.title}" chapterId="${chapter.id}">
            <c:forEach items="${chapter.sections}" var="section">
              <ws:editor-section sectionId="${section.id}">${section.text}</ws:editor-section>
            </c:forEach>
          </ws:editor-chapter>
        </c:forEach>
      </div>
      <div class="col-sm-3 col-lg-2 hidden-xs">
        <div class="editor-chapter-thumbs" id="chapter-menu">
          <ul class="nav">
            <c:forEach items="${story.chapters}" var="chapter" varStatus="loop">
              <ws:editor-chapter-thumb chapter="${loop.index + 1}"/>
            </c:forEach>
          </ul>
          <button class="btn btn-primary btn-block editor-chapter-thumb-add">
            Novo capítulo
          </button>
        </div>
      </div>
    </div>
  </ws:editor>
</div>