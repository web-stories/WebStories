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
    Torne-se um porta-voz!
  </h2>
  <p>
    Faça parte da divulgação de Web Stories.
  </p>
  <ul>
    <li>Você pode enviar convites para quantas pessoas quiser</li>
    <li>Uma conta será criada para o primeiro que usar um convite</li>
  </ul>
  <div class="row">
    <div class="col-md-8 col-lg-7">
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
    <div class="col-md-4 col-lg-5">
      <h3>Meus convidados</h3>
      <c:if test="${ fn:length( invitedUsers ) == 0 }">
        <p>
          Após um convidado criar uma conta, o nome aparecerá aqui!  
        </p>
      </c:if>
      <c:if test="${ fn:length( invitedUsers ) > 0 }">
        <table class="table invited-table">
          <tbody>
            <c:forEach items="${ invitedUsers }" var="invitedUser">
              <tr>
                <td class="invited-avatar">
                  <img class="img-circle" width="65" height="65" src="${ invitedUser.avatarURL }" alt="Foto">
                </td>
                <td>
                  ${ invitedUser.name }
                </td>
              </tr>
            </c:forEach>
          </tbody>
        </table>
      </c:if>
    </div>
  </div>
</div>