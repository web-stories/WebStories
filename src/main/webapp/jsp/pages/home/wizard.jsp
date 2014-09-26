<div class="container">
  <div class="wizard">
    <ul class="wizard-steps">
      <li class="complete" data-target="#step1">
        <span class="wizard-step-num">1</span>
        <span class="wizard-step-title">Título e Resumo</span>
      </li>
      <li class="active">
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
      <div class="wizard-pane active" id="step1">
        Step1
      </div>
      <div class="wizard-pane" id="step1">
        Step2
      </div>
      <div class="wizard-pane" id="step1">
        Step3
      </div>
    </div>
    <hr>
    <div class="wizard-footer">
      <div class="btn-group">
        <button type="button" class="btn btn-default">
          <span class="icon-left"></span>
        </button>
        <button type="button" class="btn btn-default">
          <span class="icon-right"></span>
        </button>
      </div>
    </div>
  </div>
</div>