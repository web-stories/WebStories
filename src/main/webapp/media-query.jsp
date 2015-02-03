<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Web Stories - Media Query Identifier</title>
    <meta name="viewport" content="width=device-width">
    <style>
      html {
        fon-family: Arial;
      }
      #result {
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <p>
      Identify the exact viewport values of the device for media queries 
    </p>
    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
    <p>
      (Testing... <span id="progress"></span>)
      <hr>
      Your device is exactly:
      <strong id="result"></strong>
    </p>
    <script>
      var mqVerifier = new function() {
        var widthQuery, heightQuery;
        var width = -1;
        var height = -1;
        var progress = document.getElementById( "progress" );
        var result = document.getElementById( "result" );
        this.next = function() {
          var instance = this;
          var timeout = setTimeout(function() {
            clearTimeout( timeout );

            if ( !widthQuery && Modernizr.mq( "(width: " + ( ++width ) + "px)" ) ) {
              widthQuery = "(width: " + width + "px)";
            }

            if ( !heightQuery && Modernizr.mq( "(height: " + ( ++height ) + "px)" ) ) {
              heightQuery = "(height: " + height + "px)";
            }

            progress.innerHTML = width + "/" + height;

            if ( widthQuery && heightQuery ) {
              result.innerHTML = [ widthQuery, "and", heightQuery ].join( " " );
              result.style.backgroundColor = "yellow";
              return;
            }

            instance.next();
          }, 0 );
        };
        this.start = this.next;
      };
      mqVerifier.start();
    </script>
  </body>
</html>