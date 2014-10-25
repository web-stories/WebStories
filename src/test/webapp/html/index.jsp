<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>QUnit Composite</title>
    <link rel="stylesheet" href="../css/vendor/qunit.css">
    <link rel="stylesheet" href="../css/vendor/qunit-composite.css">
    <script src="../js/vendor/qunit.js"></script>
    <script src="../js/vendor/qunit-composite.js"></script>
  </head>
  <body>
    <div id="qunit"></div>
    <script>
      QUnit.testSuites( "All", [
        "pages/editor.jsp",
        "pages/editor-unit.jsp"
      ]);
    </script>
  </body>
</html>