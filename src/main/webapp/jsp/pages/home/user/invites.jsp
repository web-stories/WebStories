<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
      <span class="icon-email"></span>
      Meus convites
    </li>
  </ol>
</div>
<div class="container">
  <h2 class="main-title">
    Torne-se um Webby
  </h2>
  <p>
    Faça parte da divulgação de Web Stories.
  </p>
  <ul>
    <li>Você pode enviar convites para quantas pessoas quiser</li>
    <li>Uma conta será criada para o primeiro que usar um convite</li>
  </ul>
  <div class="row">
    <div class="col-md-6">
      <h3>Meus convites</h3>
      <c:if test="${ fn:length( availableInviteCodes ) == 0 }">
        <p>
          Você não tem mais convites disponíveis.
        </p>
      </c:if>
      <c:if test="${ fn:length( availableInviteCodes ) > 0 }">
        <div class="table-responsive">
          <table class="table invites-table">
            <tbody>
              <c:forEach items="${ availableInviteCodes }" var="inviteCode">
                <c:set var="url" value="http://webstories.org/?invite=${ inviteCode }"/>
                <c:set var="subject" value="Oi, gostaria de fazer parte da comunidade Web Stories?"/>
                <c:set var="body" value="Consegui um convite: ${url}"/>
                <tr>
                  <td>
                    ${ url }
                  </td>
                  <td class="invites-table-using">
                    <a class="btn btn-default" href="mailto:?subject=${subject}&body=${body}">
                      <span class="icon-emailforward2"></span>
                      Enviar e-mail
                    </a>
                  </td>
                </tr>
              </c:forEach>
            </tbody>
          </table>
        </div>
      </c:if>
    </div>
    <div class="col-md-6">
      <h3>Meus convidados</h3>
      <table class="table invited-table">
        <tbody>
          <tr>
            <td class="invited-avatar">
              <img class="img-circle" src="https://graph.facebook.com/10155251318620525/picture?width=65&amp;height=65" alt="Foto">
            </td>
            <td>
              Fabio Neves
            </td>
          </tr>
          <tr>
            <td class="invited-avatar">
              <img class="img-circle" src="https://graph.facebook.com/362077513973404/picture?type=large&width=65&height=65" alt="Foto">
            </td>
            <td>
              Guilherme Holz
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>