<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="facebook" tagdir="/WEB-INF/tags/facebook" %>
<div class="jumbotron index-banner">
  <div class="container index-banner-container">
    <h1>Web Stories</h1>
    <p class="index-banner-paragraph">
      Uma plataforma para publicação de histórias na Web
    </p>
    <p>
      <c:if test="${canPublish}">
        <facebook:login className="btn btn-primary btn-lg" invite="${param.invite}" redirect="${pageContext.request.contextPath}/home/projects">
          Publique a sua história
        </facebook:login>
      </c:if>
    </p>
    <c:if test="${!canPublish}">
      <p class="index-banner-closed">
        Web Stories atualmente está em um beta fechado.
        <br>
        <span class="index-banner-contact">Clique aqui para solicitar um convite</span>
      </p>
    </c:if>
  </div>
</div>
<c:if test="${not empty featuredStories}">
  <div class="container index-stories-container">
    <div class="row">
      <c:forEach items="${featuredStories}" var="story">
        <div class="col-sm-4">
          <div class="thumbnail">
            <a href="#">
              <img src="http://placehold.it/800x300" alt="história">
            </a>
            <div class="caption">
              <div class="media">
                <a class="pull-left" href="#">
                  <img class="media-object" src="http://placehold.it/60x60" alt="Placeholder">
                </a>
                <div class="media-body" title="${story.description}">
                  <a class="story-thumb-title" href="#">
                    ${story.title}
                  </a>
                  <p class="story-thumb-summary">
                    ${story.description}
                  </p>
                  <div class="story-thumb-author">
                    por <cite>${story.author}</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </c:forEach>
    </div>
  </div>
</c:if>
<div class="container">
  <div class="page-header">
    <h1>Planos futuros</h1>
  </div>
  <ul>
    <li>
      Permitir a criação de histórias colaborativas
    </li>
    <li>
      Possibilitar a criação de histórias no estilo
      <a href="http://en.wikipedia.org/wiki/Choose_Your_Own_Adventure">Choose your own adventure</a>
    </li>
    <li>
      Melhorar a experiência do leitor permitindo o uso de imagens e efeitos sonoros relevantes para
      o conteúdo da história
    </li>
  </ul>
</div>