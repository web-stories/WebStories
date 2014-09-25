<%@ taglib prefix="facebook" tagdir="/WEB-INF/tags/facebook" %>
<div class="container">
  <h1>Ops!</h1>
  <p>
    É necessário estar logado para acessar esta página =(
  </p>
  <p>
    <facebook:login className="btn btn-primary">
      <span class="icon-facebok"></span>
      Entrar usando o Facebook
    </facebook:login>
  </p>
</div>