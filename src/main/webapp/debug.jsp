<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Web Stories - Media Query Identifier</title>
    <meta name="viewport" content="width=device-width">
  </head>
  <body>
    <p>
      Used to bypass the Facebook login mechanism for intranet debugging
    </p>
    <form action="${pageContext.request.contextPath}/identification/logon" method="post">
      Secret: <input name="secret" type="text"><br>
      <input type="submit">
    </form>
  </body>
</html>