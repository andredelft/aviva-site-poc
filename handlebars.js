const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const https = require('http');
const config = require('./handlebars.config');

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
  return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('var', function (name, value) {
  this[name] = value;
});

Handlebars.registerHelper('version', function () {
  return new Date().getTime();
});

Handlebars.registerHelper('dev', function () {
  return process.env.NODE_ENV === 'development';
});

Handlebars.registerHelper('append', function (arg1, arg2) {
  return (arg1 || '') + (arg2 || '');
});

function fromDir(startPath, filter, callback) {
  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); //recurse
    } else if (filter.test(filename)) callback(filename);
  }
}

const buildTemplate = (source, output, data, callback) => {
  fs.readFile(source, 'utf-8', function (error, source) {
    let template = Handlebars.compile(source);
    let html = template(data);

    const dir = './build/';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFile(output, html, (err) => {
      if (err) return console.log(err);

      callback();
    });
  });
};

const registerAssetsPartials = () => {
  fromDir('./src/assets', /\.hbs$/, function (filename) {
    const contents = fs.readFileSync(path.join(__dirname, filename));
    const partialName = filename
      .replace(`src${path.sep}assets${path.sep}`, '')
      .replace(new RegExp('\\' + path.sep, 'g'), '/');
    Handlebars.registerPartial(partialName.split('.')[0], Handlebars.compile(`${contents}`));
  });
};

const registerPagePartials = () => {
  fromDir('./src/pages', /\.hbs$/, function (filename) {
    const contents = fs.readFileSync(path.join(__dirname, filename));
    const partialName = filename
      .replace(`src${path.sep}pages${path.sep}`, '')
      .replace(new RegExp('\\' + path.sep, 'g'), '/');
    Handlebars.registerPartial(partialName.split('.')[0], Handlebars.compile(`${contents}`));
  });
};

const registerPartials = () => {
  fromDir('./src/', /\.(?:hbs|svg)$/, function (filename) {
    const contents = fs.readFileSync(path.join(__dirname, filename));
    const partialName = filename
      .replace(`src${path.sep}`, '')
      .replace(new RegExp('\\' + path.sep, 'g'), '/');
    Handlebars.registerPartial(partialName.split('.')[0], Handlebars.compile(`${contents}`));
  });
};

const build = (once = false) => {
  const templates = config.length;
  let parsed = 0;

  registerAssetsPartials();
  registerPartials();
  registerPagePartials();

  config.forEach((conf) => {
    buildTemplate(conf.entry, conf.output, conf.data, () => {
      parsed += 1;

      if (parsed === templates && !once) {
        https
          .get('http://localhost:3000/__browser_sync__?method=reload', () => {
            console.log('Reloaded!');
          })
          .on('error', (err) => {
            console.log('Error: ' + err.message);
          });
      }
    });
  });
};

if (typeof process.argv[2] !== 'undefined' && process.argv[2] === '--build') {
  build(true);
} else {
  build();
  require('chokidar')
    .watch(['src/**/*.hbs', 'src/**/*.svg'], {
      ignored: /[\/\\]\./,
    })
    .on('change', () => {
      build();
    });
}
