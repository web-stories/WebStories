<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="facebook" tagdir="/WEB-INF/tags/facebook" %>
<%@ taglib prefix="util" uri="http://java.webstories.org/jsp/jstl/util" %>
<div class="container">
  <h1>Acesso restrito</h1>
  <p>
    É necessário ter uma conta para acessar esta página
  </p>
  <p>
    <c:set var="redirect" value="${util:buildURI( requestScope['javax.servlet.forward.request_uri'], requestScope['javax.servlet.forward.query_string'] )}"/>
    <facebook:login className="btn btn-primary" redirect="${redirect}">
      <span class="icon-facebok"></span>
      Entrar usando o Facebook
    </facebook:login>
  </p>
</div>