'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var actionUrl = dw.web.URLUtils.url('Newsletter-Handler');
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();

        res.render('newsletter/newsletterSignup', {
            actionUrl: actionUrl,
            newsletterForm: newsletterForm
        });
        next();
    }
);

server.get(
    'Success',
    server.middleware.https,
    function (req, res, next) {
        res.render('/newsletter/newslettersuccess', {
            continueUrl: URLUtils.url('Newsletter-Show'),
            newsletterForm: server.forms.getForm('newsletter')
        });
        next();
    }
);

server.post(
    'Handler',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var Transaction = require('dw/system/Transaction');
        var newsletterForm = server.forms.getForm('newsletter');
        var continueUrl = dw.web.URLUtils.url('Newsletter-Show');

        // Check if email address confirmed successfully (matches)
        newsletterForm.valid =
            newsletterForm.valid &&
            newsletterForm.email.value === newsletterForm.emailconfirm.value;

        if (newsletterForm.valid) {
            try {
                Transaction.wrap(function () {
                    //Keep the same code you had inside the try block above
                    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
                    var co = CustomObjectMgr.createCustomObject('NewsletterSubscription', newsletterForm.email.value);
                    // var co = CustomObjectMgr.createCustomObject('subscription', newsletterForm.email.value);
                    co.custom.firstName = newsletterForm.fname.value;
                    co.custom.lastName = newsletterForm.lname.value;

                    res.json({
                        success: true,
                        redirectUrl: URLUtils.url('Newsletter-Success').toString()
                    });
                });
            } catch (e) {
                var err = e;
                var Resource = require('dw/web/Resource');
                if (err.javaName === "MetaDataException") {
                    /* Duplicate primary key on CO: send back message to client-side, but don't log error.
                        This is possible if the user tries to subscribe with the same email multiple times */
                    res.json({
                        success: false,
                        error: [Resource.msg('error.subscriptionexists', 'newsletter', null)]
                    });
                } else {
                    /* Missing CO definition: Log error with message for site admin, set the response to error, and send error page URL to client-side */
                    var Logger = require('dw/system/Logger');
                    Logger.getLogger("newsletter_subscription").error(Resource.msg('error.customobjectmissing', 'newsletter', null));
                    // Show general error page: there is nothing else to do
                    // res.setStatusCode(500);
                    // res.json({
                    //     error: true,
                    //     redirectUrl: URLUtils.url('Error-Start').toString()
                    // });

                    // Handle server-side validation errors here: this is just an example
                    res.json({
                        success: false,
                        error: [Resource.msg('error.crossfieldvalidation', 'newsletter', null)]
                    });
                }
                // res.setStatusCode(500);
                // res.json({
                //     error: true,
                //     redirectUrl: URLUtils.url('Error-Start').toString()
                // });
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////
            // Send back a success status, and a redirect to another route
            // res.render('/newsletter/newslettersuccess', {
            //     continueUrl: continueUrl,
            //     newsletterForm: newsletterForm
            // });
            ////////////////////////////////////////////////////////////////////////////////////////////////
            // Show the success page
            // res.json({
            //     success: true,
            //     redirectUrl: URLUtils.url('Newsletter-Success').toString()
            // });
        } else {
            var Resource = require('dw/web/Resource');
            res.json({
                success: false,
                error: [Resource.msg('error.crossfieldvalidation', 'newsletter', null)]
            });
            // Handle server-side validation errors here: this is just an example
            // res.render('/newsletter/newslettererror', {
            //     errorMsg: dw.web.Resource.msg('error.crossfieldvalidation', 'newsletter', null),
            //     continueUrl: continueUrl
            // });

            // Handle server-side validation errors here: this is just an example
            // res.setStatusCode(500);
            // res.json({
            //     error: true,
            //     redirectUrl: URLUtils.url('Error-Start').toString()
            // });
        }
        next();
    }
);

module.exports = server.exports();
