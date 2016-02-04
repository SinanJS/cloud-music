define(function (require, exports, module) {
    var Verify = {
        v_phoneNum: function (phone) {
            var reg = /^((\(\d{2,3}\))|(\d{3}\-))?1[3,8,5]{1}\d{9}$/;
            if (!phone || !reg.test(phone)) {
                return false;
            } else {
                return true;
            }
        },
        pwd_diff: function (pwd, pwd_2) {
            if (pwd === pwd_2) {
                return true;
            } else {
                return false;
            }
        }
    };
    module.exports = Verify;
});
