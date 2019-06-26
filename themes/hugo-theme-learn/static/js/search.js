var client = algoliasearch("RITXU8D7M1", "821093c5255b7d4d40129bc13a12882f");
var index = client.initIndex("rainbond-v5.1");
index.setSettings({
  searchableAttributes: [
    'title,alternative_title',
    'content',
    'description'
  ]
});
function search(term, response) {
  index.search({
    query: term,
  }, function(err, re){
    if (err) {
      console.log(err)
      return
    }
    response(re.hits)
  })
}

$(document).ready(function() {
  new autoComplete({
    /* selector for the search box element */
    selector: $("#search-by").get(0),
    source: search,
    /* renderItem displays individual search results */
    renderItem: function(item, term) {
      console.log("renderItem");
      var numContextWords = 2;
      var text = item.content.match(
        "(?:\\s?(?:[\\w]+)\\s?){0," +
          numContextWords +
          "}" +
          term +
          "(?:\\s?(?:[\\w]+)\\s?){0," +
          numContextWords +
          "}"
      );
      item.context = text;
      return (
        '<div class="autocomplete-suggestion" ' +
        'data-term="' +
        term +
        '" ' +
        'data-title="' +
        item.title +
        '" ' +
        'data-uri="' +
        item.uri +
        '" ' +
        'data-context="' +
        item.context +
        '">' +
        "» " +
        item.title +
        '<div class="context">' +
        (item.context || "") +
        "</div>" +
        "</div>"
      );
    },
    /* onSelect callback fires when a search suggestion is chosen */
    onSelect: function(e, term, item) {
      location.href = item.getAttribute("data-uri");
    }
  });
});
