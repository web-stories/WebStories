<div class="container">
  <ol class="breadcrumb breadcumb-clear toolbar">
    <li>
      <a href="${pageContext.request.contextPath}/home/projects">
        <span class="icon-draft"></span>
        Meus projetos
      </a>
    </li>
    <li class="active">
      ${story.title}
    </li>
  </ol>
</div>
<div class="container">
  <ul class="nav nav-tabs editor-tabs">
    <li>
      <a href="${pageContext.request.contextPath}/home/projects/?id=${story.id}">
        História
      </a>
    </li>
    <li class="active">
      <a href="${pageContext.request.contextPath}/home/projects/details?id=${story.id}">
        Detalhes
      </a>
    </li>
  </ul>
</div>
<div class="container">
  <div class="row">
    <div class="col-md-8">
      <div class="details-cover">
        <label>
          Capa
        </label>
        <img class="img-thumbnail" id="details-cover" src="//placehold.it/800x300" alt="Imagem da capa">
      </div>
    </div>
    <div class="col-md-4">
      <div class="details-meta">
        <div class="form-group">
          <label for="details-meta-summary">
            Resumo
          </label>
          <div class="remaining">
            <textarea class="form-control remaining-input details-meta-summary" id="details-meta-summary"
                      type="text">${story.summary}</textarea>
            <div>
              <span class="remaining-chars">140</span>
              caracteres restantes
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="details-meta-synopsis">
            Sinopse
          </label>
          <textarea class="form-control remaining-input details-meta-synopsis" id="details-meta-synopsis"
                    type="text">${story.synopsis}</textarea>
        </div>
      </div>
    </div>
  </div>
</div>