<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<ws:header/>
<div class="container">
  <div class="row">
    <div class="error-message-wrapper col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
      <div class="error-message-title">
        <h1>
          Desculpe, ocorreu um problema
          <small class="error-message-description">
            ${error.message}
          </small>
        </h1>
      </div>
      <div class="error-message-content">
        <c:if test="${ error.type ne 'DEFAULT' }">
          <p>
            <c:if test="${ error.type eq 'FB_EMAIL_MATCHING' }">
              Tente o seguinte:
              <ul>
                <li>Acesse o Web Stories com a conta do Facebook que possui o e-mail <strong>${error.inviteEmail}</strong>.</li>
                <li><a href="${error.facebookLogoutURL}">Clique aqui</a> para sair da conta <strong>${error.userEmail}</strong> e tentar novamente.</li>
                <li>Solicite um convite que ainda não foi utilizado.</li>
              </ul>
            </c:if>
          </p>
        </c:if>
      </div>
      <div class="error-message-footer">
        <p>
          Clique <a href="${pageContext.request.contextPath}/">aqui</a> para voltar.
        </p>
      </div>
    </div>
  </div>
</div>