$(function() {
  var selected = $(".sidemenu").find(".menu-item-selected");
  initOpen(selected);
  $(".canopen").on("click", function(event) {
    event.stopPropagation();
    var item_count = $(this).data("count");
    var current_heitht = $(this).height();
    var height = 36 * (item_count + 1);
    if (item_count > 0 && current_heitht < height) {
      $(this).height(height);
      $(this).find(".menu-toggle").css({ transform: "rotate(0deg)" });
    } else {
      $(this).height(36);
      $(this).find(".menu-toggle").css({ transform: "rotate(-90deg)" });
    }
  });
  $(".sidemenu-toggle").on("click", function() {
    if ($(this).parent().hasClass("sidemenu-open")) {
      $(this).parent().removeClass("sidemenu-open");
      $(this).find("img").attr({
        src:
          "https://img.alicdn.com/tfs/TB1E6apXHGYBuNjy0FoXXciBFXa-200-200.png"
      });
    } else {
      $(this).parent().addClass("sidemenu-open");
      $(this).find("img").attr({
        src:
          "https://img.alicdn.com/tfs/TB1I5itXQyWBuNjy0FpXXassXXa-200-200.png"
      });
    }
  });
});
function initOpen(item) {
  var parentLi = $(item).parent("ul").parent();
  if ($(parentLi).height() == 36 && $(parentLi).data("count") > 0) {
    $(parentLi).height(($(parentLi).data("count") + 1) * 36);
  }
  var p = $(parentLi).parent("ul").parent();
  if (p.length > 0) {
    initOpen(parentLi);
  }
}
