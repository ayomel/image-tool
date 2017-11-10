$('.filter-label')
   .on('click', function() {
      $('.dropdown-list').show();
  })
});
//   .on('input', '.dropdown-search', function() {
//       var target = $(this);
//       var search = target.val().toLowerCase();
    
//       if (!search) {
//             $('li').show();
//             return false;
//         }
    
//       $('li').each(function() {
//           var text = $(this).text().toLowerCase();
//             var match = text.indexOf(search) > -1;
//             $(this).toggle(match);
//         });
//   })
//   .on('change', '[type="checkbox"]', function() {
//       var numChecked = $('[type="checkbox"]:checked').length;
//       $('.quantity').text(numChecked || 'Any');
//   });

// // JSON of States for demo purposes
// var usStates = [
//     { name: '01', abbreviation: 'AL'},
//     { name: '02', abbreviation: 'WY' },
//     { name: '03', abbreviation: 'AL'},
//     { name: '04', abbreviation: 'AL'},
//     { name: 'ncs', abbreviation: 'AL'},
//     { name: 'ful', abbreviation: 'AL'},
//     { name: 'gal', abbreviation: 'AL'},
//     { name: 'gth', abbreviation: 'AL'},
//     { name: 'sld', abbreviation: 'AL'},
//     { name: 'sch', abbreviation: 'AL'},
//     { name: 'scc', abbreviation: 'AL'},
//     { name: 'dmc', abbreviation: 'AL'},
//     { name: 'eps', abbreviation: 'AL'},
//     { name: 'sec', abbreviation: 'AL'},
//     { name: 'snk', abbreviation: 'AL'},
//     { name: 'pro', abbreviation: 'AL'},
//     { name: 'web', abbreviation: 'AL'},
//     { name: 'bsc', abbreviation: 'AL'},
//     { name: 'int', abbreviation: 'AL'},
//     { name: 'smc', abbreviation: 'AL'},
//     { name: 'scs', abbreviation: 'AL'},
//     { name: 'ses', abbreviation: 'AL'}
// ];

// // <li> template
// var stateTemplate = _.template(
//     '<li>' +
//       '<input name="<%= abbreviation %>" type="checkbox">' +
//       '<label for="<%= abbreviation %>"><%= capName %></label>' +
//     '</li>'
// );

// // Populate list with states
// _.each(usStates, function(s) {
//     s.capName = _.startCase(s.name.toLowerCase());
//     $('ul').append(stateTemplate(s));
// });