<%@ taglib prefix="bs" tagdir="/WEB-INF/tags/bootstrap" %>
<div id="meta" data-nostory="${nostory}"></div>
<bs:modal id="new-story-wizard-modal" title="Inicie uma história">
  <bs:wizard id="new-story-wizard">
    <bs:modal-body>
      <bs:wizard-steps>
        <bs:wizard-step number="1" title="Título e Resumo" active="true"/>
        <bs:wizard-step number="2" title="Sinopse"/>
        <bs:wizard-step number="3" title="Começar"/>
      </bs:wizard-steps>
      <hr>
      <form>
        <bs:wizard-panes>
          <bs:wizard-pane active="true">
              <div class="form-group">
                <label for="story-title">
                  Título principal
                </label>
                <input class="form-control" id="story-title" type="email" placeholder="Ex.: &quot;Pinóquio&quot;">
              </div>
              <div class="form-group">
                <label for="story-summary">
                  Resumo
                  <small>
                    &mdash; Aspectos mais chamativos da história
                  </small>
                </label>
                <textarea class="form-control" id="story-summary" type="email" placeholder="Ex.: &quot;A jornada de um boneco de madeira querendo se tornar um garoto de verdade&quot;"></textarea>
                <div>
                  <span class="remaining-chars">140</span>
                  caracteres restantes
                </div>
              </div>
          </bs:wizard-pane>
          <bs:wizard-pane>
            <div class="form-group">
              <label for="story-synopsis">
                Sinopse
                <small>
                  &mdash; Descrição curta do tema principal
                </small>
              </label>
              <textarea class="form-control story-sinopsis" id="story-sinopsis" type="email"
              placeholder="Ex.: &quot;Pinóquio conta a história de um boneco de madeira que dedica toda a sua infância desejando se tornar um garoto de verdade, entretanto é enganado por colegas de escola e dois vigaristas. Através de suas aventuras, Pinóquio passa a entender como ele era ingênuo e travesso. Através de compaixão e gratidão, acaba aprendendo a superar as suas atitudes e decisões equivocadas.&quot;"></textarea>
            </div>
          </bs:wizard-pane>
          <bs:wizard-pane>
            <h2>
              Parabéns!
            </h2>
            <p>
              Você está pronto para começar a sua primeira história.
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