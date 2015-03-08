<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="facebook" tagdir="/WEB-INF/tags/facebook" %>
<%@ taglib prefix="util" uri="http://java.webstories.org/jsp/jstl/util" %>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<ws:header/>
<c:set var="redirect" value="${util:concatQuery( requestScope['javax.servlet.forward.request_uri'], requestScope['javax.servlet.forward.query_string'] )}"/>
<div class="container">
  <div class="row">
    <div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <div class="auth-block">
        <div class="auth-block-content">
          <h3>Quem é você?</h3>
          <p>
            Precisamos identificar a autoria de suas publicações.
          </p>
          <div class="auth-block-social">
            <facebook:login className="btn btn-primary" redirect="${redirect}">
              <span class="icon-facebook"></span>
              Entrar com o Facebook
            </facebook:login>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>