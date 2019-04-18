'use strict';

const nameToId = {
  'Google': 1,
  'Quote': 2,
  'NASA': 3,
  'Reddit': 4,
  'Weather': 5,
  'Gif': 6,
}

fetch('/users')
  .then(res => {
    res.json().then(data => {
      // Add user name at top of page
      document.getElementById('user').innerText = 
        `User: ${data.name.toUpperCase()}`;

      // Add current snooze setting to page
      const snoozeId = `snoozeSelect${data.snooze}`;
      document.getElementById(snoozeId).checked = true;

      // Add selected APIs
      data.api.forEach(a => {
        const apiId = `api${nameToId[a]}`;
        document.getElementById(apiId).checked = true;
      })
    })
  })
  .catch(err => console.log(err));