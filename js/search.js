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
var usStates = [
    { name: '01', abbreviation: 'AL'},
    { name: '02', abbreviation: 'WY' },
    { name: '03', abbreviation: 'AL'},
    { name: '04', abbreviation: 'AL'},
    { name: 'NSC', abbreviation: 'AL'},
    { name: 'FUL', abbreviation: 'AL'},
    { name: 'GAL', abbreviation: 'AL'},
    { name: 'GTH', abbreviation: 'AL'},
    { name: 'SLD', abbreviation: 'AL'},
    { name: 'SCH', abbreviation: 'AL'},
    { name: 'SCC', abbreviation: 'AL'},
    { name: 'DMC', abbreviation: 'AL'},
    { name: 'EPS', abbreviation: 'AL'},
    { name: 'SEC', abbreviation: 'AL'},
    { name: 'SNK', abbreviation: 'AL'},
    { name: 'PRO', abbreviation: 'AL'},
    { name: 'WEB', abbreviation: 'AL'},
    { name: 'BSC', abbreviation: 'AL'},
    { name: 'INT', abbreviation: 'AL'},
    { name: 'SMC', abbreviation: 'AL'},
    { name: 'SCS', abbreviation: 'AL'},
    { name: 'SES', abbreviation: 'AL'}
];

// <li> template
var stateTemplate = _.template(
    '<li>' +
      '<input name="<%= abbreviation %>" type="checkbox">' +
      '<label for="<%= abbreviation %>"><%= capName %></label>' +
    '</li>'
);

// Populate list with states
_.each(usStates, function(s) {
    s.capName = _.startCase(s.name.toLowerCase());
    $('ul').append(stateTemplate(s));
});