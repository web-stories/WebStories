<%@ taglib prefix="ws" tagdir="/WEB-INF/tags/ws" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Story Editor</title>
    <link rel="stylesheet" href="../../css/vendor/qunit.css">
    <script src="../../js/vendor/qunit.js"></script>
    <script>
      var require = {
        baseUrl: "../../../../main/webapp/static",
        test: true
      };
    </script>
    <script src="../../../../main/webapp/static/js/polyfills.js"></script>
    <script src="../../../../main/webapp/static/js/require.main.js"></script>
    <script src="../../../../main/webapp/static/js/require-2.1.15.js"></script>
  </head>
  <body>
    <div id="qunit"></div>
    <div id="qunit-fixture">
      <ws:editor title="" id="simple">
        <ws:editor-chapters>
          <ws:editor-chapter chapter="1" title="Chapter">
            <ws:editor-section>Section</ws:editor-section>
          </ws:editor-chapter>
        </ws:editor-chapters>
        <ws:editor-chapter-thumbs>
          <ws:editor-chapter-thumb chapter="1"/>
        </ws:editor-chapter-thumbs>
      </ws:editor>
      <ws:editor title="" id="section-overflow">
        <ws:editor-chapters>
          <ws:editor-chapter chapter="1" title="Chapter">
            <ws:editor-section>
              O início das eras surgiu de três astros cósmicos, as três luas: Dânus, aquela que
                provém das trevas, Benignus, aquela de provém da luz, e Neutrôns, aquela que
                respeita ambas.
                
              De Dânus vieram seis deuses: Aquele que criou a trapaça, aquela que fez surgir a
                noite, o ser que causou a morte, aquele que criou o dia, o símbolo do dragão, e o
                Deus da magia negra.
                
              De Benignus surgiram: Aquela que traria a natureza, o criador da ressurreição, a
                dádiva do poder, a praticante da magia, o sinônimo da evolução, e aquela que
                protege os mistos.
                
              Eras se passaram, até o ponto em que ninguém mais conhecia a real história da origem,
                a não ser pequenos fragmentos de informação, que mesmo obsoletos foram de grande
                ajuda para reestabelecer a história.
                
              Atualmente teorias incertas se formam sobre diversas coisas. O poder da magia e dos
                deuses ainda existe, embora fraco e insignificante em relação as eras anteriores.
            </ws:editor-section>
          </ws:editor-chapter>
        </ws:editor-chapters>
        <ws:editor-chapter-thumbs>
          <ws:editor-chapter-thumb chapter="1"/>
        </ws:editor-chapter-thumbs>
      </ws:editor>
    </div>
    <script src="../../js/custom/editor.js"></script>
  </body>
</html>