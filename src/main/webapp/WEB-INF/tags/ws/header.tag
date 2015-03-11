<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ attribute name="smartphoneNav" %>
<c:if test="${ empty smartphoneNav }">
  <c:set var="smartphoneNav" value="true"/>
</c:if>
<c:set var="uri" value="${requestScope['javax.servlet.forward.request_uri']}"/>
<nav class="navbar navbar-default header-navbar">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle collapsed header-navbar-toggle ${ not smartphoneNav ? 'hidden-xs' : '' }"
              data-toggle="collapse" data-target="#main-navbar"
              type="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="${pageContext.request.contextPath}/">
        WebStories
        <small>alpha</small>
      </a>
    </div>
    <div class="collapse navbar-collapse" id="main-navbar">
      <c:if test="${isLogged}">
        <ul class="nav navbar-nav">
          <li class="${ fn:indexOf( uri, '/home/feed' ) > -1 ? 'active' : '' }">
            <a href="${pageContext.request.contextPath}/home/feed">
              <span class="icon-home"></span>
              <span class="hidden-sm">
                Página inicial
              </span>
            </a>
          </li>
          <li class="${ fn:indexOf( uri, '/home/projects' ) > -1 ? 'active' : '' }">
            <a href="${pageContext.request.contextPath}/home/projects">
              <span class="icon-draft"></span>
              <span class="hidden-sm">
                Meus projetos
              </span>
            </a>
          </li>
        </ul>
      </c:if>
      <c:if test="${isLogged}">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown ${ fn:indexOf( uri, '/home/user' ) > -1 ? 'active' : '' }">
            <a class="dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
              <img class="img-circle header-nav-avatar"
                     height="30"
                     width="30"
                     <%-- TODO: Use the profile URL of the logged user --%>
                     src="https://graph.facebook.com/276170692591315/picture?type=large&width=30&height=30"
                     alt="">
              <span class="hidden-sm">
                ${logged.firstName}
              </span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <a href="${pageContext.request.contextPath}/home/user/invites">
                  <span class="icon-email"></span>
                  Meus convites
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </c:if>
      <form class="navbar-form navbar-right header-navbar-search-form" name="headerSearchForm" method="get" action="https://www.google.com/search">
        <div class="form-group">
          <input name="q" type="hidden" value="site:webstories.org ">
          <input class="form-control header-search-input" name="search" type="text" placeholder="Buscar">
        </div>
        <button class="btn btn-default">
          <span class="icon-search"></span>
        </button>
      </form>
      <script>
        (function() {
          var form = document.headerSearchForm;
          form.onsubmit = function( event ) {
            var search = form.search.value;
            if ( !search ) {
              event.preventDefault();
              return;
            }
            form.q.value = form.q.value + search;
          };
        }());
      </script>
    </div>
  </div>
</nav>