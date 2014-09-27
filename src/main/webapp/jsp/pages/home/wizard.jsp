<%@ taglib prefix="bs" tagdir="/WEB-INF/tags/bootstrap" %>
<div class="container">
  <bs:wizard>
    <bs:wizard-steps>
      <bs:wizard-step number="1" title="Título e Resumo" active="true"/>
      <bs:wizard-step number="2" title="Sinopse"/>
      <bs:wizard-step number="3" title="Ilustração"/>
    </bs:wizard-steps>
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
    <bs:wizard-footer last="Finalizar"/>
  </bs:wizard>
</div>