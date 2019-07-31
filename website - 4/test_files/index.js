// global object for store data
var localData = {};
// determinate script hosting address
var currScript = (document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
})()).src;
var appRoot = currScript.substr(0, currScript.indexOf('js/index.js'));

// main module for signature
var opSign = window.opSign || (function () {
        //
        var VERSION = "0.0.25";
        // format string
        var formatStr = function (format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
        // diagnostic utils
        var debug = false;
        var log = function (entry, log, obj) {
            if (debug)
                console.log(formatStr("{0} [{1}] {2}", new Date().toISOString(), entry, log), obj || {});
        };
        // localization
        var resources$ua = {
            getFromApiError: "Помилка отримання даних за адресою <a href='{0}'>{0}</a>, опис помилки: {1}"
        };
        var templateUri = appRoot + 'html/sign.html';
        // utils
        var cachedScript = function (url, options) {
            options = $.extend(options || {}, {
                dataType: "script",
                cache: true,
                global: false,
                url: url + "?v=" + VERSION
            });
            return jQuery.ajax(options);
        };
        var cachedHtml = function (url, options) {
            options = $.extend(options || {}, {
                dataType: "html",
                cache: true,
                global: false,
                url: url
            });
            return jQuery.ajax(options);
        };
        return {
            version: VERSION,
            defCallback: function () {
                console.log('defCallback', arguments);
            },

            init: function (options) {
                log('init', 'option', options);
                localData = {};
                // for using JSONP, if CORS disables
                var useJsonp = options.useJsonp || false;

                // callbacks functions
                var callbackPostSign = options.callbackPostSign || 'opSign.defCallback';
                var callbackCheckSign = options.callbackCheckSign || 'opSign.defCallback';
                var callbackRender = options.callbackRender || 'opSign.defCallback';
                var callbackOnInit = options.callbackOnInit || 'opSign.defCallback';
                var callbackBeforeInit = options.callbackBeforeInit || 'opSign.defCallback';

                var verifySignOnInit = !!options.verifySignOnInit;
                var ignoreFields = options.ignoreFields;
                var verifyOnly = !!options.verifyOnly;
                var ignoreVerifyError = options.ignoreVerifyError || false;
                var disableLoadObj = options.disableLoadObj || false;
                var disableLoadSign = options.disableLoadSign || false;
                var userJsonDiffHtml = !!options.userJsonDiffHtml;
                var customHtmlTemplate = options.customHtmlTemplate;

                // element for loading template
                var placeholderEl = $(options.placeholderId);
                // render error
                var errorBlock = $('<div class="alert alert-danger">');
                // if not exist, create in body bottom
                if (placeholderEl.size() === 0) {
                    placeholderEl = $("<div id='sign'/>");
                    $("body").append(placeholderEl);
                }
                var url = options.apiResourceUrl;
                // proccess array of addresses
                var isBatch = url instanceof Array;

                var urlDocs = url + "/documents";

                if (!url)
                    url = options.apiUrl + options.objType + '/' + options.objId;

                // store in global
                localData.callbackPostSign = callbackPostSign;
                localData.callbackOnInit = callbackOnInit;
                localData.callbackBeforeInit = callbackBeforeInit;
                localData.callbackCheckSign = callbackCheckSign;
                localData.apiResourceUrl = url;
                localData.verifySignOnInit = verifySignOnInit;
                localData.verifyOnly = verifyOnly;
                localData.ignoreFields = ignoreFields;
                localData.ignoreVerifyError = ignoreVerifyError;
                localData.userJsonDiffHtml = userJsonDiffHtml;
                localData.disableLoadObj = disableLoadObj;
                localData.disableLoadSign = disableLoadSign;

                // ajax error handler
                var callbackFailure = function (data, statusText, jqXHR) {
                    console.log(data);
                    errorBlock.append(formatStr(resources$ua.getFromApiError, localData.apiResourceUrl, statusText));
                    placeholderEl.html(errorBlock);
                }
                // base ajax params
                var ajaxParams = {error: callbackFailure};
                // extend ajax params
                if (options.ajaxOptions)
                    $.extend(ajaxParams, options.ajaxOptions);

                // create local copy of ajax params
                var ajaxParamsObj = $.extend({}, ajaxParams);
                var ajaxParamsDocs = $.extend({}, ajaxParams);

                if (useJsonp && !isBatch) {
                    url += '?opt_jsonp=' + callbackRender;
                    urlDocs += '?opt_jsonp=renderDocuments';
                    $.extend(ajaxParamsObj, {dataType: 'JSONP', jsonpCallback: callbackRender});
                    $.extend(ajaxParamsDocs, {dataType: 'JSONP', jsonpCallback: 'renderDocuments'});
                }
                var loadTemplate = function (objectData) {
                    if (!useJsonp && typeof window[callbackRender] === "function") {
                        window[callbackRender](objectData);
                    }
                    if (!verifyOnly) {
                        if (customHtmlTemplate)
                            placeholderEl.html(customHtmlTemplate);
                        else {
                            cachedHtml(templateUri).done(function (htmlData) {
                                placeholderEl.html(htmlData);
                            });
                        }
                    }
                    else {
                        if (!localData.sign) {
                            window[callbackCheckSign](null);
                            return;
                        }
                    }
                    cachedScript(appRoot + "js/eu/eulib.js").done(function () {
                        cachedScript(appRoot + "js/libs/jsondiffpatchlib.js");
                    });
                };

                if (disableLoadObj) {
                    loadTemplate({});
                }
                else {
                    if (isBatch) {
                        localData.objs = [];
                        var requests = [];
                        for (i = 0; i < url.length; i++) {
                            requests.push($.ajax(url[i], ajaxParamsObj).success(function (objectData) {
                                log('batch callback', url, objectData);
                                localData.objs[objectData.data.id] = objectData.data;
                            }));
                        }
                        $.when.apply(undefined, requests).then(function () {
                            console.log('batch done %O', localData.objs);
                            loadTemplate(localData.objs);
                        });
                    }
                    else {
                        $.ajax(url, ajaxParamsObj).success(function (objectData) {
                            log('callback', url, objectData);
                            localData.obj = objectData.data;
                            if (disableLoadSign)
                                loadTemplate(objectData);
                            else {
                                $.ajax(urlDocs, ajaxParamsDocs).success(function (documentsData) {
                                    log('callbackSuccess', urlDocs, documentsData);
                                    var isSignPresent = false;
                                    // try find document with signature
                                    for (var i = 0; i < documentsData.data.length; i++) {
                                        var file = documentsData.data[i];
                                        if (file.format === "application/pkcs7-signature" && file.title === "sign.p7s" && !isSignPresent) {
                                            isSignPresent = true;
                                            $.ajax(file.url, ajaxParams).done(function (data) {
                                                localData.sign = data;
                                                log('callbackSuccess', 'sign.length', localData.sign.length);
                                                loadTemplate(objectData);
                                            });
                                        }
                                    }
                                    if (!isSignPresent) loadTemplate(objectData);
                                });
                            }
                        });
                    }
                }
            }
        }
    }());

// todo move from opSign
(function (window, document, exportName, undefined) {
    'use strict';

    var CryptoOp = {};

    /**
     * @const {string}
     */
    CryptoOp.VERSION = '0.0.5';

    /**
     * default settings
     * @namespace
     */
    CryptoOp.defaults = {};

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return CryptoOp;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = CryptoOp;
    } else {
        window[exportName] = CryptoOp;
    }
})(window, document, 'CryptoOp');

// temporary callback function for jsonp documents list callback
function renderDocuments(data) {
};

// prepare object for sign
function prepareObject(json_object) {
    var fields = ['documents', 'items', 'lots', 'features', 'enquiryPeriod', 'tenderPeriod',
        'procuringEntity', 'title', 'title_en', 'title_ru', 'description', 'description_ru',
        'description_en', 'value', 'minimalStep', 'procurementMethod', 'procurementMethodType',
        'id', 'tenderID', 'cause', 'causeDescription', 'guarantee',
        // for plan
        'additionalClassifications', 'budget', 'classification', 'planID', 'tender',
        // for awards
        'suppliers', 'bid_id', 'qualified', 'eligible', 'lotID',
        // for contracts
        'awardID', 'contractID', 'dateSigned'
    ];
    // remove fields
    if (localData.ignoreFields && $.isArray(localData.ignoreFields)) {
        for (var i = 0; i < localData.ignoreFields.length; i++) {
            var index = fields.indexOf(localData.ignoreFields[i]);
            fields.splice(index, 1);
        }
    }
    var result = {};
    for (var i = 0; i < fields.length; i++) {
        if (json_object[fields[i]] !== undefined) result[fields[i]] = json_object[fields[i]];
    }
    // temporary region_id
    if (result.items && result.items.length) {
        for (var i = 0; i < result.items.length; i++) {
            if (result.items[i].hasOwnProperty('region_id')) delete result.items[i]['region_id'];
        }
    }
    // remove enquiryPeriod.clarificationsUntil
    if (result.enquiryPeriod && result.enquiryPeriod.hasOwnProperty('clarificationsUntil'))
        delete result.enquiryPeriod['clarificationsUntil'];
    // remove enquiryPeriod.invalidationDate
    if (result.enquiryPeriod && result.enquiryPeriod.hasOwnProperty('invalidationDate'))
        delete result.enquiryPeriod['invalidationDate'];

    //remove procuringEntity.contactPoint.Language
    if (result.procuringEntity && result.procuringEntity.contactPoint && result.procuringEntity.contactPoint.hasOwnProperty('Language'))
        delete result.procuringEntity.contactPoint['Language'];

    // fix amount like 142613.33000000002 in CDB
    if (result.value && result.value.amount) {
        var roundedAmount = Math.round(result.value.amount * 100) / 100;
        if (result.value.amount !== roundedAmount) result.value.amount = roundedAmount;
    }
    // remove fields from documents section
    var documentFields = ['documents', 'financialDocuments', 'eligibilityDocuments', 'qualificationDocuments'];
    for (var i = 0; i < documentFields.length; i++) {
        if (json_object[documentFields[i]] && result[documentFields[i]]) {
            for (var index = json_object[documentFields[i]].length - 1; index >= 0; index--) {
                var document = json_object[documentFields[i]][index];
                // remove start address from url, because different API maybe uses
                var url = document.url.toLowerCase();
                document.url = document.url.replace(/^http(s)?:\/\/[^\/]+\/api\/[^\/]+/i, '');
                // remove Confidentiality and Language
                if (document.hasOwnProperty('Confidentiality')) delete document['Confidentiality'];
                if (document.hasOwnProperty('Language')) delete document['Language'];
                // convert dates to one format (without ms)
                if (document.datePublished && document.datePublished.indexOf('.') > 0)
                    document.datePublished = document.datePublished.substr(0, document.datePublished.indexOf('.'));
                if (document.dateModified && document.dateModified.indexOf('.') > 0)
                    document.dateModified = document.dateModified.substr(0, document.dateModified.indexOf('.'));
                if (document.title === 'sign.p7s' && document.format === "application/pkcs7-signature" || (/^audit_.+\.yaml$/i).test(document.title)) {
                    result[documentFields[i]].splice(index, 1);
                }
            }
            if (!result[documentFields[i]].length) delete result[documentFields[i]];
        }
    }

    if (result.lots && result.lots.length) {
        for (var i = 0; i < result.lots.length; i++) {
            if (result.lots[i].auctionPeriod) delete result.lots[i]['auctionPeriod'];
            if (result.lots[i].auctionUrl) delete result.lots[i]['auctionUrl'];
            if (result.lots[i].status === "active" || result.lots[i].status === "complete" || result.lots[i].status === "unsuccessful") delete result.lots[i]['status'];
        }
    }
    return JSON.stringify(result);
}