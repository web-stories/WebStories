<nav class="navbar navbar-default navbar-fixed-top header-navbar">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle collapsed header-navbar-toggle" data-toggle="collapse" data-target="#main-navbar" type="button">
      <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="${pageContext.request.contextPath}/">
        WebStories
        <small>beta</small>
      </a>
    </div>
    <div class="collapse navbar-collapse" id="main-navbar">
      <form class="navbar-form navbar-right" name="headerSearchForm" method="get" action="https://www.google.com/search">
        <div class="form-group">
          <input name="q" type="hidden" value="site:webstories.org ">
          <input class="form-control header-search-input" name="search" type="text" placeholder="Buscar">
        </div>
        <button class="btn btn-default">
          <span class="icon-search"></span>
        </button>
      </form>
      <script>
        (function() {
          var form = document.headerSearchForm;
          form.onsubmit = function( event ) {
            var search = form.search.value;
            if ( !search ) {
              event.preventDefault();
              return;
            }
            form.q.value = form.q.value + search;
          };
        }());
      </script>
    </div>
  </div>
</nav>