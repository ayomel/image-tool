$('.filter-label')
  .on('click', function() {
      $('.dropdown-list').toggle();
  })
  .on('input', '.dropdown-search', function() {
      var target = $(this);
      var search = target.val().toLowerCase();

      if (!search) {
            $('li').show();
            return false;
        }

      $('li').each(function() {
          var text = $(this).text().toLowerCase();
            var match = text.indexOf(search) > -1;
            $(this).toggle(match);
        });
  })
  .on('change', '[type="checkbox"]', function() {
      var numChecked = $('[type="checkbox"]:checked').length;
      $('.quantity').text(numChecked || 'Any');
  });

// JSON of States for demo purposes
var filterName = [
    { name: 'ALABAMA'},
    { name: 'ALASKA'},
    { name: 'WYOMING'}
];

// <li> template
var stateTemplate = _.template(
    '<li>' +
      '<input name="<%= abbreviation %>" type="checkbox">' +
      '<label for="<%= abbreviation %>"><%= capName %></label>' +
    '</li>'
);

// Populate list with states
_.each(filterName, function(s) {
    s.capName = _.startCase(s.name.toLowerCase());
    $('ul').append(stateTemplate(s));
});
