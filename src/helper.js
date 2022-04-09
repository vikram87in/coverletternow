const fetch = require('node-fetch');
const localizationUS = require('./resource-files/resource.en-us.json');

async function getStaticData(hostname) {
  let dataObj = getPortalSettings(hostname);
  dataObj.featureList = await getFeaturesList();
  return dataObj;
}

async function getFeaturesList() {
  const url = 'https://api-qa-embedded-builder.cover-letter-now.com/api/v1/config/features/cln?skipCache=true';
  try {
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (err) {
    throw `Error while fetching the feature list: ${err.message || err}`;
  }
}

function getPortalSettings(hostname) {
  const dataObj = {};
  if (hostname.includes('cover-letter-now')) {
    dataObj.docTypeProp = 'html';
    dataObj.culture = 'en';
    dataObj.pageTitle = 'Cover Letter Now (Node)';
    dataObj.isMobile = false;
    dataObj.blobBaseUrl = '/blobcontent/';
    dataObj.urlDirectory = '/build-letter';
    dataObj.IsFinalizeTestBed = true;
    dataObj.jsBundleScript = '/build-letter/build/developer.bundle-token_buildversion.js';
    dataObj.isLoadSansProWithRobotoSlab = false;
    dataObj.isLoadWorkSans = true;
    dataObj.isLoadMontserrat = false;
    dataObj.bootstrapBundleUrl = '/build-letter/build/stylesheets/bootstrap/cln/bootstrap.css';
    dataObj.cssBundleUrl = '/build-letter/build/stylesheets/clnjt/main-token_buildversion.css';
    dataObj.appJsScriptUrl = '/build-letter/build/app.bundle-token_buildversion.js';
    dataObj.baseProductPath = 'clb';
    dataObj.bodyClass = '';
    dataObj.commonLoginUrl = 'https://qa-accounts.cover-letter-now.com/'; //verify
    dataObj.buildVersion = 'token_buildversion'; //get from config
    dataObj.authCookieName = 'UserStatus'; //get from config CLBBLD_QUA_W_COR
    dataObj.sourceAppCD = 'CLBBLD_QUA_W_COR'; //get from config 
    dataObj.disableTestsScriptUrl = dataObj.urlDirectory + (dataObj.isMobile ? "/mobile" : "") + "/scripts/disableTestsScript.js?v=" + dataObj.buildVersion;
    dataObj.isShowHowItWorks = true;
    dataObj.bodyClass = '';
    dataObj.baseUrl = '/blobcontent/';
    dataObj.isJoshuaTree = true; //get from config
    dataObj.unsupportedBrowserPath = '/information/unsupportedbrowsers'; // get from config
    dataObj.portalId = 14;
    dataObj.logoPath = dataObj.baseUrl + dataObj.baseProductPath + "/cln/images/cover-letter-logo.svg";
    dataObj.favIconUrl = dataObj.baseUrl + dataObj.baseProductPath + "/cln/images/favicon.ico";
    if (dataObj.isJoshuaTree) {
      dataObj.isLoadWorkSans = true;
      dataObj.logoPath = dataObj.baseUrl + dataObj.baseProductPath + "/cln/images/cover-letter-logo-jt.svg";
    }
    dataObj.isSkipCache = true;
    dataObj.culture = "en";
    dataObj.uiExperimentJSPath = "/ui-experimentation/cln/experiment.js";
    dataObj.reactRoutes = desktopRoutes();
    dataObj.enableReactRoutes = true;
    dataObj.skipHistoryPushState = true;
    dataObj.isAccessibility = true;
    dataObj.currentPortalDetails = currentPortalDetails('cln');
    dataObj.localization = JSON.stringify(localizationUS);
  }
  return dataObj;
}

function currentPortalDetails(portalCD) {
  if (portalCD == 'cln') {
    return {
      "portalCD": "cln",
      "portalID": 14,
      "culture": "en-US",
      "isIntl": false,
      "isAccLCEnabled": false,
      "isAccountsEnabled": true,
      "isOptionCall": true,
      "placeholderColorTxtColor": "#FF6600",
      "basePath": "",
      "isCssScaling": false,
      "iconHoverRightValue": null,
      "SDSB": null,
      "disableCustomGADimension": false
    }
  }
}

function desktopRoutes() {
  return {
    "HowItWorks": "",
    "ChooseTemplate": "/choose-template",
    "NameContact": "/contact",
    "OpenerOverview": "/opener/tips",
    "JobTitle": "/job-title",
    "Company": "/company",
    "WorkExperience": "/experience",
    "OpenerTTC": "/opener/edit",
    "BodyOverview": "/body/tips",
    "PreviousJobTitle": "/experience/job-title",
    "HardSkills": "/skills",
    "BodyTTC": "/body/edit",
    "GapsOverview": "/gaps/tips",
    "GapsTTC": "/gaps/edit",
    "CloserOverview": "/closer/tips",
    "CloserTTC": "/closer/edit",
    "Finalize": "/finalize",
    "CreateVsUpload": "/creation-mode",
    "UploadResume": "/upload-resume",
    "Recipient": "/recipient/edit",
    "GreetingTTC": "/greeting/edit",
    "SubjectTTC": "/subject/edit",
    "AvailablityTTC": "/availability/edit",
    "ConfidentialityTTC": "/confidentiality/edit",
    "RelocationTTC": "/relocation/edit",
    "SalaryRequirementsTTC": "/salary/edit",
    "SignatureOverview": "/signature/tips",
    "SignatureView": "/signature/edit",
    "UploadReview": "/review"
  }
}


module.exports = { getStaticData };