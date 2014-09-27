<div class="container">
  <div class="wizard">
    <ul class="wizard-steps">
      <li class="active">
        <span class="wizard-step-num">1</span>
        <span class="wizard-step-title">Título e Resumo</span>
      </li>
      <li>
        <span class="wizard-step-num">2</span>
        <span class="wizard-step-title">Sinopse</span>
      </li>
      <li>
        <span class="wizard-step-num">3</span>
        <span class="wizard-step-title">last step</span>
      </li>
    </ul>
    <hr>
    <div class="wizard-container">
      <div class="wizard-pane fade in active">
        Step1
      </div>
      <div class="wizard-pane fade">
        Step2
      </div>
      <div class="wizard-pane fade">
        Step3
      </div>
    </div>
    <hr>
    <div class="wizard-footer">
      <button class="btn btn-default wizard-control-prev" type="button" disabled>
        <span class="icon-left"></span>
        Anterior
      </button>
      <button class="btn btn-default wizard-control-next" data-last="Finalizar" type="button">
        Próximo
        <span class="icon-right"></span>
      </button>
    </div>
  </div>
</div>