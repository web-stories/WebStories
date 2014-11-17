<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="convention" uri="url-convention" %>
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Web Stories</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <convention:include-head/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/bootstrap-3.2.0.css" media="screen">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/bootstrap.custom-0.1.1.css" media="screen">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/${build}/css/webstories.css" media="screen">
    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src="//www.google-analytics.com/analytics.js";
      r.parentNode.insertBefore(e,r)}(window,document,"script","ga"));
      ga("create","${application.google.analytics.id}","auto");ga("send","pageview");
    </script>
    <script>
      (function() {
        var patchBefore = function( object, property, fn ) {
          var old = object[ property ];
          object[ property ] = function() {
            fn.apply( this, arguments );
            return old.apply( this, arguments );
          };
        };
        patchBefore( window, "confirm", function( msg ) {
          ga( "send", "event", "confirm", msg );
        });
        patchBefore( window, "alert", function( msg ) {
          ga( "send", "event", "alert", msg );
        });
      }());
    </script>
  </head>
  <body>
    <convention:include-stylesheet/>
    <div id="wrapper-default">
      <convention:include/>
    </div>
    <script>var require = { baseUrl: "${pageContext.request.contextPath}/static/${build}" };</script>
    <script src="${pageContext.request.contextPath}/static/${build}/js/require.main.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/require-2.1.15.js"></script>
    <script>
      require( ["fastclick", "bootstrap"], function( FastClick ) {
        FastClick.attach( document.body );
      });
    </script>
    <convention:include-script/>
  </body>
</html>