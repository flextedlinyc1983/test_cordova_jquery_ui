var TestIt = TestIt || {};

TestIt.TestController = function () {

    this.$testPage = null;
    this.$linkBtn = null;
    //this.$ctnErr = null;
    //this.$txtFirstName = null;
    //this.$birth = null;
};

TestIt.TestController.prototype.init = function () {
    this.$testPage = $("#buttons");
    this.$linkBtn = $("#link-button", this.$testPage);

    this.$linkBtn.text("test link button");

    //this.$ctnErr = $("#ctn-err", this.$testPage);
    //this.$birth = $("#birth", this.$testPage);
    //this.$txtFirstName = $("#txt-first-name", this.$testPage);
};

TestIt.TestController.prototype.Test = 'testtest';

TestIt.TestController.prototype.onTestCommand = function () {
    var test = this.Test;

    //var me = this,
        //birth = me.$birth..val().trim(),
        //firstName = me.$txtFirstName.val().trim(),
        //lastName = me.$txtLastName.val().trim(),
        //emailAddress = me.$txtEmailAddress.val().trim(),
        //password = me.$txtPassword.val().trim(),
        //passwordConfirm = me.$txtPasswordConfirm.val().trim(),
        //invalidInput = false,
        //invisibleStyle = "bi-invisible",
        //invalidInputStyle = "bi-invalid-input";

    var me = this,
        birth = me.$birth.val().trim(),
        firstName = me.$txtFirstName.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$birth.removeClass(invalidInputStyle);
    me.$txtFirstName.removeClass(invalidInputStyle);


    // Flag each invalid field.
    if (birth.length === 0) {
        me.$birth.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (firstName.length === 0) {
        me.$txtFirstName.addClass(invalidInputStyle);
        invalidInput = true;
    }


    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    //if (!me.emailAddressIsValid(emailAddress)) {
    //    me.$ctnErr.html("<p>Please enter a valid email address.</p>");
    //    me.$ctnErr.addClass("bi-ctn-err").slideDown();
    //    me.$txtEmailAddress.addClass(invalidInputStyle);
    //    return;
    //}

    //if (!me.passwordsMatch(password, passwordConfirm)) {
    //    me.$ctnErr.html("<p>Your passwords don't match.</p>");
    //    me.$ctnErr.addClass("bi-ctn-err").slideDown();
    //    me.$txtPassword.addClass(invalidInputStyle);
    //    me.$txtPasswordConfirm.addClass(invalidInputStyle);
    //    return;
    //}

    //if (!me.passwordIsComplex(password)) {
    //    // TODO: Use error message to explain password rules.
    //    me.$ctnErr.html("<p>Your password is very easy to guess.  Please try a more complex password.</p>");
    //    me.$ctnErr.addClass("bi-ctn-err").slideDown();
    //    me.$txtPassword.addClass(invalidInputStyle);
    //    me.$txtPasswordConfirm.addClass(invalidInputStyle);
    //    return;
    //}

    $.ajax({
        //type: 'POST',
        type: 'GET',
        url: BookIt.Settings.signUpUrl,
        //data: "email=" + emailAddress + "&firstName=" + firstName + "&lastName=" + lastName + "&password=" + password + "&passwordConfirm=" + passwordConfirm,
        //data: "user[name]=" + firstName + "&user[pass]=" + password,
        data: '',
        crossDomain: true,
        success: function (resp) {

            $.mobile.navigate("#page-signup-succeeded");
            return;

            //if (resp.success === true) {
            //    $.mobile.navigate("#page-signup-succeeded");
            //    return;
            //} else {
            //    if (resp.extras.msg) {
            //        switch (resp.extras.msg) {
            //            case BookIt.ApiMessages.DB_ERROR:
            //            case BookIt.ApiMessages.COULD_NOT_CREATE_USER:
            //                // TODO: Use a friendlier error message below.
            //                me.$ctnErr.html("<p>Oops! BookIt had a problem and could not register you.  Please try again in a few minutes.</p>");
            //                me.$ctnErr.addClass("bi-ctn-err").slideDown();
            //                break;
            //            case BookIt.ApiMessages.EMAIL_ALREADY_EXISTS:
            //                me.$ctnErr.html("<p>The email address that you provided is already registered.</p>");
            //                me.$ctnErr.addClass("bi-ctn-err").slideDown();
            //                me.$txtEmailAddress.addClass(invalidInputStyle);
            //                break;
            //        }
            //    }
            //}
        },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! BookIt had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

TestIt.TestController.prototype.resetSignUpForm = function () {

    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtFirstName.removeClass(invalidInputStyle);
    this.$birth.removeClass(invalidInputStyle);

    this.$txtFirstName.val("");
    this.$birth.val("");

};