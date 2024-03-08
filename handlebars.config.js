const path = require('path');

module.exports = [
  {
    entry: path.join(process.cwd(), 'src', 'layouts', 'clean.hbs'),
    output: path.join(process.cwd(), 'build', 'index.html'),
    data: {
      title: 'Overview',
      properties: {
        pagecontent: 'index',
      },
    },
  },
  {
    entry: path.join(process.cwd(), 'src', 'layouts', 'default.hbs'),
    output: path.join(process.cwd(), 'build', 'homepage.html'),
    data: {
      title: 'Homepage',
      properties: {
        pagecontent: 'homepage',
      },
    },
  },
  {
    entry: path.join(process.cwd(), 'src', 'layouts', 'default.hbs'),
    output: path.join(process.cwd(), 'build', 'case.html'),
    data: {
      title: 'Case',
      properties: {
        pagecontent: 'case',
      },
    },
  },
];
