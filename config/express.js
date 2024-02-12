'use strict';
const Fs = require('fs');
const BodyParser = require('body-parser')
const dirToJson = require('../libs/dir_to_json');
const responseFormat = require('../libs/response_format');
const Cors = require('cors');
const session = require('express-session')
const passport = require('../middleware/passport');


const basePathTmp = __dirname + '/../tmp';
if (!Fs.existsSync(basePathTmp)) {
  // console.log('*** Express generate directory:', basePathTmp);
  Fs.mkdirSync(basePathTmp);
}
const basePathUpload = __dirname + '/../uploads/';
if (!Fs.existsSync(basePathUpload)) {
  // console.log('*** Generate directory:', basePathUpload);
  Fs.mkdirSync(basePathUpload);
}
const arrFolder_in_uploads = ['medias'];
for (let i = 0; i < arrFolder_in_uploads.length; i++) {
  let pathsUpload = basePathUpload + arrFolder_in_uploads[i];
  if (!Fs.existsSync(pathsUpload)) {
    // console.log('*** Generate directory:', pathsUpload);
    Fs.mkdirSync(pathsUpload);
  }
}

exports.Config = async (App, express) => {
  const oneDay = 1000 * 60 * 60 * 24;
  App.use(express.static(__dirname + '/../public', { maxAge: oneDay }));
  App.use("/uploads", express.static(__dirname + '/../uploads', { maxAge: oneDay }))
  App.set('uploadDir', './tmp');
  App.use(BodyParser.json({ limit: '200mb' }));
  App.use(BodyParser.urlencoded({ limit: '200mb', extended: false }))
  App.use(Cors());
  App.use(responseFormat)
  App.use(session({ secret: global.config.headerAuth.secret }))
  App.use(passport.passport.initialize());
  App.use(passport.passport.session());
}


exports.LoadGlobal = async (globalName, strDirName, replaceName) => {
  // console.log('##### Express Load Global:', globalName, strDirName, replaceName);
  if (!globalName || !strDirName || !replaceName) return false;
  global[globalName] = {};
  // const strDirName = __dirname + '/../helpers';
  const modelNameUpperCase = (str) => {
    let repName = (str).replace(`${replaceName}`, '').replace('.js', '');
    let splitStr = repName.toLowerCase().split('_');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join('');
  };

  const LoadData = async (pathName, globalName, subName = '') => {
    return new Promise((resolve) => {
      try {
        return dirToJson(pathName).then(async dirTree => {
          if (dirTree.children) {
            dirTree.children.forEach(dataChildren => {
              if (dataChildren.type === 'file' && (dataChildren.name).split('.').pop() === 'js') {
                try {
                  let modelName = modelNameUpperCase(dataChildren.name);
                  globalName[modelName] = require(`${pathName}/${dataChildren.name}`);
                } catch (err) {
                  console.error('Load: Error ', dataChildren.name, err);
                }
              } else if (dataChildren.type === 'directory') {
                const name = modelNameUpperCase(dataChildren.name);
                globalName[name] = {};
                LoadData(`${pathName}/${dataChildren.path}`, globalName[name], `${subName}/${name}`);
              }
            });
           return resolve(true);
          } else {
            return resolve(true);
          }
        });
      } catch (err) {
        console.error(`### Error Load model: ${pathName}`);
        return resolve(false);
      }
    });
  };
  await LoadData(strDirName, global[globalName]);
};

exports.NotFound = (req, res, next) => {
  console.info('Server Not Found', req.originalUrl);
  let resData = {
    code: 404,
    msg: 'Server Not Found',
    data: null,
  };
  return res.status(404).send(resData);
};

exports.Error = (err, req, res, next) => {
  console.error('Internal Server Error', req.originalUrl);
  console.error('Error', err);
  let resData = {
    code: 500,
    msg: 'Internal Server Error',
    data: null,
    ts: Date.now(),
  };
  let errorBody = { status: 500, message: err.message, stack: err.stack };
  if (process.env.NODE_ENV !== 'production') {
    resData.error = errorBody;
  }
  return res.status(500).json(resData);
};