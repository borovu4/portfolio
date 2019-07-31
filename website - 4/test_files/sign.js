var clickedBtn;
$(document).ready(function () {

    $('.sign_btn').click(function () {
        options.apiResourceUrl = options.apiResourceUrl + $(this).attr('tid');
        opSign.init(options);
    })

    $('.sign_btn_qualification').click(function () {
        options.apiResourceUrl = options.apiResourceUrl + $(this).attr('tid') + '/qualifications/' + $(this).attr('qualId');
        options.callbackPostSign = 'postSignQualification';
        options.placeholderId = '#' + $(this).closest('form').parent().find('.e_sign_block').attr('id');
        clickedBtn = $(this);
        opSign.init(options);
    })

    $('.sign_plan_btn').click(function () {
        options.apiResourceUrl = 'https://lb.api-sandbox.openprocurement.org/api/2.3/plans/' + $(this).attr('tid');
        options.callbackPostSign = 'postSignPlan';
        options.placeholderId = '#' + $(this).closest('form').parent().find('#e_sign_block').attr('id');
        clickedBtn = $(this);
        opSign.init(options);
    })

    $('.sign_btn_award').click(function () {
        options.apiResourceUrl = options.apiResourceUrl + $(this).attr('tid') + '/awards/' + $(this).attr('awardId');
        options.callbackPostSign = 'postSignAward';
        options.placeholderId = '#' + $(this).siblings('div').attr('id');
        clickedBtn = $(this);
        opSign.init(options);
    })

    $('body').on('click', '.sign_btn_contract:visible', function () {
        // options.apiResourceUrl = options.apiResourceUrl + $(this).attr('tid') + '/contracts/' + $(this).attr('contractId');
        options.apiResourceUrl = 'https://lb.api-sandbox.openprocurement.org/api/2.3/tenders/' + $(this).attr('tid') + '/contracts/' + $(this).attr('contractId');
        options.callbackPostSign = 'postSignContract';
        options.placeholderId = '.modal-body #' + $(this).closest('form').parent().find('.e_sign_block').attr('id');
        clickedBtn = $(this);
        console.log(options.placeholderId);
        opSign.init(options);
    })

    var options = {
        /* {url} full address of object in API */
        apiResourceUrl: "https://lb.api-sandbox.openprocurement.org/api/2.3/tenders/",
        /* {string} element id (jquery) to render html */
        placeholderId: "#sign_block",
        /* {boolean} verify signature on start, if exist */
        verifySignOnInit: true,
        /* {boolean} if verification error, allow sign whatever */
        ignoreVerifyError: true,
        /* callback obtaining json from API  */
        callbackRender: "renderJson",
        /* callback after put sign */
        callbackPostSign: "postSign",
        /* callback after init all libs */
        callbackOnInit: "onInit",
        /* callback before init all libs */
        callbackBeforeInit: "beforeInit",
        /* callback after verify signature */
        callbackCheckSign: "checkSign",
        /* using jsondiffpatch-formatters for render difference */
        userJsonDiffHtml: true,
        /* custom ajaxOptions options */
        ajaxOptions: {'global': false},
        /* use JSONP for call API method (if CORS not available)  */
        useJsonp: false,
        /* only verify signature, without render template */
        verifyOnly: false,
        /* list of fields, witch will be ignored during verify */
        ignoreFields: ['xxx'],
        /* disable loading data from apiResourceUrl on start */
        disableLoadObj: false,
        /* disable loading signature file from apiResourceUrl on start, only if disableLoadObj = false */
        disableLoadSign: false
    }
})

function renderJson() {
    //$('.sign_btn').prop('disabled',true);
    console.log('renderJson');
}

function postSign(signature) {
    console.log(signature);
    $.ajax({
        type: "POST",
        url: web_path + 'buyer/tender/tenderecp',
        data: {
            'data': signature,
            'tender_id': $('.sign_btn').attr('tid')
        },
        cache: false,
        success: function (data) {
            $('#PKStatusInfo').html('Підпис успішно накладено.');
            //console.log(data);
        }
    })
}


function postSignContract(signature) {

    $.ajax({
        type: "POST",
        url: web_path + 'buyer/tender/setcontractsign',
        data: {
            'data': signature,
            'tender_id': clickedBtn.attr('tid'),
            'contractId': clickedBtn.attr('contractId'),
            //'action': clickedBtn.attr('action'),
            'tenderId': clickedBtn.attr('tenderId'),
        },
        cache: false,
        success: function (data) {
            $('#PKStatusInfo').html('Підпис успішно накладено.');
            document.location.reload();
        }
    })
    return false;
}

function postSignAward(signature) {

    $.ajax({
        type: "POST",
        url: web_path + 'buyer/tender/setawardstatus',
        data: {
            'data': signature,
            'tender_id': clickedBtn.attr('tid'),
            'awardId': clickedBtn.attr('awardId'),
            'action': clickedBtn.attr('action'),
            'tenderId': clickedBtn.attr('tenderId'),
        },
        cache: false,
        success: function (data) {
            $('#PKStatusInfo').html('Підпис успішно накладено.');
            document.location.reload();
        }
    })
    return false;
}

function postSignQualification(signature) {

    $.ajax({
        type: "POST",
        url: web_path + 'buyer/tender/setqualificationstatus',
        data: {
            'data': signature,
            'tender_id': clickedBtn.attr('tid'),
            'qualId': clickedBtn.attr('qualId'),
            'action': clickedBtn.attr('action'),
            'tenderId': clickedBtn.attr('tenderId'),
        },
        cache: false,
        success: function (data) {
            $('#PKStatusInfo').html('Підпис успішно накладено.');
            document.location.reload();
        }
    })
    return false;
}

function postSignPlan(signature) {

    $.ajax({
        type: "POST",
        url: web_path + 'buyer/tender/planecp',
        data: {
            'data': signature,
            'tender_id': $('.sign_plan_btn').attr('tid')
        },
        cache: false,
        success: function (data) {
            $('#PKStatusInfo').html('Підпис успішно накладено.');
            document.location.reload();
            //console.log(data);
        }
    })
    return false;
}

function onInit() {
    console.log('onInit');
}

function beforeInit() {
    console.log('beforeInit');
}

function checkSign() {
    console.log('checkSign');
}