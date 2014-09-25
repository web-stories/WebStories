<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="util" uri="http://java.webstories.org/jsp/jstl/util" %>
<%@ attribute name="className" %>
<%@ attribute name="invite" %>
<c:set var="baseURL" value="${fn:replace( pageContext.request.requestURL, pageContext.request.requestURI, pageContext.request.contextPath )}"/>
<c:set var="api_uri" value="https://www.facebook.com/dialog/oauth"/>
<c:set var="redirect_uri" value="${baseURL}/identification/logon"/>
<c:set var="response_type" value="granted_scopes,code"/>
<c:set var="scope" value="public_profile,email"/>
<c:set var="client_id" value="${application.facebook.app.id}"/>
<c:set var="state" value="${util:base64Encode( invite )}"/>
<a class="${className}"
href="${api_uri}?client_id=${client_id}&response_type=${response_type}&scope=${scope}&state=${state}&auth_type=rerequest&redirect_uri=${redirect_uri}">
  <jsp:doBody/>
</a>