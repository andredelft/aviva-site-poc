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
    entry: path.join(process.cwd(), 'src', 'layouts', 'case.hbs'),
    output: path.join(process.cwd(), 'build', 'case-greenchoice.html'),
    data: {
      title: 'Case - Greenchoice',
      clientClass: 'client-greenchoice',
      properties: {
        pagecontent: 'case-greenchoice',
      },
    },
  },
  {
    entry: path.join(process.cwd(), 'src', 'layouts', 'case.hbs'),
    output: path.join(process.cwd(), 'build', 'case-this-is-eindhoven.html'),
    data: {
      title: 'Case - Eindhoven',
      clientClass: 'client-this-is-eindhoven',
      properties: {
        pagecontent: 'case-this-is-eindhoven',
      },
    },
  },
  {
    entry: path.join(process.cwd(), 'src', 'layouts', 'case.hbs'),
    output: path.join(process.cwd(), 'build', 'case-plaisio.html'),
    data: {
      title: 'Case - Plaisio',
      clientClass: 'client-plaisio',
      properties: {
        pagecontent: 'case-plaisio',
      },
    },
  },
];
