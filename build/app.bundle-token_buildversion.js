window.RDL = window.RDL || {};
window.globalCompVars = window.globalCompVars || {};
var testingRules = "";
var requestingDomain = "cover-letter-now.com";
var configEnvironment = "dev";
var environment = window.location.hostname.split('.')[0];
var createGuestUserTimer;
var generateClaimsTimer;
var postGuestUserTimer;
var postGuestCreatedCalled = false;
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
RDL.Paths = {};
window.RDL.IS_TOS_PP_AGREED = "toupv";
function isIPAD() {
    if (navigator.userAgent.match(/iPad/i))
        return true;
    else
        return false;
}
RDL.experimentsObj = {
    // TODO: uncomment later on
    // ImportFromResume: {
    //     experimentname: "Import from Resume",
    //     experimentId: "894dd23a-8055-49d0-9d1f-3aff856e2c5a",
    //     variants: [{ 1: "Control" }, { 2: "Import from Resume" }, { 3: "Variability Estimator" }],
    //     portalsForConduction: ["RNA"],
    //     cookie: "isImportFromResume",
    //     activeVariant: "",
    //     setVariant: function (variant) {
    //         RDL.experimentsObj.ImportFromResume.activeVariant = variant;
    //         if (variant == 2) {
    //             RDL.experimentControl.isImportFromResume = true;
    //         };
    //     }
    // },
    ColorPicker: {
        experimentname: "CLB Color Picker",
        experimentId: "302d6bbe-958d-4607-9921-c90886f948f8",
        variants: [{ 1: "Control" }, { 2: "Color Picker" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isColorPicker",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.ColorPicker.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.showColorPicker = true;
            };
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    GoogleOneTap: {
        experimentname: "Google One Tap",
        experimentId: "b4f1e50e-3ffe-474d-acd4-8116fd42d39e",
        variants: [{ 1: "Control" }, { 2: "Google One Tap" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isGoogleOneTap",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.GoogleOneTap.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isGoogleOneTap = true;
            };
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    UploadResume: {
        experimentname: "Upload Resume V2 Contact Screen",
        experimentId: "2fbccacd-ac31-42db-9e38-3a4f20ab56d3",
        variants: [{ 1: "Control" }, { 2: "Create Vs Upload" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isUploadResume",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.UploadResume.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isUploadResume = true;
            };
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    PersonalizationV1: {
        experimentname: "CLB Personalization V1",
        experimentId: "0c8590b7-17f0-43d7-8b32-c8d87c7bcf27",
        variants: [{ 1: "Control" }, { 2: "Personalized Funnel" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isPersonalizationV1",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.PersonalizationV1.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isPersonalizationV1 = true;
            };
        },
        isFrontEnd: true, //This is a front end experiment. Added in RDL.experimentsObj object just to keep track of details.
        isActive: false,
    },
    SkillsV2: {
        experimentname: "Skills V2",
        experimentId: "1403ae94-ffc8-4963-bd51-5bd19757d6b2",
        variants: [{ 1: "Control" }, { 2: "Skills V2 new UI" }, { 3: "Skills V2" }, { 4: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isSkillsV2",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.SkillsV2.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isSkillsV2NewUI = true;
            } else if (variant == 3) {
                RDL.experimentControl.isSkillsV2 = true;
            }
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    PayPerDownload: {
        experimentname: "CLN Desktop PPD v1",
        experimentId: "0dfa6df2-829b-4a67-8872-158b95e3ab77",
        variants: [{ 1: "Baseline" }, { 2: "Variability Estimator" }, { 3: "V1: 1st Download Free, then $0.50" }],
        portalsForConduction: ["CLN"],
        cookie: "isPayPerDownload",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.PayPerDownload.activeVariant = variant;
            if (variant == 3) {
                RDL.experimentControl.isPayPerDownloadDesktop = true;
                window.RDL.payPerFeatureWidgetURL && loadJs(window.RDL.payPerFeatureWidgetURL);
            };
        },
        isSkipActiveCheck: true
    },
    PayPerDownloadMobile: {
        experimentname: "CLN Mobile PPD v1",
        experimentId: "d8f75b54-2c5b-45bd-9996-5f390b4d0295",
        variants: [{ 1: "Baseline" }, { 2: "Variability Estimator" }, { 3: "V1: 1st Download Free, then $0.50" }],
        portalsForConduction: ["CLN"],
        cookie: "isPayPerDownloadMobile",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.PayPerDownloadMobile.activeVariant = variant;
            if (variant == 3) {
                RDL.experimentControl.isPayPerDownloadDesktop = true;
                window.RDL.payPerFeatureWidgetURL && loadJs(window.RDL.payPerFeatureWidgetURL);
            };
        },
        isSkipActiveCheck: true
    },
    Finalize2Funnel: {
        experimentname: "Finalize2Funnel",
        experimentId: "7389d499-dd85-4bc9-9a11-44c7b8d4781d",
        variants: [{ 1: "Control" }, { 2: "Finalize2Funnel" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isFinalize2Funnel",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.Finalize2Funnel.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isFinalize2Funnel = true;
            }
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    SectionBreakAndProgressBar: {
        experimentname: "Section Break And Vertical Progress Bar",
        experimentId: "cf1dd00b-235d-4dd2-b5f5-fa8486f8d344",
        variants: [{ 1: "Control" }, { 2: "Section Break" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isSectionBreak",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.SectionBreakAndProgressBar.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isSectionBreak = true;
            }
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    TemplatePageSocialProof: {
        experimentname: "Template Page Social Proof",
        experimentId: "5d2078d8-ec76-41fa-8344-d4c86795d689",
        variants: [{ 1: "Control" }, { 2: "Social Proof" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isTemplatePageSocialProof",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.TemplatePageSocialProof.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isTemplatePageSocialProof = true;
            }
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    DelayLoginPopup: {
        experimentname: "Delay Login Popup",
        experimentId: "0353cc3a-b729-4e05-a7e4-85fe630947be",
        variants: [{ 1: "Baseline" }, { 2: "Variability Estimator" }, { 3: "Delay registration pop up" }],
        portalsForConduction: ["LDE"],
        cookie: "isDelayLoginPopup",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.DelayLoginPopup.activeVariant = variant;
            if (variant == 3) {
                RDL.experimentControl.isDelayLoginPopup = true;
            }
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
    ContentAPI: {
        experimentname: "CLN Content API No Filters",
        experimentId: "bd92eec1-2a13-4b3a-8d91-49bd3f98e4fd",
        variants: [{ 1: "Control" }, { 2: "Content API No Filters" }, { 3: "Variability Estimator" }],
        portalsForConduction: ["CLN"],
        cookie: "isContentAPI",
        activeVariant: "",
        setVariant: function (variant) {
            RDL.experimentsObj.ContentAPI.activeVariant = variant;
            if (variant == 2) {
                RDL.experimentControl.isContentAPI = true;
            }
        },
        isSPA: true,
        isActive: false,
        isCheckVariant: true
    },
}

window.RDL.defaultPlaceholderColor = "#0000FF";
window.RDL.placeholderColor = RDL.currentPortalDetails.placeholderColorTxtColor || window.RDL.defaultPlaceholderColor;
var requestingDomain = '';
if (window.location.host.split('.').length > 2) {
    requestingDomain = window.location.host.split(':')[0].substr(window.location.host.indexOf('.') + 1);//getDomain(urlOrigin, false);
} else {
    requestingDomain = window.location.host;
}
window.RDL.Paths.BasePath = RDL.currentPortalDetails.basePath;

if (environment == "local" && !RDL.currentPortalDetails.isOptionCall) {
    RDL.currentPortalDetails.isOptionCall = true;
}

function getApiUrl(version) {
    var configName = "qa-";
    // var baseUrl = environment != "www" ? 'https://api-@@env-embedded-builder.' + requestingDomain + '/api/v1/'
    //     : 'https://api-embeddedbuilder.' + requestingDomain + '/api/v1/';

    // var baseUrl = RDL.currentPortalDetails.isOptionCall ? 
    //               'https://api-@@env-embedded-builder.' + requestingDomain + '/api/v1/' : 
    //               window.location.origin+'/api/v1/';
    var baseUrl = !RDL.currentPortalDetails.isOptionCall ? window.location.origin + '/eb/api/v1/' : 'https://api-@@env-embedded-builder.' + requestingDomain + '/api/v1/';
    //TODO:Move HC //WLB
    if (RDL.currentPortalDetails.portalID == 79) {
        environment = "dev";
        baseUrl = "https://api-embeddedbuilder.les-dev.com/api/v1/";
    }
    switch (environment) {
        case "local":
        case "local-builder":
            baseUrl = baseUrl.replace('local', 'qa');
            break;
        case "regression":
        case "regression-builder":
            configName = "regression-";
            break;
        case "reg":
        case "reg-builder":
            configName = "reg-";
            break;
        case "stg":
        case "stg-builder":
            configName = "stg-";
            break;
        case "perf":
        case "perf-builder":
            configName = "perf-";
            break;
        case "pen":
            configName = "pen";
            break;
        case "www":
        case "builder":
            baseUrl = !RDL.currentPortalDetails.isOptionCall ? window.location.origin + '/eb/api/v1/' : 'https://api-embeddedbuilder.' + requestingDomain + '/api/v1/';
            configName = "";
            break;
    }
    var returnUrl = baseUrl.replace('@@env-', configName);
    return version ? returnUrl.replace('v1', version) : returnUrl;
}
RDL.experimentControl = RDL.experimentControl || {};
globalCompVars.BaseApiUrl = getApiUrl();
globalCompVars.BaseApiUrlV2 = getApiUrl("v2");
globalCompVars.BaseApiUrlV3 = getApiUrl("v3");
RDL.requestingDomain = requestingDomain;
RDL.emailSendingDomain = requestingDomain;
RDL.Paths.AccountsURL = "";
//globalCompVars.BaseApiUrl = 'https://local.embeddedbuilderapi-builder.' + window.requestingDomain + '.com/api/v1/'
//globalCompVars.BaseApiUrlV2 = 'https://local.embeddedbuilderapi-builder.' + window.requestingDomain + '.com/api/v2/'
RDL.Paths.PortalEditUrl = 'https://www.' + requestingDomain + '/builder/letters/edit.aspx';
!RDL.Paths.BasePath && (RDL.Paths.BasePath = '/build-letter');
RDL.Paths.termsOfUseURL = '';
RDL.Paths.privacyURL = '';
RDL.VisitorApiSetting = {};
RDL.PortalSettings = RDL.PortalSettings || {};
//TODO:Move HC
RDL.PortalSettings.isAccountsEnabled = RDL.currentPortalDetails.isAccountsEnabled;
RDL.portalIDforUpdateTemplate = 0;
RDL.Skins = {};
RDL.DocumentTypeCD = 'LETR';
RDL.defaultTemplateID = 92;
RDL.defaultTemplateTypeCD = "EXPR";
RDL.segmentKey = '';
RDL.guestUserID = null;
RDL.guestUserCreated = false;
RDL.isRefresh = true;
RDL.Content = {};
RDL.DefaultSkinImageURL = window.RDL.blobBaseUrl + window.RDL.PortalSettings.baseProductPath + "/" + RDL.currentPortalDetails.portalCD + "/images/cnt4.svg";
RDL.hideErrors = false;
RDL.countryDetails = { countryCode: "", continentCode: "", isEuropianContinent: false, city: "", state: "", isEEACountry: false };
RDL.DebounceTime = 250;
RDL.defaultDocImage = true;
RDL.homeLogo = "";
RDL.gapSectionIndex = 9;
RDL.isEnableThirdPartyScripts = true;
RDL.DegreeList = {};
window.RDL.RunTest = {};
RDL.experimentTraits = {};
RDL.defaultSkinForChooseTemplatePage = 'EMP1';
RDL.newRelicLoading = {
    enableNewRelic: false,
    newRelicApplicationID: 0,
    loadNewRelic: (function (newRelicSamplingPercent) {
        if (window.RDL.isEnableThirdPartyScripts && window.RDL.newRelicLoading.enableNewRelic == "true") {
            addNewRelic(window.RDL.newRelicLoading.newRelicApplicationID, newRelicSamplingPercent);
        }
    })
}
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.replaceAllOccurrences = function (searchValue, replacer, ignoreCase) {
    var target = this;
    var flags = ignoreCase ? "gi" : "g";
    return target.replace(new RegExp(searchValue, flags), replacer);
}

if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

/***********Handling Invalid URL*********/
var parser = document.createElement('a');
parser.href = window.location.href;

resetToBasePath = function () {
    var basePathIndexEnd = parser.pathname.indexOf(window.RDL.Paths.BasePath) + window.RDL.Paths.BasePath.length;
    if (parser.pathname.length > basePathIndexEnd) {
        parser.pathname = parser.pathname.substring(0, basePathIndexEnd);
        window.history.replaceState({}, document.title, parser.href);
    }
}

if (parser.href && !window.RDL.enableReactRoutes) {
    resetToBasePath();
}

/***********Check Mobile Device start*********/
RDL.mobileCheck = {
    IsMobileDevice: function () {
        var isMobileCheck = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            isMobileCheck = true;
        }
        return isMobileCheck;
    },
    IsTabletDevice: function () {
        var isTabCheck = false;
        if (/iPad|iPod/i.test(navigator.userAgent) || (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i))) {
            isTabCheck = true;
        }
        return isTabCheck;
    },
    isMobile: false,
    isTablet: false,
    MetaScaleAdd: function () {
        var metaTag = document.createElement('meta');
        metaTag.name = "viewport"
        metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";

        // Checking : append only once
        if (!document.querySelectorAll("meta[name=viewport]") || document.querySelectorAll("meta[name=viewport]").length < 1) {
            document.getElementsByTagName('head')[0].appendChild(metaTag);
        }
    },
    MetaScaleRemove: function () {
        // Removing existing viewport meta tag
        var elm = document.querySelectorAll("meta[name=viewport]");
        for (var i = 0; i < elm.length; i++) {
            if (elm[i] && elm[i].parentNode) {
                elm[i].parentNode.removeChild(elm[i]);
            }
        }

        var metaTag = document.createElement('meta');
        metaTag.name = "viewport";
        metaTag.content = "";
        document.getElementsByTagName('head')[0].appendChild(metaTag);
    },
    MetaScaleUpdateContent: function (content) {
        if (document.querySelectorAll("meta[name=viewport]") && document.querySelectorAll("meta[name=viewport]").length >= 1) {
            var element = document.querySelectorAll("meta[name=viewport]")[0];
            element.content = content;
        }
    }
}
RDL.mobileCheck.isMobile = RDL.mobileCheck.IsMobileDevice();
RDL.mobileCheck.isTablet = RDL.mobileCheck.IsTabletDevice();
if (RDL.mobileCheck.isMobile) {
    RDL.mobileCheck.MetaScaleAdd();
}

function getPlatformType() {
    if (navigator.userAgent.match(/mobile/i) && !navigator.userAgent.match(/ipad/i)) {
        return 'mobile';
    } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

window.RDL.deviceType = getPlatformType();
/***********Check Mobile Device End*********/



function checkBrowserCompatibility() {
    var objAgent = navigator.userAgent;
    var objfullVersion;
    var objOffsetVersion;
    var legacyEditorURL;

    if (!window.RDL.unsupportedBrowserPath) {
        window.RDL.unsupportedBrowserPath = '/information/unsupportedbrowsers.aspx'
    }

    if (window.location.hostname) {
        legacyEditorURL = window.location.protocol + "//" + window.location.hostname + window.RDL.unsupportedBrowserPath;
    }
    else {
        legacyEditorURL = window.location.origin + window.RDL.unsupportedBrowserPath;
    }

    // In Microsoft internet explorer 
    if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
        objfullVersion = objAgent.substring(objOffsetVersion + 5);
        if (objfullVersion.substring(0, objfullVersion.indexOf(".")) <= 9) {
            window.location.href = legacyEditorURL;
        }
    }
    // In Safari 
    else if (objAgent.indexOf("Safari") != -1) {
        objOffsetVersion = objAgent.indexOf("Version");
        var isVersionSet = objOffsetVersion != -1;
        var isChrome = /Chrome|CriOS/.test(objAgent); // CriOS: for Chrome in iOS devices
        var isOpera = /Opera|OPR\//.test(objAgent); // for Opera browsers
        var isSamsung = /samsung/i.test(objAgent); // Samsung devices added to be on safe side
        if (isVersionSet && !isChrome && !isOpera && !isSamsung) {
            objfullVersion = objAgent.substring(objOffsetVersion + 8);
            if (objfullVersion.substring(0, objfullVersion.indexOf(".")) <= 8) {
                window.location.href = legacyEditorURL;
            }
        }
    }
}

checkBrowserCompatibility();

function prefetchFile(fileURL) {
    var linkTag;
    linkTag = document.createElement('link');
    linkTag.rel = "prefetch";
    linkTag.href = fileURL;
    document.head.appendChild(linkTag);
}

prefetchFile(window.location.origin + RDL.urlDirectory + '/build/header.bundle-' + window.RDL.buildVersion + '.js');

RDL.ReplaceTTCSections_List = ['SUBJ', 'GRTG', 'CLSR', 'GAPS'];
RDL.Locale = "en-us";
RDL.userCity = '';
RDL.UserState = '';
RDL.createCookie = function (name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else
        expires = "";
    document.cookie = name + "=" + value + expires + "; path=/;domain=." + requestingDomain + ";secure";
}

RDL.deleteCookie = function (name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;domain=." + requestingDomain;
};

RDL.readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

RDL.createLS = function (key, value, days, storeValueOnly) {
    if (!window.localStorage) {
        RDL.createCookie(key, value, days);
        return;
    }
    if (!key) return;
    var ls = window.localStorage;
    var valObj;
    if (storeValueOnly) valObj = value;
    else {
        valObj = {
            value: value || ""
        }
        if (days) valObj.expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
        valObj = JSON.stringify(valObj);
    }
    //Set into LocalStorage
    ls.setItem(key, valObj);
}
RDL.readLS = function (key) {
    if (!window.localStorage) {
        return RDL.readCookie(key);
    }
    var valString = window.localStorage.getItem(key);
    if (!valString) {
        // Read from cookie
        valString = RDL.readCookie(key);
        if (!valString) return null;
        else {
            RDL.createLS(key, valString);
            RDL.deleteCookie(key)
            return valString;
        }
    }
    else {
        // Read from localstorage
        try {
            var valObj = JSON.parse(valString);
            if (valObj.expiry < Date.now()) return null;
            return valObj.value || valObj || null;
        }
        catch (err) {
            return null;
        }
    }
}

RDL.deleteLS = function (key) {
    if (!window.localStorage || RDL.readCookie(key)) {
        RDL.deleteCookie(key);
        return;
    }
    window.localStorage.removeItem(key);
}

RDL.GetQueryString = function (field) {
    var href = window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};

RDL.GetHTMLDocFromString = function (htmlString) {
    // var parser = new DOMParser();
    // var htmlDoc = parser.parseFromString(htmlString, "text/html");
    // return htmlDoc;

    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(htmlString, "text/html");
    if (window.RDL.features.showSignature && window.RDL.useDummySignature) { // temporay hack to show signature in skins.
        var signatureStr = '<div id="SECTION_SGTR" class="section sign notdraggable"><div id="PARAGRAPH_SGTR" class="paragraph"><div class="signPic"><div class="txtleft" dependency="HLEF"></div><div class="txtcenter" dependency="HMID"></div><div class="txtright" dependency="HRIG"></div><div class="field_sign"><div id="FIELD_SURL"></div><span class="field" id="FIELD_SDAT"></span><span class="field" id="FIELD_PLAC"></span></div></div></div></div>';
        var signatureDOM = parser.parseFromString(signatureStr, 'text/html');
        if (htmlDoc) {
            var selectorElem = htmlDoc.getElementById("document") || htmlDoc.querySelector(".skn-document");
            selectorElem && selectorElem.appendChild(signatureDOM.body.childNodes[0]);
        }
    }
    return htmlDoc;
}

function isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
};

// 49
function getResignationTemplateId() {
    return window.RDL.GetQueryString("resign") ? (window.RDL.GetQueryString("resign") == 1 ? 49 : "") :
        (window.RDL.readLS("isResignLetter") == 1 ? 49 : "")
};
RDL.resignationTemplateId = getResignationTemplateId();

RDL.isResumeExpert = (window.RDL.GetQueryString("rx") == '1');

RDL.experimentControl.isJobTitleEnhancement = (window.RDL.GetQueryString("isJobTitleEnhancement") == '1');

var analyticsTimer = null;
RDL.AsyncTrack = function (analyticsTimer) {
    getAnalyticsValues();
    analyticsTimer = setInterval(function () {
        if (typeof analytics != 'undefined' && (typeof AsyncSegTrack != 'undefined' || typeof TrackPageEventsFinal != 'undefined')) {
            clearInterval(analyticsTimer);
            if (RDL.commonSegmentURL) {
                TrackPageEventsFinal();
            }
            else {
                AsyncSegTrack();
            }
        }
    }, 100);
}

RDL.Timer = (function () {
    var time = 0;
    var formattedTime = "";
    var interval = null;

    var init = function () {
        interval = setInterval(currentTime, 60000);
    }

    var setTimerNode = function () {
        var timer = document.getElementById("timer");
        if (timer) {
            timer.innerText = getFormattedTime();
        }
    }

    var currentTime = function () {
        time++;
        setTimerNode();
    }

    var getFormattedTime = function () {
        if (time == 0) {
            formattedTime = window.RDL.Localization.lbl_justNow;
        }
        else if (time == 1) {
            formattedTime = window.RDL.Localization.lbl_minuteAgo;
        }
        else if (time > 1 && time <= 59) {
            formattedTime = window.RDL.Localization.lbl_minutesAgo && window.RDL.Localization.lbl_minutesAgo.replace("{0}", time);
        }
        else {
            formattedTime = window.RDL.Localization.lbl_overAnHourAgo;
        }
        return formattedTime;
    }

    var reset = function () {
        time = 0;
        setTimerNode();
        clearInterval(interval);
        init();
    }

    return {
        init: init,
        getFormattedTime: getFormattedTime,
        reset: reset
    };
}());

var segmentEventTimer = [];

RDL.TrackEvents = function (eventName, eventpropval, userid, islogin, skipTraitsToIterable) {
    if (typeof skipTraitsToIterable == 'undefined') skipTraitsToIterable = true;
    segmentEventTimer.push(setInterval(function () {
        trackEvent(eventName, eventpropval, userid, islogin, skipTraitsToIterable);
    }, 100));
};

RDL.IdentifyTraits = function (userid, traits, skipTraitsToIterable) {
    if (typeof skipTraitsToIterable == 'undefined') skipTraitsToIterable = true;
    if (RDL.commonSegmentURL) {
        var islogin = RDL.objClaims.role == "User" ? "TRUE" : "FALSE";
        RDL.TrackEvents('identify', traits, userid, islogin, skipTraitsToIterable);
    }
    else if (typeof analytics != 'undefined') {
        analytics.identify(userid, traits);
    }
};

RDL.UpdateMixPanelCookieLCUK = function () {
    try {
        var mixPanelProps = RDL.readCookie("mixpanelprops");
        if (mixPanelProps != null) {
            mixPanelProps = unescape(mixPanelProps);
            mixPanelProps = JSON.parse(mixPanelProps);
            delete mixPanelProps.mp_name_tag;
            delete mixPanelProps.id;
            mixPanelProps = JSON.stringify(mixPanelProps);
            mixPanelProps = escape(mixPanelProps);
            RDL.createCookie("mixpanelprops", mixPanelProps);
        }
    } catch (e) {
        console.log("Error in updating mixpanel cookie LCUK ")
    }
}
function handleClaims(result, resolve) {
    var data = JSON.parse(result);
    RDL.objClaims = data;
    if (window.updateLoginStatusInCommonProps)
        window.updateLoginStatusInCommonProps(RDL.objClaims);
    if (resolve)
        resolve("");
}

window.RDL.LogError = function (errorMessage, componentStack, logAsInfo, docId) {
    var mixpanelpropsVal = window.RDL.readCookie("mixpanelprops");
    var mixPanelValObj = JSON.parse(unescape(mixpanelpropsVal));
    var browserName = '';
    var currentUrl = window.location.href;
    if (mixPanelValObj) {
        browserName = mixPanelValObj["$browser"];
    }
    var errorObj = {
        errorMessage: errorMessage,
        componentStack: componentStack,
        logAsInfo: logAsInfo,
        docId: docId,
        sourceAppCd: window.RDL.sourceAppCD,
        productCD: RDL.PortalSettings.ConfigureProductCd,
        deviceType: RDL.deviceType,
        browser: browserName,
        currentUrl: currentUrl,
        portalCD: RDL.PortalSettings.ConfigurePortalCd,
        isINTL: RDL.currentPortalDetails.isIntl
    }
    fetch(window.globalCompVars.BaseApiUrlV2 + 'errors/log', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(errorObj)
    })
}

// For logging JS native error. Uncomment below section.
// window.onerror = function (message, source, line, column, error) {
//     var errorStack = null;
//     var alternateErrorTracing = 'source: ' + source + ' line: ' + line + ' column: ' + column;
//     if (error || source || line || column) {
//         errorStack = error ? (error.stack ? error.stack : alternateErrorTracing) : alternateErrorTracing;
//     }
//     RDL.LogError(message, errorStack, true);
// }

function callAjax(url, method, async, withCredentials, callback, response, shouldAppendDateTime, body) {
    try {
        var xmlhttp;
        // compatible with IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (callback)
                    if (response) {
                        callback(xmlhttp.responseText, response);
                    }
                    else {
                        callback(xmlhttp.responseText);
                    }
            }
        }
        xmlhttp.onerror = function (e) {
            throw e;
        }
        if (shouldAppendDateTime == "true") {
            url = (url.indexOf('?') > -1 ? url + '&' : url + '?');
            url = url + '_=' + new Date().getTime();
        }
        xmlhttp.open(method, url, async);
        if (body) {
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            // xmlhttp.setRequestHeader("Content-Type", "text/plain");
        }
        if (withCredentials)
            xmlhttp.withCredentials = true;
        xmlhttp.send(JSON.stringify(body));
    }
    catch (ex) {
        throw ex;
    }
}

/*********************Browser Specific Class added**************************** */

var $html = document.getElementsByTagName('html')[0];

var userAgent = navigator.userAgent,
    isIE = /*@cc_on!@*/false || !!document.documentMode,
    isEdge = !isIE && !!window.StyleMedia,
    isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
    isiPad = /(iPad)/g.test(navigator.userAgent),
    isiPhone = /(iPhone)/g.test(navigator.userAgent);

if (isiPad) $html.classList.add('ipad');

if (/MSIE/.test(userAgent) || /Trident/.test(userAgent)) {
    $html.classList.add('ie');

    if (/MSIE 10\.0/.test(userAgent)) $html.classList.add('ie10');
    if (/rv:11\.0/.test(userAgent)) $html.classList.add('ie11');
}

if (/iPad/.test(userAgent)) {
    $html.classList.add('ipad');
}

if (isiPhone) {
    $html.classList.add('iPhone');
}

if (isEdge) {
    $html.classList.add('edge');
}

if (isSafari) {
    $html.classList.add('safari');
}


/*********************Browser Specific Class added end**************************** */

var vstr = "",
    userType = "",
    url = "",
    path = "",
    isLoggedin = "",
    visitId = "";

function getAnalyticsValues() {
    vstr = window.RDL.readCookie("vstrType");
    visitId = RDL.readCookie('vsuid');
    userType = vstr == null ? "New" : "Returning";
    if (userType == "New" && !window.RDL.commonSegmentURL)
        window.RDL.createCookie("vstrType", "1", 1825);
    url = window.location.origin + window.location.pathname;
    path = window.location.pathname.replace(window.RDL.Paths.BasePath, "");
    if (path == "")
        path = "/";
    var claims = window.RDL.objClaims;
    isLoggedin = (claims.role != "Guest") ? 'TRUE' : 'FALSE';
}

var _plugins = {};
function _plugin(namespace) {
    var _thisPlugin = this;
    var _functionStack = [];

    function _execute() {
        if (typeof window[namespace] !== 'undefined') {
            while (_functionStack.length > 0) {
                var func = _functionStack.shift();
                tryExecuteFunction(func);
            }
        }
    }

    _thisPlugin.Load = function (func) {
        windowLoad(function (e) {
            func();
            _execute();
        });
        return _thisPlugin;
    };
    _thisPlugin.LoadScript = function (url) {
        windowLoad(function (e) {
            var script = document.createElement('script');
            bindEvent(script, 'load', _execute);

            script.src = url;
            document.body.appendChild(script);
        });
        return _thisPlugin;
    };
    _thisPlugin.Ready = function (func) {
        if (typeof window[namespace] !== 'undefined') {
            tryExecuteFunction(func);
        } else {
            _functionStack.push(func);
        }
        return _thisPlugin;
    };
}

function tryExecuteFunction(func) {
    try {
        func();
    } catch (err) {
        if (console) {
            if (console.error) {
                console.error('Error in executing function: ', err);
            } else {
                console.log('Error in executing function: ' + err);
            }
        }
    }
}

function showLoaderOverlay() {
    document.getElementById('overlayLoader').classList.remove('d-none');
}

function hideLoaderOverlay() {
    document.getElementById('overlayLoader').classList.add('d-none');
}

function showloadingAnimation() {
    document.getElementById('loaderOverlay').classList.remove('d-none');
}

function hideloadingAnimation() {
    if (document.getElementById('loaderOverlay')) {
        document.getElementById('loaderOverlay').classList.add('fade-animation');
        setTimeout(function () {
            document.getElementById('loaderOverlay').classList.remove('fade-animation');
            document.getElementById('loaderOverlay').classList.add('d-none');
        }, 1500);
    }
    document.getElementById("hiwSpinningLoader") && document.getElementById("hiwSpinningLoader").classList.add('d-none');
}

function windowLoad(func) {
    bindEvent(window, 'load', func);
}

function bindEvent(elem, name, func) {
    if ($) {
        if ($.fn.on) {
            $(elem).on(name, func);
        } else if ($.fn.bind) {
            $(elem).bind(name, func);
        }
    } else if (elem.addEventListener) {
        elem.addEventListener(name, func);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + name, func);
    } else {
        elem['on' + name] = function (e) {
            func(e);
        }
    }
}

RDL.Plugin = function (namespace) {
    if (typeof namespace === 'string') {
        if (!_plugins[namespace]) {
            _plugins[namespace] = new _plugin(namespace);
        }
        return _plugins[namespace];
    }
    return null;
};
var segmentEventTimerCount = 0;

function GetMixpanelProperties() {
    var mixpanelProperties = '';
    try {
        if (typeof mixpanel != 'undefined' && typeof mixpanel.get_distinct_id != 'undefined') {
            mixpanel.register({ 'device type': RDL.deviceType });
            var infoProperties = mixpanel._.info.properties();
            var persistProperties = mixpanel.persistence.properties();
            mixpanelProperties = JSON.stringify($.extend(infoProperties, persistProperties));
            mixpanelProperties = excludeExperimentFromMixpanelCookie(mixpanelProperties);
            window.RDL.createCookie("mixpanelprops", escape(mixpanelProperties));
        }
    }
    catch (e) {
        console.log('error in mixpanel properties fetching');
    }
}

function excludeExperimentFromMixpanelCookie(mixpanelProperties) {
    var properties = {};
    var data = JSON.parse(mixpanelProperties);
    Object.keys(data).forEach(function (key, index) {
        if (key.indexOf('Experiment:') == -1) {
            properties[key] = data[key];
        }
    });
    return JSON.stringify(properties);
}

function trackEvent(eventName, eventpropval, userid, islogin, skipTraitsToIterable) {
    if (typeof skipTraitsToIterable == 'undefined') skipTraitsToIterable = true;
    if (typeof analytics != 'undefined' && typeof mixpanel != 'undefined' && typeof mixpanel.get_distinct_id != 'undefined') {
        segmentEventTimerCount++;
        if (segmentEventTimerCount == segmentEventTimer.length) {
            for (var i = 0; i < segmentEventTimer.length; i++)
                clearInterval(segmentEventTimer[i]);
        }
        if (RDL.readCookie("mixpanelprops") == null) {
            GetMixpanelProperties();
        }
        else {
            UpdateMixPanelURL();
        }
        TrackEvents(eventName, eventpropval, userid, islogin, skipTraitsToIterable);
    }
}

function isHIWVisible() {
    var howItWorksElement = document.getElementById("howItWorks");
    return howItWorksElement && !howItWorksElement.classList.contains("d-none");
}

function UpdateMixPanelURL() {
    if (typeof mixpanel != 'undefined' && typeof mixpanel.get_distinct_id != 'undefined') {
        mixpanel.register({ 'device type': RDL.deviceType });
    }
    var mixpanelpropsVal = window.RDL.readCookie("mixpanelprops");
    var mixPanelValObj = JSON.parse(unescape(mixpanelpropsVal));    //Using unescape when cookie is encoded from mobile dashboard.
    if (mixPanelValObj["$current_url"] != window.location.href) {
        mixPanelValObj["$current_url"] = window.location.href;
        var mixpanelProperties = JSON.stringify(mixPanelValObj);
        window.RDL.createCookie("mixpanelprops", escape(mixpanelProperties));
    }
    if (!mixPanelValObj["device type"]) {
        mixPanelValObj["device type"] = RDL.deviceType;
        var mixpanelProperties = JSON.stringify(mixPanelValObj);
        window.RDL.createCookie("mixpanelprops", escape(mixpanelProperties));
    }
}

//var editorLoaded = null;

function isSessionStorageSupported() {
    var testKey = 'test', storage = window.sessionStorage;
    try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

RDL.useSessionStorage = isSessionStorageSupported();

RDL.deleteStorageValue = function (key) {
    if (RDL.useSessionStorage) {
        sessionStorage.removeItem(key);
    }
    else {
        var storageCookie = window.RDL.readCookie(typeCd.ForageKeyNames.cookieForSessionStorage);
        if (storageCookie) {
            var storageObject = JSON.parse(storageCookie);
            delete storageObject[key];
            window.RDL.createCookie(typeCd.ForageKeyNames.cookieForSessionStorage, JSON.stringify(storageObject));
        }
    }
}

RDL.Claims = function (isAsync, resolve, acctsclaims) {
    if (RDL.PortalSettings.isAccountsEnabled) {
        if (acctsclaims && acctsclaims.user_uid) {
            handleClaims(JSON.stringify(acctsclaims), resolve);
        }
        else {
            var accountTimer = setInterval(function () {
                if (
                    (typeof BOLD != 'undefined' && typeof BOLD.Accounts != 'undefined')
                    ||
                    (typeof window.LOGIN != 'undefined' && typeof window.LOGIN.Accounts != 'undefined')
                ) {
                    var LOGIN = window.LOGIN || window.BOLD;
                    clearInterval(accountTimer);
                    LOGIN.Accounts.getClaims().then(function (data) {
                        if (data.claims.user_uid != undefined) {
                            handleClaims(JSON.stringify(data.claims), resolve)
                        }
                        else {
                            var claims = "{\"user_uid\":null}";
                            handleClaims(claims, resolve);
                        };
                    });
                }
            }, 50);
        }
    }
    else {
        callAjax(window.globalCompVars.BaseApiUrlV2 + 'user/claims/' + RDL.currentPortalDetails.portalID + '?urlReferrer=' + escape(document.referrer) + '&cookieEnabled=' + navigator.cookieEnabled + '&culture=' + RDL.currentPortalDetails.culture
            , "GET", isAsync, true, handleClaims, resolve, "true");
    }
}
var claimsPromise;

function initializeClaimsPromise(guestClaims) {
    claimsPromise = new Promise(function (resolve, reject) {
        RDL.Claims(true, resolve, guestClaims);
    });
}


var configPromise = new Promise(function (resolve, reject) {
    callAjax(getConfigUrl(), 'GET', true, false, handleConfig, resolve);
})

function localizedConfig() {
    //TODO : NEED to keep it portal based.
    var path = window.RDL.blobBaseUrl + window.RDL.PortalSettings.baseProductPath + "/common/Resources/localeResources-" + RDL.currentPortalDetails.culture + "." + configEnvironment + ".js?v=" + window.RDL.buildVersion;
    if (window.RDL.GetQueryString("pseudolocal") == 1 || window.RDL.readCookie("pseudolocal") == 1) {
        if (!window.RDL.readCookie("pseudolocal")) {
            window.RDL.createCookie("pseudolocal", "1");
        }
        path = path.replace('localeResources', 'pseudo_localeResources');
    }
    callAjax(path, 'GET', false, false, function (result) {
        var localizationObj = JSON.parse(result);
        window.RDL.Localization = localizationObj.LocalizationText;
        window.RDL.CountryLocalization = localizationObj;
        delete window.RDL.CountryLocalization.LocalizationText;

        if (RDL.isJoshuaTree) {
            RDL.Localization.lbl_registrationheadingv2 = RDL.Localization.lbl_SignUpHeadingTitle;
            RDL.Localization.btn_login = RDL.Localization.btn_continue;
        }
    });
}
localizedConfig();

RDL.setUpGoogleUploadDropBox = function () {
    loadJsWithKey("https://www.dropbox.com/static/api/2/dropins.js", "dropboxjs", RDL.dropBoxDrive.key);
    loadJs("https://apis.google.com/js/api.js?onload=loadPicker");
}

//Only for Accounts
function initializeMethodsForAccounts() {
    var timerStart = 0;
    window.handleGuestUser = function () {
        var TrackAccountsInterval = setInterval(function () {
            if (
                (
                    (typeof BOLD != 'undefined' && typeof BOLD.Accounts != 'undefined')
                    ||
                    (typeof window.LOGIN != 'undefined' && typeof window.LOGIN.Accounts != 'undefined')
                )
                && typeof analytics != 'undefined' && typeof mixpanel != 'undefined'
                && typeof mixpanel.get_distinct_id != 'undefined' || timerStart > 30) {
                var LOGIN = window.LOGIN || window.BOLD;
                LOGIN.Accounts.createGuest(window.RDL.PortalSettings.ConfigureProductCd, null, window.location.href).then(function (guest) {
                    if (!(window.location.pathname == (window.RDL.Paths.BasePath + "/") || window.location.pathname == (window.RDL.Paths.BasePath))) {
                        window.location = window.RDL.Paths.rootURL + window.RDL.Paths.BasePath;
                    }
                    initializeClaimsPromise(guest.claims);
                    runPromises([claimsPromise]);
                });
                clearInterval(TrackAccountsInterval);
            }
            timerStart++;
        }, 100);
    }

    RDL.Logout = function () {
        var logoutPromise = new Promise(function (resolve) { resolve("") });
        if (typeof window.LOGIN != 'undefined' && typeof window.LOGIN.Accounts != 'undefined') {
            logoutPromise = window.LOGIN.Accounts.logOutV2();
        }
        return logoutPromise;
    }
}

//For common segment js
function loadCommonSegment() {
    window.SEGMENT_EVENTS_TO_ALL = true;

    window.segment = {
        CommonProps: {
            'Platform': 'Web',
            'Feature Set': 'Cover Letters',
            'Login Status': 'FALSE'
        }
    };
    if (RDL.disableFullStory) window.segment.DisableFullStory = true;

    window.updateLoginStatusInCommonProps = function (objClaims) {
        if (objClaims.role == "User") {
            window.segment.CommonProps['Login Status'] = 'TRUE';
        }
    }
    loadJs(window.RDL.commonSegmentURL + "?v=" + window.RDL.buildVersion);
}

function loadSegmentJS() {
    if (!window.RDL.disableSegmentLoading) {
        if (window.RDL.commonSegmentURL) {
            loadCommonSegment();
        }
        else {
            loadJs(window.RDL.Paths.rootURL + 'build-letter/scripts/segment-io.js?v=' + window.RDL.buildVersion);
        }
    } else {
        window.segment = {
            CommonProps: {
                'Platform': 'Web',
                'Feature Set': 'Cover Letters',
                'Login Status': 'FALSE'
            }
        };
    }
}

if (RDL.PortalSettings.isAccountsEnabled) {
    initializeMethodsForAccounts();
    Promise.resolve(configPromise).then(function (data) {
        loadSegmentJS();
        loadJs(window.RDL.Paths.accountsJSURL);
        initializeClaimsPromise();
        runPromises([claimsPromise, configPromise]);
    });
}
else {
    if (!(window.RDL.readCookie("userinfo") == null && window.RDL.readCookie("useruid") == null)) {
        initializeClaimsPromise();
    }
    runPromises([claimsPromise, configPromise]);
}

function runPromises(arrPromise) {
    Promise.all(arrPromise).then(function (data) {
        if (!RDL.PortalSettings.isAccountsEnabled && (!(window.RDL.objClaims && window.RDL.objClaims.user_uid) || !window.RDL.readCookie(window.RDL.authCookieName))) {
            if (window.RDL.GetQueryString('frmbldr')) {
                window.location = window.RDL.Paths.rootURL;
            }
            else if (navigator.cookieEnabled)
                window.location = window.RDL.Paths.rootURL + window.RDL.rguPagePath + '&frmbldr=1';
        }
        else if (RDL.PortalSettings.isAccountsEnabled && (!(window.RDL.objClaims && window.RDL.objClaims.user_uid))) {
            handleGuestUser();
        }
        else {
            if (window.RDL.pageLoaded) {
                handlePostPageLoad();
                RDL.claimsLoaded = true;
            }
            else {
                var pageLoadTimer = setInterval(function () {
                    if (window.RDL.pageLoaded) {
                        clearInterval(pageLoadTimer);
                        handlePostPageLoad();
                        RDL.claimsLoaded = true;
                    }
                }, 100);
            }
        }
    });
}

window.addEventListener('load', function () {
    RDL.pageLoaded = true;
    if (window.RDL.enableReactRoutes && isHIWVisible()) {
        resetToBasePath();
    }
});

RDL.ActivateGOneTap = function () {
    var gTapJs = 'https://accounts.google.com/gsi/client';
    loadJs(gTapJs);
    window.handleCredentialResponse = function (response) {
        var loaderElement = document.getElementsByClassName("clb-global-loader-overlay");
        loaderElement && loaderElement[0] && loaderElement[0].classList.remove("d-none");
        var LOGIN = window.LOGIN || window.BOLD;
        LOGIN.Accounts.loginGoogleToken(response.credential, window.location.href, "LTR", "Letter", null, null, null, 1).then(function (res) {
            if (res) {
                RDL.objClaims = res.claims;
                RDL.editorComponent.initializeEditorComponent(RDL.objClaims, undefined, undefined, RDL.features.isBuilderBasedFlow && (res.status == "EXISTING_USER" || res.status == "USER_SWAP"), true);
            }
        })
    };
    var googleOneTapDiv = document.createElement('div');
    googleOneTapDiv.innerHTML = '<div id="g_id_onload" data-client_id="' + RDL.googleLoginClientID + '" data-callback="handleCredentialResponse" data-context="signup" data-cancel_on_tap_outside="false"></div>';
    document.getElementById('app').appendChild(googleOneTapDiv);
}

RDL.onHIWContinue = function () {
    var isLoggedIn = window.RDL.objClaims.role == "User";
    if (!isLoggedIn) {
        //Conducting google one tap
        if (!RDL.experimentsObj.SectionBreakAndProgressBar.activeVariant) window.RDL.ConductExperiment(RDL.experimentsObj.SectionBreakAndProgressBar, false, true);
        var googleOneTapInt = setInterval(function () {
            if (window.experiment && RDL.layerID) {
                if (!RDL.experimentsObj.GoogleOneTap.activeVariant) {
                    window.RDL.ConductExperiment(RDL.experimentsObj.GoogleOneTap, false, true);
                    clearInterval(googleOneTapInt);
                    RDL.experimentControl.isGoogleOneTap && RDL.ActivateGOneTap();
                }
                else if (RDL.experimentControl.isGoogleOneTap) {
                    RDL.ActivateGOneTap();
                    clearInterval(googleOneTapInt);
                }
            }
        }, 500);

        //Conducting TemplatePageSocialProof
        if (!RDL.experimentsObj.TemplatePageSocialProof.activeVariant) {
            window.RDL.ConductExperiment(RDL.experimentsObj.TemplatePageSocialProof, false, true);
        }
    }
    RDL.editorComponent && RDL.editorComponent.handleHIWContinue && RDL.editorComponent.handleHIWContinue();
}

loadgtms = function () {
    if (window.RDL.gtmPrimaryKey) {
        loadGTM(window, document, 'script', 'dataLayer', window.RDL.gtmPrimaryKey);
    }
    if (window.RDL.gtmSecondaryKey) {
        loadGTM(window, document, 'script', 'dataLayer', window.RDL.gtmSecondaryKey);
    }
}

function postJQueryLoad(callBackFunc, paramFuncChaining) {
    if (window.jQuery) {
        (typeof callBackFunc == "function") && callBackFunc(paramFuncChaining);
    }
    else {
        var jqueryLoadTimer = setInterval(function () {
            if (window.jQuery) {
                clearInterval(jqueryLoadTimer);
                (typeof callBackFunc == "function") && callBackFunc(paramFuncChaining);
            }
        }, 100);
    }
}

function postMixPanelAndAnalyticsLoad(callBackFunc) {
    if (window["mixpanel"] && mixpanel.get_distinct_id && window["analytics"] && analytics.track) {
        (typeof callBackFunc == "function") && callBackFunc();
    }
    else {
        var mixPanelAndAnalyticsLoadTimer = setInterval(function () {
            if (window["mixpanel"] && mixpanel.get_distinct_id && window["analytics"] && analytics.track) {
                clearInterval(mixPanelAndAnalyticsLoadTimer);
                (typeof callBackFunc == "function") && callBackFunc();
            }
        }, 100);
    }
}

function loadVisitorJs() {
    loadJs(window.RDL.VisitorApiSetting.JSURL);
    var vsInterval = setInterval(function () {
        if (typeof TS != 'undefined') {
            clearInterval(vsInterval);
            var isTrackingRewrite = window.RDL.VisitorApiSetting.JSURL.indexOf(window.location.origin + "/visitor/") != -1;
            TS.Track(window.RDL.VisitorApiSetting.PRODUCT_CODE, RDL.PortalSettings.ConfigurePortalCd, true, true, isTrackingRewrite);
        }
    }, 100);
}

RDL.LoadThirdPartyJS = function () {
    postJQueryLoad(loadgtms);
    //End Google Tag Manager    
    !RDL.PortalSettings.isAccountsEnabled && loadSegmentJS();   //Already loaded for Accounts
    loadJs("https://www.google.com/recaptcha/api.js?render=explicit");
    //TODO:Move HC
    if (RDL.currentPortalDetails.portalID != 79) {
        loadVisitorJs();
    }
}

RDL.setCountryDetails = function () {
    callAjax(window.globalCompVars.BaseApiUrl + 'user/countryclaims', 'GET', true, false, function (data) {
        var countryClaims = JSON.parse(data);
        var objKeys = countryClaims && Object.keys(countryClaims);
        if (objKeys && objKeys.length) {
            for (var i = 0; i < objKeys.length; i++) {
                if (countryClaims[objKeys[i]]) {
                    RDL.countryDetails[objKeys[i]] = countryClaims[objKeys[i]];
                }
            }
        }
        if (countryClaims.countryCode) {
            var countryLocalization = RDL.CountryLocalization[countryClaims.countryCode];
            countryLocalization && Object.keys(countryLocalization).map(function (key) {
                RDL.Localization[key] = countryLocalization[key];
            });
        }

        RDL.countryClaimsLoaded = true;
    }, undefined, "true");
}

function setExperimentCookie(result, experimentObj) {
    var response, variant = 0;
    if (result && result.variant) {
        variant = result.variant;
        response = {
            data: {
                variant: variant,
                variantName: experimentObj.variants.find(function (x) { return x[variant] })[variant]
            }
        }
    }
    else {
        response = JSON.parse(result);
        if (response && response.data && response.data.experimentname && response.data.variantname) {
            variant = response.data.variant;
        }
    }

    if (variant) {
        if (experimentObj.cookie)
            RDL.createLS(experimentObj.cookie, experimentObj.userUID + "_" + variant);
        var interval = setInterval(function () {
            if (typeof analytics != 'undefined') {
                clearInterval(interval);
            }
        }, 50);
    }
    if (experimentObj && typeof experimentObj.setVariant == "function" && experimentObj.isAsync)
        experimentObj.setVariant(variant);

    return response;
}

function setLayerFromUserExperimentsV3(userId) {
    var url = window.globalCompVars.BaseApiUrlV3 + 'users/' + userId + '/experiments?portalCd=' + RDL.PortalSettings.ConfigurePortalCd + '&status=active';
    return new Promise(function (resolve, reject) {
        callAjax(url, "GET", true, true, function (data) {
            if (data) {
                data = JSON.parse(data);
                RDL.layerID = data.layer;
            }
            resolve(data);
        }, null, null, null, true);
    }).then(function (resp) {
        return resp;
    }).catch(function (err) {
        return null;
    });
}

function getUnifiedDate(dt, isReversedMMDD) {
    if (isReversedMMDD) {
        var splitDateArr = dt.split("/");
        var temp = splitDateArr[0];
        splitDateArr[0] = splitDateArr[1];
        splitDateArr[1] = temp;
        return new Date(splitDateArr.join("/"));
    }
    else {
        return new Date(dt);
    }
}

function makeConductExperimentCall(experimentObj, isConductExp) {
    var output = {}, experimentTraits = {};
    var url, requestType = "", body;
    var result;
    if (experimentObj && experimentObj.expId && experimentObj.isSPA && isConductExp) {
        var unifiedDate = getUnifiedDate(RDL.objClaims.createdOn, RDL.currentPortalDetails.isIntl);
        if (window.experiment) {
            result = window.experiment.conductUserExperiment(experimentObj.userUID, RDL.layerID, experimentObj.expId, unifiedDate);
            if (result.variant) {
                output = setExperimentCookie(result, experimentObj);
                experimentTraits["Experiment: " + experimentObj.experimentName] = output.data.variantName;
                RDL.IdentifyTraits(experimentObj.userUID, experimentTraits);
            }
        }
        else
            RDL.LogError("The experiment-spa.js not loaded.", "Error while conducting the experiment.", false, "");
    }
    else {
        if (!isConductExp) {
            //Get Experiment
            requestType = 'GET';
            url = window.globalCompVars.BaseApiUrlV2 + 'users/' + experimentObj.userUID + '/experiment/' + experimentObj.expId;
            if (experimentObj.isSkipActiveCheck)
                url = url + "?stopInactiveVariant=false"
        }
        else {
            //Conduct Experiment
            requestType = 'POST';
            url = window.globalCompVars.BaseApiUrlV2 + 'users/' + experimentObj.userUID + '/experiments/' + experimentObj.expId + '/conduct';
            body = {
                logTraits: true,
                conductForOldUsers: false,
                includeIterableIntegration: false
            }
        }
        callAjax(url, requestType, experimentObj.isAsync, true, function (result, resolve) {
            output = setExperimentCookie(result, experimentObj);
        }, undefined, "false", body);
    }
    return output;
}

function isABtestActive(objExperiment) {
    var url = window.globalCompVars.BaseApiUrl + 'users/experimentactive/' + objExperiment.experimentId;
    var isActive = false;
    callAjax(url, "GET", false, true, function (res) {
        if (res == "true") {
            isActive = true
        }
    }, undefined, true, false);
    return isActive;
}

window.RDL.ConductExperiment = function (objExperiment, isAsync, isConductExp) {
    isAsync = isAsync || false;
    var result = {};
    if (objExperiment.portalsForConduction.indexOf(window.RDL.PortalSettings.ConfigurePortalCd) != -1) {
        if (window.RDL.isDisableTests == "1" || (window.RDL.isDisableTests == "0" && window.RDL.RunTest[objExperiment.experimentId])) {
            result = { data: { variant: window.RDL.RunTest[objExperiment.experimentId] } };
        }
        else if (objExperiment && objExperiment.experimentId && (objExperiment.isSkipActiveCheck || (!objExperiment.isSPA && isABtestActive(objExperiment)) || objExperiment.isActive)) {
            var AbTestcookieValue = undefined;
            if (objExperiment.cookie)
                AbTestcookieValue = RDL.readLS(objExperiment.cookie);
            if (!AbTestcookieValue || AbTestcookieValue.indexOf(window.RDL.objClaims.user_uid) <= -1) {
                var experimentObj = {
                    userUID: window.RDL.objClaims.user_uid,
                    expId: objExperiment.experimentId,
                    portals: objExperiment.portalsForConduction,
                    isAsync: isAsync,
                    cookie: objExperiment.cookie,
                    setVariant: objExperiment.setVariant,
                    isSPA: objExperiment.isSPA,
                    experimentName: objExperiment.experimentname,
                    variants: objExperiment.variants,
                    isSkipActiveCheck: objExperiment.isSkipActiveCheck
                }
                result = makeConductExperimentCall(experimentObj, isConductExp);
            } else {
                result = {
                    data: {
                        variant: AbTestcookieValue.charAt(AbTestcookieValue.indexOf(window.RDL.objClaims.user_uid) + window.RDL.objClaims.user_uid.length + 1)
                    }
                }
            }
        }
    }
    if (objExperiment && typeof objExperiment.setVariant == "function") {
        if (result && result.data && result.data.variant) {
            objExperiment.setVariant(result.data.variant);
        } else if (result && result.isSuccess === false) {
            objExperiment.setVariant(0);
        }
    }
    return result;
}

function updateMixPanelProps() {
    var mixpanelpropsVal = window.RDL.readCookie("mixpanelprops");
    var mixPanelValObj = JSON.parse(unescape(mixpanelpropsVal));
}
function getAbTestCaseIndexFromCookie(cookieName) {
    var caseIndex = "";
    if (cookieName) {
        var cookieVal = RDL.readCookie(cookieName);
        if (cookieVal && cookieVal.indexOf(window.RDL.objClaims.user_uid) >= 0) {
            caseIndex = cookieVal.charAt(cookieVal.indexOf(window.RDL.objClaims.user_uid) + window.RDL.objClaims.user_uid.length + 1);
            return caseIndex;
        }
    }
    return caseIndex;
}

function fireIdentify() {
    var interval = setInterval(function () {
        if (typeof analytics != 'undefined') {
            clearInterval(interval);
            analytics.alias(window.RDL.objClaims.user_uid);
            setTimeout(function () {
                RDL.IdentifyTraits(window.RDL.objClaims.user_uid);
            }, 100);
        }
    }, 50);
}

window.RDL.conductExperimentsAndFireIdentify = function () {
    var isLoggedIn = window.RDL.objClaims.role == "User";
    if (!isLoggedIn) //Unregistered User
    {
        fireIdentify();
    } else {
        window.RDL.ConductExperiment(RDL.experimentsObj.PayPerDownload, false, false);
        window.RDL.ConductExperiment(RDL.experimentsObj.PayPerDownloadMobile, false, false);
        window.RDL.features.isPayPerDownload && window.RDL.payPerFeatureWidgetURL && loadJs(window.RDL.payPerFeatureWidgetURL);
    }
}

function loadStyleSheet(src) {
    if (document.createStyleSheet) document.createStyleSheet(src);
    else {
        var stylesheet = document.createElement('link');
        stylesheet.href = src;
        stylesheet.rel = 'stylesheet';
        stylesheet.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    }
}

window.RDL.onExperimentJsLoad = function () {
    var objExpKeys = Object.keys(RDL.experimentsObj);
    for (var i = 0; i < objExpKeys.length; i++) {
        //  setting isActive flag
        var exp = RDL.experimentsObj[objExpKeys[i]];
        if (exp.isSPA && exp.portalsForConduction.indexOf(window.RDL.PortalSettings.ConfigurePortalCd) != -1) {
            if (window.experiment && window.experiment.getExperimentName) {
                const response = window.experiment.getExperimentName(exp.experimentId);
                exp.isActive = !!(response && response.experimentName);
            }
            exp.isCheckVariant && window.RDL.ConductExperiment(exp, false, false);
        }
    }
}

var winOpen = window.open;
window.open = function () {
    var winRef = winOpen.apply(this, arguments);
    if (RDL.openWindowCallback) RDL.openWindowCallback(winRef);
    return winRef;
};

function handlePostPageLoad() {
    RDL.setCountryDetails();
    //  set layerID (needed for SPA experiments)
    RDL.experimentJsSpaURL && setLayerFromUserExperimentsV3(RDL.objClaims.user_uid);

    //conduct Experiments
    RDL.conductExperimentsAndFireIdentify && RDL.conductExperimentsAndFireIdentify();

    if (RDL.commonJQueryURL) {
        loadJs(RDL.commonJQueryURL);
    } else {
        loadJs('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');
    }


    //load GTM scripts
    window.RDL.LoadThirdPartyJS();

    loadJs('https://apis.google.com/js/platform.js');
    if (window.RDL.loadOptimizelyScript) {
        loadJs('https://cdn.optimizely.com/js/' + window.RDL.loadOptimizelyScriptID + '.js');
    }

    prefetchFile(window.location.origin + '/build-letter/build/formattingcontainer.bundle-' + window.RDL.buildVersion + '.js');
    prefetchFile(window.location.origin + '/build-letter/build/existinguserloader.bundle-' + window.RDL.buildVersion + '.js');
    RDL.dropBoxDrive && RDL.setUpGoogleUploadDropBox && RDL.setUpGoogleUploadDropBox();
}

function GetUserPreferences(isAsync) {
    isAsync = isAsync || false;
    var output = {};
    if (window.RDL.objClaims.user_uid) {
        callAjax(window.globalCompVars.BaseApiUrl + "userpreferences/" + window.RDL.objClaims.user_uid, 'GET', isAsync, true, function (result, resolve) {
            var response = JSON.parse(result);
            output = response
        }, undefined);
    }
    return output;
}

RDL.TrackOptimizelyEvents = function (eventName, eventType) {
    if (window.RDL.loadOptimizelyScript) {
        var interval = setInterval(function () {
            if (typeof window['optimizely'] != 'undefined') {
                clearInterval(interval);
                window['optimizely'] = window['optimizely'] || [];
                window['optimizely'].push({
                    type: eventType ? eventType : "event",
                    eventName: eventName
                });
            }
        }, 50);
    }
}

function loadGTM(w, d, s, l, i) {
    if (!window.RDL.isEnableThirdPartyScripts) {
        return;
    }
    w[l] = w[l] || []; w[l].push({
        'gtm.start':
            new Date().getTime(), event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0] || {},
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl + (RDL.appendGTMParams ? '&gtm_auth=5JdPCLlGcMraRRHYblzLjg&gtm_preview=env-132&gtm_cookies_win=x' : ''); f.parentNode.insertBefore(j, f);
}

function loadJsWithKey(src, id, key) {
    var f = document.createElement('script');
    f.setAttribute("src", src);
    f.setAttribute("id", id);
    f.setAttribute("data-app-key", key);
    if (typeof f != "undefined")
        document.getElementsByTagName("head")[0].appendChild(f);
}

function loadJs(src) {
    var f = document.getElementsByTagName('script')[0] || {},
        j = document.createElement('script'); j.async = true; j.src = src; f.parentNode.insertBefore(j, f);
    j.onload = function () {
        if (src == RDL.experimentJsSpaURL && RDL.onExperimentJsLoad) {
            if (window.RDL.objClaims && window.RDL.objClaims.user_uid) {
                RDL.onExperimentJsLoad();
            }
            else {
                var timer = setInterval(function () {
                    if (window.RDL.objClaims && window.RDL.objClaims.user_uid) {
                        clearInterval(timer);
                        RDL.onExperimentJsLoad();
                    }
                }, 100);
            }
        }
    }
}
function getConfigUrl() {
    switch (environment) {
        case "regression":
        case "reg":
        case "reg-builder":
        case "regression-builder":
        case "pre-reg":
            configEnvironment = "reg";
            break;
        case "pen":
            configEnvironment = "pen";
            break;
        case "stg":
        case "stg-builder":
            configEnvironment = "stg";
            break;
        case "perf":
        case "perf-builder":
            configEnvironment = "perf";
            break;
        case "www":
        case "builder":
            configEnvironment = "prod";
            break;
    }
    return window.RDL.blobBaseUrl + window.RDL.PortalSettings.baseProductPath + "/" + RDL.currentPortalDetails.portalCD + "/config/config." + configEnvironment + ".js?v=" + window.RDL.buildVersion;
}

function isFeatureActive(featureCD) {
    var result = false;
    var feature = RDL.lstFeatures.find(function (feature) { return feature.featureCD.toLowerCase() == featureCD.toLowerCase() });
    if (feature && feature.isActive) {
        result = true;
    }
    return result;
}

function handleConfig(result, resolve) {
    var data = JSON.parse(result);

    //For Mobile cases of RNA portal
    if ((RDL.currentPortalDetails.portalCD == "rna" || RDL.currentPortalDetails.portalCD == "cln") && window.RDL.mobileCheck.isMobile && !window.RDL.mobileCheck.isTablet && data.externalLinks.mobileDashboardLink) {
        window.RDL.Paths.BaseUrl = data.externalLinks.mobileDashboardLink;
    }
    else {
        window.RDL.Paths.BaseUrl = data.externalLinks.dashboardLink;
    }

    window.RDL.Paths.CDN_Path1 = data.externalLinks.cdnPath1;
    window.RDL.Paths.CDN_Path2 = data.externalLinks.cdnPath2;
    window.RDL.Paths.SellPageUrl = data.externalLinks.paymentLink;
    window.RDL.Paths.AccountsURL = data.externalLinks.accountsURL;
    window.RDL.Paths.accountsJSURL = data.externalLinks.accountsJSURL;
    window.RDL.Paths.forgotPasswordURL = data.externalLinks.forgotPasswordURL;
    window.RDL.Paths.termsOfUseURL = data.externalLinks.termsOfUseURL;
    window.RDL.Paths.privacyURL = data.externalLinks.privacyURL;
    window.RDL.Paths.rootURL = data.externalLinks.rootURL;
    window.RDL.Paths.ContactUsUrl = data.externalLinks.contactUs;
    window.RDL.Paths.SettingsUrl = data.externalLinks.mySettings;
    window.RDL.Paths.SignoutUrl = data.externalLinks.signOut;
    RDL.PortalSettings.SignInUrl = data.externalLinks.signInURL;
    window.RDL.Paths.PortalEditUrl = data.externalLinks.portalEditPage;
    window.RDL.commonSegmentURL = data.externalLinks.commonSegmentURL;
    window.RDL.commonJQueryURL = data.externalLinks.commonJQueryURL;
    window.RDL.experimentJsSpaURL = data.externalLinks.experimentJsSpaURL;
    window.RDL.experimentJsSpaURL && loadJs(RDL.experimentJsSpaURL);
    window.RDL.payPerFeatureWidgetURL = data.externalLinks.payPerFeatureWidgetURL;

    RDL.PortalSettings.defaultPortalType = (RDL.currentPortalDetails.portalCD == "cln" ? "14" : "20");
    RDL.PortalSettings.ConfigurePortal = data.portalID
    RDL.PortalSettings.ConfigurePortalCd = data.portalCD
    RDL.PortalSettings.ConfigureProductId = data.productID
    RDL.PortalSettings.ConfigureProductCd = data.productCD
    window.RDL.VisitorApiSetting.JSURL = data.externalLinks.visitorAPIUrl + (data.externalLinks.visitorAPIUrl.indexOf('?') > -1 ? '&' : '?') + "v=" + window.RDL.buildVersion;
    window.RDL.VisitorApiSetting.EnvMode = data.environment;
    window.RDL.VisitorApiSetting.PRODUCT_CODE = data.productCD;
    window.RDL.VisitorApiSetting.AccountCode = data.clientCD;
    window.RDL.segmentKey = data.segmentKey;
    window.RDL.newRelicLoading.enableNewRelic = data.enableNewRelic;
    window.RDL.loadOptimizelyScript = (data.loadOptimizelyScript == "true" || data.loadOptimizelyScript == true ? true : false);
    window.RDL.loadOptimizelyScriptID = data.loadOptimizelyScriptID ? data.loadOptimizelyScriptID : '';
    window.RDL.newRelicLoading.newRelicApplicationID = data.newRelicApplicationID;
    window.RDL.newRelicLoading.loadNewRelic(data.newRelicSamplingPercent);
    segmentKey = data.segmentKey;
    window.RDL.Skins = data.skins;
    window.RDL.defaultSkinCD = data.defaultSkinCD;
    window.RDL.disableTemplateSorting = data.disableTemplateSorting;
    window.RDL.helpAndSupportEmail = data.helpAndSupportEmail;
    window.RDL.templates = data.tempates;
    window.RDL.moreTemplates = data.moreTemplates;
    window.RDL.moreTemplatesInfo = data.moreTemplatesInfo;
    window.RDL.Sections_List = data.sectionsList;
    window.RDL.v2Templates = data.v2Templates;
    window.RDL.workGapReasons = data.workGapReasons;
    window.RDL.SoftSkills = data.softSkills;
    window.RDL.date = (new Date(2017, 10, 23));
    window.RDL.googleLoginClientID = data.googleLoginClientID; //'925041146420-lrkp3ujc591k0iq31ml1su3td3hkr7mr.apps.googleusercontent.com'; //For Local Testing
    window.RDL.facebookLoginClientID = data.facebookLoginClientID;
    window.RDL.captchaPublicKey = data.captchaPublicKey;
    window.RDL.fonts = data.fonts;
    configLoaded = true;
    window.RDL.homeLogo = data.homeLogo;
    if (window.RDL.isJoshuaTree && data.joshuaTreeHomeLogo) {
        window.RDL.homeLogo = data.joshuaTreeHomeLogo;
    }
    window.RDL.reSkinOnboardingHomeLogo = data.reSkinHomeLogo || '';
    window.RDL.lightHomeLogo = data.lightHomeLogo || '';
    window.RDL.jobTitleSkillsProductCD = data.jobTitleSkillsProductCD ? data.jobTitleSkillsProductCD : "RSM";
    window.RDL.rguPagePath = data.rguPagePath;
    window.RDL.Paths.AccountsURL = (data.externalLinks.accountsURL ? data.externalLinks.accountsURL : "");
    window.RDL.portalConfigData = data.portalConfigData || {};
    window.RDL.isNanoRepRequired = data.isNanoRepRequired;
    window.RDL.isContactUsFAQ = data.isContactUsFAQ || false;
    window.RDL.isDisableSaveUserStage = data.isDisableSaveUserStage || false;
    window.RDL.portalIDforUpdateTemplate = (data.portalIDforUpdateTemplate ? data.portalIDforUpdateTemplate : 0);
    window.RDL.emailRegex = data.emailRegex || '';
    window.RDL.nameRegex = data.nameRegex || '';
    window.RDL.zipRegex = data.zipRegex || "^[a-zA-Z0-9$%.' #]*$";
    window.RDL.multipleEmailRegex = data.multipleEmailRegex || '';
    window.RDL.showFreeJobTipsMsg = data.showFreeJobTipsMsg || false;
    window.RDL.hideTermsOfUseOnNameScreen = data.hideTermsOfUseOnNameScreen || false;
    window.RDL.gtmPrimaryKey = data.gtmPrimaryKey;
    window.RDL.gtmSecondaryKey = data.gtmSecondaryKey;
    window.RDL.customPortalForTTC = data.customPortalForTTC || "";
    window.RDL.isSetDocStylesFromSkin = data.isSetDocStylesFromSkin || false;
    window.RDL.checkForOriginalUser = data.checkForOriginalUser || false;
    window.RDL.isBackButtonAllowedOnFirstPage = data.isBackButtonAllowedOnFirstPage || false;
    window.RDL.appendGTMParams = data.appendGTMParams || false;
    window.RDL.primarySupportContact = data.primarySupportContact || false;
    window.RDL.isDCTLEnabled = data.isDCTLEnabled || false;
    window.RDL.colorPickingEnabled = data.colorPickingEnabled || false;
    window.RDL.fireGAEventForEmail = data.fireGAEventForEmail || false;
    window.RDL.updateMixPanelCookie = data.updateMixPanelCookie || false;
    window.RDL.countryListForOptInOption = data.countryListForOptInOption || [];
    window.RDL.isDisclaimerForOnlyEUAndCA = data.isDisclaimerForOnlyEUAndCA || false;
    window.RDL.covid19Templates = data.covid19Templates || [];
    window.RDL.customFontFamilies = data.customFontFamilies || [];
    window.RDL.googlePickerInfo = data.googleDrive;
    window.RDL.dropBoxDrive = data.dropBoxDrive;
    window.RDL.disableFullStory = data.disableFullStory;
    window.RDL.disableChooseTemplateCategories = data.disableChooseTemplateCategories;
    window.RDL.isBuilderBasedFlowLocalized = data.isBuilderBasedFlowLocalized;
    window.RDL.groupSequence = data.groupSequence;
    window.RDL.isNameAddedInContactSection = data.isNameAddedInContactSection || false;
    window.RDL.swapDateAndCompanyOrder = data.swapDateAndCompanyOrder || false;
    window.RDL.showFacebookLogin = data.showFacebookLogin == "false" ? false : true;
    window.RDL.uploadSignatureBeforeLogin = data.uploadSignatureBeforeLogin || false;
    var featureFlags = {
        setDefaultThreeYears: "DFLTEX",
        showPopupOnClose: "CLSPUP",
        useNumberForWords: "USENUM",
        skillsStrengthsImprovements: "SKLIMP",
        showToolTipsCopyImprovements: "TTPIMP",
        showThemeCopyImprovements: "THMIMP",
        showLetterPreview: "LPRVNM",
        studentFlowImprovements: "STDFLW",
        showReviewOnboarding: "RVWOBG",
        showReskinnedFinalize: "RSKNFZ",
        saveLetterByName: "SVLTRN",
        assignDefaultSkills: "ADFSKL",
        deleteSectionOption: "DLSCOP",
        covid19: "COVD19",
        useHtmlEditor: 'UHEDIT',
        showTemplatesAndHIW: 'SHWHIW',
        isFuzzyLogic: 'FUZLOG',
        isBuilderBasedFlow: 'BBFLOW',
        isCustomSkills: 'CSTSKL',
        isPayPerDownload: "PPDPA",
        isRegOnContact: 'REGCNT',
        showSignature: 'SIGNTR',
        isNewCongratsCopy: 'NEWCNG',
        isCEIntegration: 'CNTENG'
    }

    window.RDL.features = {};
    if (!(RDL.lstFeatures && RDL.lstFeatures.length > 0)) {
        if (data.fallbackFeatureList) {
            console.warn('Could not fetch features. Using fallback feature list');
            RDL.lstFeatures = data.fallbackFeatureList;
        }
    }
    Object.keys(featureFlags).forEach(function (feature) {
        window.RDL.features[feature] = isFeatureActive(featureFlags[feature]);
    });

    //TODO: HC GET This from config for all portals    
    window.RDL.PortalSettings.isDownloadDocumentFromDashboard = (data.isDownloadDocumentFromDashboard == true);
    window.RDL.dashboardDownloadUrl = data.dashboardDownloadUrl;
    window.RDL.prflEnabled = data.prflEnabled || false;
    window.RDL.CongatsRemveThirdPoint = (window.RDL.PortalSettings.ConfigurePortalCd == 'LPL') ? true : false;
    if (window.RDL.prflEnabled) {
        window.RDL.gapSectionIndex = 8;
    }
    if (data.blobSkinUrl) {
        window.RDL.blobSkinUrl = data.blobSkinUrl;
    }
    window.RDL.isInsertNameContactSections = data.isInsertNameContactSections || false;
    window.RDL.emailSendingDomain = (data.emailSendingDomain ? data.emailSendingDomain : requestingDomain);
    window.RDL.isSoftRegEventEnabled = data.isSoftRegEventEnabled || false;
    window.RDL.splitTTC = data.splitTTC || false;
    window.RDL.defaultDateDisplayFormat = data.defaultDateDisplayFormat;
    window.RDL.isAllowDragDropSection = data.isAllowDragDropSection || false;
    window.RDL.createBEUserActionCookie = data.createBEUserActionCookie || false;
    window.RDL.showEmailAutoSuggest = data.showEmailAutoSuggest;
    window.RDL.emailDomains = data.emailDomains;
    window.RDL.dummyDocument = data.dummyDoc || "";
    window.RDL.JobTitleAbbreviationsKeyWordsList = data.jobTitleAbbreviationsKeyWordsList || [];
    window.RDL.postPageLoadScriptURLs = data.postPageLoadScriptURLs || [];
    window.RDL.sanitizeOBFieldsQSVal = data.sanitizeOBFieldsQSVal;
    window.RDL.isGoogleLogin = data.isGoogleLogin;
    window.RDL.regPixelEventName = data.regPixelEventName;
    window.RDL.recommendedCompanies = data.recommendedCompanies || [];
    window.RDL.ignoreAddressState = data.ignoreRecipientAddressState;
    window.RDL.showBusinessLocation = data.showBusinessLocation;
    window.RDL.removePhoneContact = data.removePhoneContact;
    window.RDL.isChangeSectionNames = data.isChangeSectionNames || false;
    window.RDL.disableGAWithSegment = data.disableGAWithSegment || false;
    window.RDL.hideCityDetails = data.hideCityDetails || false;
    window.RDL.ignoreRecipientEmail = data.ignoreRecipientEmail || false;
    window.RDL.ignoreRecipientPhone = data.ignoreRecipientPhone || false;
    window.RDL.showRecipientPosition = data.showRecipientPosition || false;
    window.RDL.ismultiParaDate = data.ismultiParaDate || false;
    window.RDL.defaultSkillsList = data.defaultSkillsList || [];
    window.RDL.documentClassName = data.documentClassName || "";
    window.RDL.removeSuffixElementArray = data.removeSuffixElementArray || [];
    window.RDL.hideHomeField = data.hideHomeField || false;
    window.RDL.isCheckVulnerableJS = data.isCheckVulnerableJS;
    window.RDL.showHTMLTemplateSkins = data.showHTMLTemplateSkins;
    window.RDL.isThreeGapsInARow = data.isThreeGapsInARow || false;
    window.RDL.suggestDesktopVersion = data.suggestDesktopVersion || false;
    window.RDL.isCustomizeAutoCL = data.isCustomizeAutoCL || false;
    window.RDL.removeWrapperSectionClass = data.removeWrapperSectionClass || false;
    window.RDL.useForgotPasswordLink = data.useForgotPasswordLink || false;
    window.RDL.sgtrDefKeyVals = data.sgtrDefKeyVals;
    window.RDL.sectionConfigurations = data.sectionConfigurations;
    window.RDL.defaultSuggestedJobTitles = data.defaultSuggestedJobTitles;
    window.RDL.disableSegmentLoading = data.disableSegmentLoading || false;
    window.RDL.gdprSwitchUserConsent = data.gdprSwitchUserConsent || false;
    window.RDL.enableDomainPhotoUrl = data.enableDomainPhotoUrl || false;
    resolve("");
}
