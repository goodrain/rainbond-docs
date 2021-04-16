$(function () {
  var tab_list = document.querySelector('.tabs-nav');
  var lis = tab_list.querySelectorAll('li');
  var items = document.querySelectorAll('.every_tabs_container');
  var downs = document.querySelectorAll('.flap-card .footer .btns');
  // 获取隐藏的DOM
  for (var i = 0; i < lis.length; i++) {
    // 设置索引号
    lis[i].setAttribute('index', i);
    lis[i].onclick = function () {
      for (var i = 0; i < lis.length; i++) {
        lis[i].className = '';
      }
      this.className = 'isActive';

      //显示内容
      var index = this.getAttribute('index');
      for (var i = 0; i < items.length; i++) {
        items[i].style.display = 'none';
      }
      items[index].style.display = 'block';
    };
  }

  //下拉菜单的显示与隐藏
  for (var i = 0; i < downs.length; i++) {
    downs[i].addEventListener('click', function (e) {
      // 取消默认行为
      e.preventDefault();
      const config = $(this).attr('class');
      if (config === 'btns') {
        // 下拉菜单显示
        $(this).parent().next().stop().slideToggle();
        // 按钮的切换
        $(this).removeClass('btns').addClass('errorBtns');
        // 点击后, 当前显示,兄弟节点隐藏;
        $(this)
          .parent()
          .parent('.flap-card')
          .siblings()
          .children('.desc')
          .css('display', 'none');
        // 点击后,别的兄弟节点按钮为蓝色
        $(this)
          .parent()
          .parent('.flap-card')
          .siblings()
          .children('.footer')
          .children('a')
          .addClass('btns')
          .removeClass('errorBtns');
        // 点击后自己变为初始状态,兄弟节点缩放和透明
        $(this)
          .parent()
          .parent('.flap-card')
          .removeClass('other')
          .siblings()
          .addClass('other');
        // 点击让兄弟节点有鼠标悬停的效果
        $(this)
          .parent()
          .parent('.flap-card')
          .removeClass('active')
          .siblings()
          .addClass('active');
      } else {
        // 收起下拉菜单
        $(this).parent().next().stop().slideToggle();
        // 按钮的切换
        $(this).removeClass('errorBtns').addClass('btns');
        // 点击收起的时候,别的兄弟节点按钮颜色变为蓝色
        $(this)
          .parent()
          .parent('.flap-card')
          .siblings()
          .children('.footer')
          .children('a')
          .addClass('btns');
        // 点击收起的时候，所有都变为初始值
        $(this)
          .parent()
          .parent('.flap-card')
          .removeClass('other')
          .siblings()
          .removeClass('other');
        // 点击隐藏的时候,清除所有的鼠标悬停
        $(this)
          .parent()
          .parent('.flap-card')
          .removeClass('active')
          .siblings()
          .removeClass('active');
      }
    });
  }
});
