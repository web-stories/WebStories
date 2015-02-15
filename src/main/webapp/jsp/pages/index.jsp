<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="facebook" tagdir="/WEB-INF/tags/facebook" %>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&appId=707830335964914&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<jsp:include page="/jsp/include/header.jsp"/>
<div class="jumbotron index-banner">
  <div class="container index-banner-container">
    <h1>Web Stories</h1>
    <p class="index-banner-paragraph">
      Porque você tem o potencial para criar grandes histórias
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
                  <a class="story-thumb-title" href="${pageContext.request.contextPath}/view/stories/?id=${story.id}">
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
<div class="container motivational-block">
  <div class="row">
    <div class="col-sm-6 col-md-8">
      <hr>
      <blockquote class="quote">
        Acredite em si mesmo e descubra o por quê você faz o que faz, assim descobrirá o seu
        o potencial para fazer o que quiser.
      </blockquote>
      <hr>
      <div class="text-center">
        <a href="${pageContext.request.contextPath}/about">O que é Web Stories?</a>
      </div>
    </div>
    <div class="hidden-xs col-sm-6 col-md-4">
      <div class="fb-like-box"
           data-href="https://www.facebook.com/webstories.org"
           data-colorscheme="light"
           data-show-faces="true"
           data-header="false"
           data-stream="false"
           data-show-border="false">Loading...</div>
    </div>
  </div>
</div>