<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="bs" tagdir="/WEB-INF/tags/bootstrap" %>
<div id="meta" data-nostory="${nostory}"></div>
<div class="container">
  <div class="page-component page-component-toolbar">
    <button class="btn btn-success" id="new-story-btn">
      <span class="icon-draft"></span>
      Nova história
    </button>
  </div>
  <div class="row">
    <c:forEach items="${userStories}" var="story">
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <a href="#">
            <img src="http://placehold.it/800x300" alt="história">
          </a>
          <div class="caption">
            <div class="media">
              <a class="pull-left" href="#">
                <img class="media-object" src="http://placehold.it/60x60" alt="Placeholder">
              </a>
              <div class="media-body" title="${story.description}">
                <a class="story-thumb-title" href="#">
                  ${story.title}
                </a>
                <p class="story-thumb-summary">
                  ${story.description}
                </p>
                <div class="story-thumb-author">
                  por <cite>${story.author}</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </c:forEach>
  </div>
</div>
<bs:modal title="Nova história" id="new-story-wizard-modal">
  <bs:wizard id="new-story-wizard">
    <bs:modal-body>
      <bs:wizard-steps>
        <bs:wizard-step number="1" title="Título e Resumo" active="true"/>
        <bs:wizard-step number="2" title="Sinopse"/>
        <bs:wizard-step number="3" title="Pronto"/>
      </bs:wizard-steps>
      <hr>
      <form name="newStoryForm" action="${pageContext.request.contextPath}/home/create" method="post">
        <bs:wizard-panes>
          <bs:wizard-pane active="true">
              <div class="form-group">
                <label for="new-story-title">
                  Título principal
                </label>
                <input class="form-control" id="new-story-title" name="title" type="text" required>
              </div>
              <div class="form-group">
                <label for="new-story-summary">
                  Resumo
                </label>
                <div class="remaining">
                  <textarea class="form-control remaining-input" id="new-story-summary" name="summary" data-rule-maxlength="140" type="text" required></textarea>
                  <div>
                    <span class="remaining-chars">140</span>
                    caracteres restantes
                  </div>
                </div>
              </div>
          </bs:wizard-pane>
          <bs:wizard-pane>
            <div class="form-group">
              <label for="new-story-synopsis">
                Sinopse
              </label>
              <textarea class="form-control story-synopsis" id="new-story-synopsis" name="synopsis" type="text" required></textarea>
            </div>
          </bs:wizard-pane>
          <bs:wizard-pane>
            <h2>
              Pronto!
            </h2>
            <p>
              Clique em <strong class="text-success">começar</strong> para iniciar sua história.
            </p>
          </bs:wizard-pane>
        </bs:wizard-panes>
      </form>
    </bs:modal-body>
    <bs:modal-footer>
      <bs:wizard-footer>
        <bs:wizard-footer-control-prev firstPane="true">
          Anterior
        </bs:wizard-footer-control-prev>
        <bs:wizard-footer-control-next last="Começar">
          Próximo
        </bs:wizard-footer-control-next>
      </bs:wizard-footer>
    </bs:modal-footer>
  </bs:wizard>
</bs:modal>
<bs:modal id="first-story-wizard-modal" title="Minha primeira história" closeable="false">
  <bs:wizard id="first-story-wizard">
    <bs:modal-body>
      <bs:wizard-steps>
        <bs:wizard-step number="1" title="Título e Resumo" active="true"/>
        <bs:wizard-step number="2" title="Sinopse"/>
        <bs:wizard-step number="3" title="Pronto"/>
      </bs:wizard-steps>
      <hr>
      <form name="firstStoryForm" action="${pageContext.request.contextPath}/home/create" method="post">
        <bs:wizard-panes>
          <bs:wizard-pane active="true">
              <div class="form-group">
                <label for="first-story-title">
                  Título principal
                </label>
                <input class="form-control" id="first-story-title" name="title" type="text" placeholder="Ex.: &quot;Pinóquio&quot;" required>
              </div>
              <div class="form-group">
                <label for="first-story-summary">
                  Resumo
                  <small>
                    &mdash; Descrição curta do tema principal
                  </small>
                </label>
                <div class="remaining">
                  <textarea class="form-control remaining-input" id="first-story-summary" name="summary" data-rule-maxlength="140" type="text"
                            placeholder="Ex.: &quot;A jornada de um boneco de madeira querendo se tornar um garoto de verdade&quot;"
                            required></textarea>
                  <div>
                    <span class="remaining-chars">140</span>
                    caracteres restantes
                  </div>
                </div>
              </div>
          </bs:wizard-pane>
          <bs:wizard-pane>
            <div class="form-group">
              <label for="first-story-synopsis">
                Sinopse
                <small>
                  &mdash; Aspectos mais chamativos da história
                </small>
              </label>
              <textarea class="form-control story-synopsis" id="first-story-synopsis" name="synopsis" type="text"
                        placeholder="Ex.: &quot;Pinóquio conta a história de um boneco de madeira que dedica toda a sua infância desejando se tornar um garoto de verdade, entretanto é enganado por colegas de escola e dois vigaristas. Através de suas aventuras, Pinóquio passa a entender como ele era ingênuo e travesso. Através de compaixão e gratidão, acaba aprendendo a superar as suas atitudes e decisões equivocadas.&quot;"
                        required></textarea>
            </div>
          </bs:wizard-pane>
          <bs:wizard-pane>
            <h2>
              Pronto!
            </h2>
            <p>
              Clique em <strong class="text-success">começar</strong> para iniciar a sua primeira história.
            </p>
          </bs:wizard-pane>
        </bs:wizard-panes>
      </form>
    </bs:modal-body>
    <bs:modal-footer>
      <bs:wizard-footer>
        <bs:wizard-footer-control-jump>
          Pular
        </bs:wizard-footer-control-jump>
        <bs:wizard-footer-control-prev firstPane="true">
          Anterior
        </bs:wizard-footer-control-prev>
        <bs:wizard-footer-control-next last="Começar">
          Próximo
        </bs:wizard-footer-control-next>
      </bs:wizard-footer>
    </bs:modal-footer>
  </bs:wizard>
</bs:modal>