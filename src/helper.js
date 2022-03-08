const fetch = require('node-fetch');

async function getStaticData(hostname) {
  let dataObj = {};
  dataObj = getPortalSettings(hostname);
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

    dataObj.baseProductPath = "clb";
    dataObj.baseUrl = "/blobcontent/";
    dataObj.isJoshuaTree = true;
    dataObj.portalId = 14;
    dataObj.logoPath = dataObj.baseURL + dataObj.baseProductPath + "/cln/images/cover-letter-logo.svg";
    dataObj.favIconUrl = dataObj.baseUrl + dataObj.baseProductPath + "/cln/images/favicon.ico";
    if (dataObj.isJoshuaTree) {
      dataObj.isLoadWorkSans = true;
      dataObj.logoPath = dataObj.baseURL + dataObj.baseProductPath + "/cln/images/cover-letter-logo-jt.svg";
    }
    dataObj.isSkipCache = true;
    dataObj.culture = "en";
    // dataObj.portalDetails = new PortalDetails(portalCD: "cln", portalID: 14, isAccountsEnabled: true,
    //   isOptionCall: Convert.ToBoolean(ConfigurationManager.AppSettings["AllowOptions_CLN"]), placeholderColorTxtColor: "#FF6600");
    dataObj.uiExperimentJSPath = "/ui-experimentation/cln/experiment.js";
    dataObj.unsupportedBrowserPath = "/information/unsupportedbrowsers";
    dataObj.reactRoutes = desktopRoutes();
    dataObj.enableReactRoutes = true;
    dataObj.skipHistoryPushState = true;
    return dataObj;
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