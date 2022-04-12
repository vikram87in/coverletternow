const fetch = require('node-fetch');
const path = require('path');
const dotenv = require('dotenv');

async function getStaticData(hostname, isMobile, IsFinalizeTestBed) {
  try {
    const subDomain = getSubDomain(hostname);
    const urlWithoutSubDomain = getWithoutSubDomain(hostname);
    const dataObj = await getPortalWiseData(subDomain, urlWithoutSubDomain, isMobile, IsFinalizeTestBed);
    return dataObj;
  } catch (error) {
    return {};
  }
}

async function getPortalWiseData(subDomain, urlWithoutSubDomain, isMobile = false, IsFinalizeTestBed = false) {
  const dataObj = {};

  // loads appropriate .env file
  const envFile = getEnvFile(subDomain);
  dotenv.config({
    path: path.resolve(process.cwd(), envFile)
  });

  // get configuration file
  let config;
  try {
    config = require('./configurations/' + urlWithoutSubDomain + '/config.json');
  } catch (error) {
    config = require('./configurations/cover-letter-now.com/config.json');
  }

  // get features list
  dataObj.featureList = await getFeaturesList(process.env.apiUrl, urlWithoutSubDomain, config.featuresPath, config.isSkipCache);
  const showHIWDesktop = Array.isArray(dataObj.featureList) && dataObj.featureList.find(x => x.featureCD == "SHWHIW")?.isActive;

  // get localization file
  const localizationFile = "./resource-files/resource." + config.portalDetails?.culture?.toLowerCase() + ".json";
  const localization = require(localizationFile);

  dataObj.isMobile = isMobile;
  dataObj.IsFinalizeTestBed = IsFinalizeTestBed;
  dataObj.docTypeProp = isMobile ? 'html Cache-Control no-transform' : 'html';
  dataObj.language = config.language;
  dataObj.baseProductPath = 'clb';
  dataObj.urlDirectory = '/build-letter' + (isMobile ? "/mobile" : "");
  dataObj.buildVersion = 'token_buildversion';
  dataObj.pageTitle = localization.clb_coveringLetterBuilder;
  dataObj.authCookieName = 'UserStatus';
  dataObj.isLoadWorkSans = config.isLoadWorkSans;
  dataObj.blobBaseUrl = config.blobBaseUrl;
  dataObj.disableTestsScriptUrl = dataObj.urlDirectory + "/scripts/disableTestsScript.js?v=" + dataObj.buildVersion;
  dataObj.logoPath = dataObj.blobBaseUrl + dataObj.baseProductPath + config.logoPath;
  dataObj.favIconUrl = dataObj.blobBaseUrl + dataObj.baseProductPath + "/" + config.portalCd + "/images/favicon.ico";
  dataObj.enableReactRoutes = config.enableReactRoutes;
  dataObj.skipHistoryPushState = config.skipHistoryPushState;
  dataObj.reactRoutes = (isMobile ? config.mobileRoutes : config.desktopRoutes) || {};
  dataObj.isAccessibility = config.isAccessibility;
  dataObj.localization = JSON.stringify(localization);
  dataObj.unsupportedBrowserPath = config.unsupportedBrowserPath;
  dataObj.uiExperimentJSPath = config.uiExperimentJSPath?.replace('{0}', config.portalCd);
  dataObj.currentPortalDetails = config.portalDetails;
  dataObj.isJoshuaTree = config.isJoshuaTree;
  dataObj.sourceAppCD = process.env.sourceAppCD;
  dataObj.commonLoginUrl = process.env.commonLoginURL?.replace('{0}', urlWithoutSubDomain);
  dataObj.jsBundleScript = dataObj.urlDirectory + "/build/developer.bundle-" + dataObj.buildVersion + ".js";
  dataObj.appJsScriptUrl = dataObj.urlDirectory + "/build/app.bundle-" + dataObj.buildVersion + ".js";
  dataObj.cssBundleUrl = dataObj.urlDirectory + config.cssBundlePartialPath + dataObj.buildVersion + ".css";
  dataObj.bootstrapBundleUrl = dataObj.urlDirectory + config.bootstrapPartialPath;
  dataObj.portalId = config.portalId;
  dataObj.bodyClass = '';
  dataObj.isLoadSansProWithRobotoSlab = false;
  dataObj.isLoadMontserrat = false;
  dataObj.isShowHowItWorks = isMobile ? true : showHIWDesktop;
  return dataObj;
}

async function getFeaturesList(apiUrl, urlWithoutSubDomain, featuresPath, isSkipCache) {
  const url = apiUrl?.replace('{0}', urlWithoutSubDomain)
    + featuresPath
    + (isSkipCache ? '?skipCache=true' : '');
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return [];
  }
}

function getSubDomain(hostname = '') {
  try {
    return hostname.slice(0, hostname.indexOf('.'));
  } catch (error) {
    return 'www';
  }
}

function getWithoutSubDomain(hostname = '') {
  try {
    return hostname.slice(hostname.indexOf('.') + 1);
  } catch (error) {
    return 'cover-letter-now.com';
  }
}

function getEnvFile(subDomain) {
  let mappedDomain;
  switch (subDomain) {
    case 'www':
    case 'stg':
      mappedDomain = 'prod.env';
      break;
    case 'reg':
      mappedDomain = 'reg.env';
      break;
    default:
      mappedDomain = 'qa.env';
  }
  return mappedDomain;
}

module.exports = { getStaticData };