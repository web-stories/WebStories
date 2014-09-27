<%@ taglib prefix="bs" tagdir="/WEB-INF/tags/bootstrap" %>
<div id="meta" data-nostory="${nostory}"></div>
<bs:modal id="new-story-wizard-modal" title="Inicie uma história">
  <bs:wizard id="new-story-wizard">
    <bs:modal-body>
      <bs:wizard-steps>
        <bs:wizard-step number="1" title="Título e Resumo" active="true"/>
        <bs:wizard-step number="2" title="Sinopse"/>
        <bs:wizard-step number="3" title="Ilustração"/>
      </bs:wizard-steps>
      <hr>
      <bs:wizard-panes>
        <bs:wizard-pane active="true">
          Step1
        </bs:wizard-pane>
        <bs:wizard-pane>
          Step2
        </bs:wizard-pane>
        <bs:wizard-pane>
          Step3
        </bs:wizard-pane>
      </bs:wizard-panes>
    </bs:modal-body>
    <bs:modal-footer>
      <bs:wizard-footer>
        <bs:wizard-footer-control-prev firstPane="true">
          Anterior
        </bs:wizard-footer-control-prev>
        <bs:wizard-footer-control-next last="Criar">
          Próximo
        </bs:wizard-footer-control-next>
      </bs:wizard-footer>
    </bs:modal-footer>
  </bs:wizard>
</bs:modal>