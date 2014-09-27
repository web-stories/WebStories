<%@ attribute name="last" %>
<div class="wizard-footer">
  <button class="btn btn-default wizard-control-prev" disabled>
    <span class="icon-left"></span>
    Anterior
  </button>
  <button class="btn btn-default wizard-control-next" data-last="${last}">
    Próximo
    <span class="icon-right"></span>
  </button>
</div>