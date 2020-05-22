$(function () {
  /*
  $(".fn-nav").click(function(){
      var onoff= $("#navbox").attr("data-show");
      if(onoff == "false"){
          $("#navbox").show().attr({"data-show":"true"});
      }else{
          $("#navbox").hide().attr({"data-show":"false"});
      }
  })
  */
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true,
  });
  wow.init();

  var windowWidth = $(window).width();
  if (windowWidth > 1170) {
    var padleft = parseInt((windowWidth - 1170) / 2);
    console.log(padleft);
    $('#leftpad').css({ 'padding-left': padleft });
  }
});
