<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<ws:header/>
<div id="meta" data-nostory="${nostory}"></div>
<div class="container toolbar">
  <ol class="breadcrumb breadcumb-clear">
    <li>
      <a href="${pageContext.request.contextPath}/home/user/invites">
        <span class="icon-user"></span>
        ${logged.firstName}
      </a>
    </li>
    <li class="active">
      Meus convites
    </li>
  </ol>
</div>
<div class="container">
  <h2>Como funciona?</h2>
  // TODO
</div>