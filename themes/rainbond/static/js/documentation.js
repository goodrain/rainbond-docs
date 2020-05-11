$(function() {
  var selected = $(".sidemenu").find(".menu-item-selected");
  initOpen(selected);
  $(".canopen").on("click", function(event) {
    event.stopPropagation();
    if ($(this).hasClass("open")) {
      $(this).removeClass("open")
    }else {
      $(".canopen").removeClass("open")
      initOpen($(this))
      $(this).addClass("open")
    }
  });
  $("#bt-search").on("click", function() {
    handleSearch();
  });
  $("#bt-search-global").on("click", function() {
     var query = $(".search-ipt").val();
     window.location.href = "/docs/search/?query="+query
  });
  $(document).keyup(function(event) {
    if (event.keyCode == 13) {
      if ($(".search-box-global").length>0){
        var query = $(".search-ipt").val();
        window.location.href = "/docs/search/?query="+query
      }else{
        handleSearch();
      }
    }
  });
  if (getQueryVariable("query")) {
    if ($(".search-ipt").length > 0) {
      var query = getQueryVariable("query")
      $(".search-ipt").val(query);
      handleSearch();
    }
  }
  $('.problem-item').on('click', function() {	
    if ($(this).hasClass('active')) {	
      $(this).removeClass('active')	
    } else {	
      $('.problem-item').removeClass('active')	
      $(this).addClass('active')	
    }
  });
  initCopyCode()
});

function changeHeight(target, changeHeightNum, mode) {
  let parentLi = target.parent().parent()
  if (parentLi.length>0) {
     changeHeight(parentLi, changeHeightNum, mode)
     let current = parentLi.height()
     if (mode == "add") {
       parentLi.height(current+changeHeightNum);
     }else{
       parentLi.height(current-changeHeightNum);
     }
  }
}

//code copy
function initCopyCode(){
  var copyHtml = '';
  copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
  copyHtml += ' <span>copy</span>';
  copyHtml += '</button>';
  $(".markdown-body pre code").before(copyHtml);
  new ClipboardJS('.btn-copy', {
      target: function(trigger) {
          return trigger.nextElementSibling;
      }
  });
}
function initOpen(selected) {
  selected.parents(".canopen").addClass("open")
}
function handleSearch () {
  if ($('.search-ipt').length > 0) {
    var query = $('.search-ipt').val()
    $('.search-list').loading()
    search(query, items => {
      $('.search-list').loading('stop')
      if (items && items.length > 0) {
        if (!$('.search-list').find('.tips').hasClass('hidden')) {
          $('.search-list').find('.tips').addClass('hidden')
        }
        var box = $('.search-list').find('ul')
        $(box).empty()
        if ($(box).hasClass('hidden')) {
          $(box).removeClass('hidden')
        }
        items.map(item => {
          var li = $('<li></li>')
          if (item.title) {
            li.append(
              '<h4><a href="' +
                item.url +
                '" class="links" target="_blank">' +
                item.title +
                '</a></h4>'
            )
          }
          if (item.description) {
            li.append('<p class="ct">' + item.description + '</p>')
          }
          $(box).append(li)
        })
      } else {
        if ($('.search-list').find('.tips').hasClass('hidden')) {
          $('.search-list').find('.tips').removeClass('hidden')
        }
        var box = $('.search-list').find('ul')
        $(box).empty()
      }
    })
  }
}

var client = algoliasearch('RITXU8D7M1', '821093c5255b7d4d40129bc13a12882f')
var index = client.initIndex('rainbond-v5.2')
function search (term, response) {
  index.search(
    {
      query: term
    },
    function (err, re) {
      if (err) {
        console.log(err)
        return
      }
      response(re.hits)
    }
  )
}

function getQueryVariable (key) {
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  var result = window.location.search.substr(1).match(reg)
  return result ? decodeURIComponent(result[2]) : null
}
