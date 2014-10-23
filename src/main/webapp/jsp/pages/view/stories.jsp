<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<ws:story>
  <ws:story-content>
    <c:forEach items="${story.chapters}" var="chapter">
      <ws:story-chapter chapter="${chapter.position}" title="${chapter.title}">
        <c:forEach items="${chapter.sections}" var="section">
          <ws:story-section chapter="${chapter.position}" section="${section.position}">
            ${section.text}
          </ws:story-section>
        </c:forEach>
      </ws:story-chapter>
    </c:forEach>
  </ws:story-content>
</ws:story>