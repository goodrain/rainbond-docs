(function(win) {
  function ModalVisitor(option) {
    this.option = Object.assign(
      {},
      {
        width: 300,
        height: 400
      },
      option
    );
    this._init();
  }
  ModalVisitor.prototype = {
    _init: function() {
      this._create();
      this.bind();
    },
    _create: function() {
      this.$wrap = document.createElement("div");
      this.$wrap.className = "modal-visitor-wrap";
      this.$wrap.innerHTML =
        "<div class='bg'></div><div class='modal-visitor'><div class='head'><h3>申请试用</h3><span class='close'></span></div></div>";
      $("body").append(this.$wrap);
      $(this.$wrap)
        .find(".modal-visitor")
        .css({ width: this.option.width, height: this.option.height });
      $(this.$wrap).find(".modal-visitor").append("<div class='form'></div>");
      if (getCookie("visitors") == "true") {
        $(this.$wrap).find(".form").append('<div class="msg"><p class="success">你已完成申请</p><p>请你稍后，我们在线服务人员尽快与你联系</p></div>');
      } else {
        $(this.$wrap)
          .find(".form")
          .append(
            "<div class='form-item'><span>姓名</span><input type='text' name='name'/></div>"
          );
        $(this.$wrap)
          .find(".form")
          .append(
            "<div class='form-item'><span>手机号</span><input type='text' name='phone'/></div>"
          );
        $(this.$wrap)
          .find(".form")
          .append(
            "<div class='form-item'><span>公司名称</span><input type='text' name='enterpriseName'/></div>"
          );
        $(this.$wrap)
          .find(".form")
          .append(
            "<div class='form-item'><span>职位</span><input type='text' name='position'/></div>"
          );
        $(this.$wrap)
          .find(".form")
          .append(
            "<div class='form-item hidden'><input type='text' hidden name='source'/></div>"
          );
        $(this.$wrap)
          .find(".form")
          .append(
            "<div class='form-item hidden'><input type='text' hidden name='smsg'/></div>"
          );
        $(this.$wrap)
          .find(".form")
          .append(
            "<div class='form-item submit'><button class='send'>确定</button></div>"
          );
        $(this.$wrap).find(".form").append('<div class="msg"></div>');
      }
    },
    show: function(option) {
      if (option.title) {
        $(this.$wrap).find(".head h3").html(option.title);
      }
      if (option.source) {
        $(this.$wrap).find("input[name='source']").val(option.source);
      }
      if (option.smsg) {
        $(this.$wrap).find("input[name='smsg']").val(option.smsg);
      }
      $(this.$wrap).show();
    },
    hide: function() {
      $(this.$wrap).hide();
    },
    msg: function(msg, success = false) {
      if (!success) {
        $(this.$wrap).find(".msg").addClass("error");
        $(this.$wrap).find(".send").removeClass("disable");
        $(this.$wrap).find(".send").html("确定");
      } else {
        $(this.$wrap).find(".msg").removeClass("error");
        $(this.$wrap).find(".msg").addClass("success");
        $(this.$wrap).find(".send").html("已完成申请");
      }
      $(this.$wrap).find(".msg").html(msg);
    },
    bind: function() {
      var self = this;
      $(this.$wrap).delegate(".close", "click", function() {
        self.hide();
      });
      $(this.$wrap).delegate(".send", "click", function() {
        if ($(self.$wrap).find(".send").hasClass("disable")) {
          return;
        }
        $(self.$wrap).find(".send").html("提交中");
        $(self.$wrap).find(".send").addClass("disable");
        var name = $("input[name='name']").val();
        if (name.length < 2) {
          self.msg("姓名少于两个字符");
          return;
        }
        var phone = $("input[name='phone']").val();
        if (!checkPhone(phone) && !checkTel(phone)) {
          self.msg("手机号码非法");
          return;
        }
        var enterpriseName = $("input[name='enterpriseName']").val();
        if (enterpriseName.length < 2) {
          self.msg("企业名称少于两个字符");
          return;
        }
        var position = $("input[name='position']").val();
        if (position.length < 2) {
          self.msg("职位少于一个字符");
          return;
        }
        var source = $("input[name='source']").val();
        var smsg = $("input[name='smsg']").val();
        self.sendVisitor(name, enterpriseName, phone, position, source, smsg);
      });
    },
    sendVisitor(name, enterpriseName, phone, position, source, successMsg) {
      if (!successMsg) {
        successMsg = "信息已确认，稍后将与您联系";
      }
      var self = this;
      let data = {
        name: name,
        enterpriseName: enterpriseName,
        phone: phone,
        position: position,
        source: source
      };
      axios.post(`https://log.rainbond.com/visitors`, data).then(res => {
        if (res.status == 200) {
          self.msg(successMsg, (success = true));
          setCookie("visitors", "true", 1);
        }
        console.log("send visitor info=>", res);
      });
    }
  };
  win.ModalVisitor = ModalVisitor;
})(window);

function checkPhone(phone) {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  }
  return true;
}

function checkTel(tel) {
  if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
    return false;
  }
  return true;
}

function setCookie(name, value, days) {
  if (!days) {
    days = 1;
  }
  var exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
