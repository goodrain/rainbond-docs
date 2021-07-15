$(function() {
    var selected = $('.sidemenu').find('.menu-item-selected');
    initOpen(selected);
    $('.canopen').on('click', function(event) {
        event.stopPropagation();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
        } else {
            initOpen($(this));
            $(this).addClass('open');
        }
    });
    $('#bt-search').on('click', function() {
        handleSearch();
    });
    $('#bt-search-global').on('click', function() {
        var query = $('.search-ipt').val();
        window.location.href = '/docs/search/?query=' + query;
    });
    $(document).keyup(function(event) {
        if (event.keyCode == 13) {
            if ($('.search-box-global').length > 0) {
                var query = $('.search-ipt').val();
                window.location.href = '/docs/search/?query=' + query;
            } else {
                handleSearch();
            }
        }
    });
    if (getQueryVariable('query')) {
        if ($('.search-ipt').length > 0) {
            var query = getQueryVariable('query');
            $('.search-ipt').val(query);
            handleSearch();
        }
    }
    $('.problem-item').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.problem-item').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.sidemenu-toggle').on('click', function() {
        if ($(this).parent().hasClass('sidemenu-open')) {
            $(this).parent().removeClass('sidemenu-open');
            $(this).find('img').attr({
                src: 'https://img.alicdn.com/tfs/TB1E6apXHGYBuNjy0FoXXciBFXa-200-200.png',
            });
        } else {
            $(this).parent().addClass('sidemenu-open');
            $(this).find('img').attr({
                src: 'https://img.alicdn.com/tfs/TB1I5itXQyWBuNjy0FpXXassXXa-200-200.png',
            });
        }
    });
    initCopyCode();
});

function changeHeight(target, changeHeightNum, mode) {
    let parentLi = target.parent().parent();
    if (parentLi.length > 0) {
        changeHeight(parentLi, changeHeightNum, mode);
        let current = parentLi.height();
        if (mode == 'add') {
            parentLi.height(current + changeHeightNum);
        } else {
            parentLi.height(current - changeHeightNum);
        }
    }
}

//code copy
function initCopyCode() {
    var copyHtml = '';
    copyHtml += '<span class="btn-copy" data-clipboard-snippet="">';
    copyHtml += ' <svg data-v-49140617="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="hover" style="bottom: 7.5px;"><path data-v-49140617="" fill="none" d="M0 0h24v24H0z"></path> <path data-v-49140617="" fill="#27b1ff" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"></path></svg>';
    copyHtml += '</span>';
    $('.markdown-body pre code').before(copyHtml);
    new ClipboardJS('.btn-copy', {
        target: function(trigger) {
            return trigger.nextElementSibling;
        },
    });
}

function initOpen(selected) {
    selected.addClass('open');
    selected.parents('.canopen').addClass('open');
}

function handleSearch() {
    if ($('.search-ipt').length > 0) {
        var query = $('.search-ipt').val();
        $('.search-list').loading();
        search(query, (items) => {
            $('.search-list').loading('stop');
            if (items && items.length > 0) {
                if (!$('.search-list').find('.tips').hasClass('hidden')) {
                    $('.search-list').find('.tips').addClass('hidden');
                }
                var box = $('.search-list').find('ul');
                $(box).empty();
                if ($(box).hasClass('hidden')) {
                    $(box).removeClass('hidden');
                }
                items.map((item) => {
                    var li = $('<li></li>');
                    if (item.title) {
                        li.append(
                            '<h4><a href="' +
                            item.url +
                            '" class="links" target="_blank">' +
                            item.title +
                            '</a></h4>'
                        );
                    }
                    if (item.description) {
                        li.append('<p class="ct">' + item.description + '</p>');
                    }
                    $(box).append(li);
                });
            } else {
                if ($('.search-list').find('.tips').hasClass('hidden')) {
                    $('.search-list').find('.tips').removeClass('hidden');
                }
                var box = $('.search-list').find('ul');
                $(box).empty();
            }
        });
    }
}

var client = algoliasearch('RITXU8D7M1', '821093c5255b7d4d40129bc13a12882f');
var index = client.initIndex('rainbond-v5.2');

function search(term, response) {
    index.search({
            query: term,
        },
        function(err, re) {
            if (err) {
                console.log(err);
                return;
            }
            response(re.hits);
        }
    );
}

function getQueryVariable(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}