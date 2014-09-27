<%@ attribute name="number" required="true" %>
<%@ attribute name="title" required="true" %>
<%@ attribute name="active" %>
<li class="${not empty active ? 'active' : ''}">
  <span class="wizard-step-num">${number}</span>
  <span class="wizard-step-title">${title}</span>
</li>