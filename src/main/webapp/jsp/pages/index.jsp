<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="facebook" tagdir="/WEB-INF/tags/facebook" %>
<jsp:include page="/jsp/include/header.jsp"/>
<div class="jumbotron index-banner">
  <div class="container index-banner-container">
    <h1>Web Stories</h1>
    <p class="index-banner-paragraph">
      Você tem o potencial para criar grandes histórias
    </p>
    <c:if test="${canPublish}">
      <p>
        <facebook:login className="btn btn-primary btn-lg" invite="${param.invite}" redirect="${pageContext.request.contextPath}/home/projects">
          Começar agora!
        </facebook:login>
      </p>
      <p class="index-banner-terms">
        Ao acessar o site você concorda com os
        <a href="${pageContext.request.contextPath}/terms">Termos e Condições</a>
      </p>
    </c:if>
    <c:if test="${!canPublish}">
      <p class="index-banner-closed">
        Web Stories atualmente está em um beta fechado.
        <br>
        <span class="index-banner-contact">Clique aqui para solicitar um convite por e-mail</span>
      </p>
    </c:if>
  </div>
</div>
<c:if test="${not empty featuredStories}">
  <div class="container index-stories-container">
    <div class="row">
      <c:forEach items="${featuredStories}" var="story">
        <div class="col-sm-4">
          <div class="thumbnail story-thumb">
            <div class="caption">
              <div class="media">
                <a class="pull-left" href="${story.author.profileURL}">
                  <img class="media-object" height="60" width="60" src="${story.author.avatarURL}" alt="(Avatar)">
                </a>
                <div class="media-body" title="${story.description}">
                  <a class="story-thumb-title" href="${pageContext.request.contextPath}/view/stories/?id=${story.id}#section-0-0">
                    ${story.title}
                  </a>
                  <p class="story-thumb-summary">
                    ${story.description}
                  </p>
                  <div class="story-thumb-author">
                    por <cite>${story.author.name.first}</cite>
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