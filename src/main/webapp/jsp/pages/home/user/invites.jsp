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
      <h3>Meus convites (5/5)</h3>
      <div class="table-responsive">
        <table class="table invites-table">
          <tbody>
            <tr>
              <td>
                http://webstories.org/?invite=fj654j56h4
              </td>
              <td class="invites-table-using">
                <button class="btn btn-default">
                  <span class="icon-emailforward2"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-facebook"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-twitter"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                http://webstories.org/?invite=fgh7f
              </td>
              <td class="invites-table-using">
                <button class="btn btn-default">
                  <span class="icon-emailforward2"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-facebook"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-twitter"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                http://webstories.org/?invite=nbbnsd5654
              </td>
              <td class="invites-table-using">
                <button class="btn btn-default">
                  <span class="icon-emailforward2"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-facebook"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-twitter"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                http://webstories.org/?invite=qwhoijk456
              </td>
              <td class="invites-table-using">
                <button class="btn btn-default">
                  <span class="icon-emailforward2"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-facebook"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-twitter"></span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                http://webstories.org/?invite=33g2dfg13
              </td>
              <td class="invites-table-using">
                <button class="btn btn-default">
                  <span class="icon-emailforward2"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-facebook"></span>
                </button>
                <button class="btn btn-default">
                  <span class="icon-twitter"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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