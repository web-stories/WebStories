<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<ws:header/>
<div class="container">
  <div class="error-message-container">
    <h1>
      Falha de autenticação
      <small class="error-message-description">
        ${error.message}
      </small>
    </h1>
    <p class="error-message-text">
      Clique <a href="${pageContext.request.contextPath}/">aqui</a> para voltar.
    </p>
  </div>
</div>