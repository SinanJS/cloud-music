define(function (require, exports, module) {
    var Verify = {
        //去掉前后空格
        replaceSpace:function(txt){
            var reg= /(^\s*)|(\s*$)/g;
            return txt.replace(reg,'');
        },

        v_phoneNum: function (phone) {
            var reg = /^1[34578]\d{9}$/;
            if (!phone || !reg.test(phone)) {
                return false;
            } else {
                return true;
            }
        },
        v_email: function (email) {
            var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if (!email || !reg.test(email)) {
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
