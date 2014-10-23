<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<ws:story>
  <ws:story-content>
    <c:forEach items="${story.chapters}" var="chapter" varStatus="loop">
      <ws:story-chapter chapter="${loop.index + 1}" title="${chapter.title}">
        <c:forEach items="${chapter.sections}" var="section">
          <ws:story-section chapter="${loop.index + 1}" section="${section.position + 1}">
            ${section.text}
          </ws:story-section>
        </c:forEach>
      </ws:story-chapter>
    </c:forEach>
  </ws:story-content>
</ws:story>