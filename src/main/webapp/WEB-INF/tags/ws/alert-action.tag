<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="id" %>
<%@ attribute name="hidden" %>
<%@ attribute name="closeable" %>

<c:set var="fadeState" value="in"/>
<c:if test="${hidden}">
  <c:set var="hiddenClass" value="hidden"/>
  <c:set var="fadeState" value=""/>
</c:if>

<c:if test="${not empty id}">
  <c:set var="idAttribute">
    id="${id}"
  </c:set>
</c:if>

<div class="alert-container ${hiddenClass}">
  <div class="alert alert-warning alert-saving fade ${fadeState}" ${idAttribute}>
    <c:if test="${closeable}">
      <button class="close" data-dismiss="alert" type="button">&times;</button>
    </c:if>
    <span class="alert-saving-text"><jsp:doBody/></span>
  </div>
</div>