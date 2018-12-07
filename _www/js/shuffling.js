$( function (){
	var $a = $(".buttons a");
	var $s = $(".buttons span");
	var cArr = ["p4","p3","p2","p1"];
	var index = 0;
	$(".next").click(
		function(){
			nextImg();
		}
	)
	$(".prev").click(
		function(){
			prevImg();
		}
	)
	//上一张
	function prevImg(){
		cArr.unshift(cArr[cArr.length - 1]);  //向数组开头添加元素
		cArr.pop();  //删除数组最后一个元素
		//i是元素的索引，从0开始
		//e为当前处理的元素
		//each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
		$(".list li").each(function(i,e){
			$(e).removeClass().addClass(cArr[i]);
		})
		index --;
		if (index < 0) {
			index = cArr.length - 1;
		}
		show();
	}
	//下一张
	function nextImg(){
		cArr.push(cArr[0]);  //向数组最后添加元素
		cArr.shift();  //删除数组第一个元素
		$(".list li").each(function(i,e){
			$(e).removeClass().addClass(cArr[i]);
		})
		index ++;
		if (index > cArr.length - 1) {
			index = 0;
		}
		show();
	}
	//通过底下按钮点击切换
	$a.each(function(){
		$(this).click( function (){
			var myindex = $(this).index();
			var b = myindex-index;
			if(b == 0) {
				return;
			}
			else if(b > 0) {
				/*
				 * splice(0,b)的意思是从索引0开始,取出数量为b的数组
				 * 因为每次点击之后数组都被改变了,所以当前显示的这个照片的索引才是0
				 * 所以取出从索引0到b的数组,就是从原本的这个照片到需要点击的照片的数组
				 * 这时候原本的数组也将这部分数组进行移除了
				 * 再把移除的数组添加的原本的数组的后面
				 */
				var newarr = cArr.splice(0,b);
				cArr = $.merge(cArr,newarr); //合并两个数组内容到第一个数组
				$(".list li").each(function(i,e){
					$(e).removeClass().addClass(cArr[i]);
				})
				index = myindex;
				show();
			}
			else if(b<0){
				/*
				 * 因为b<0,所以取数组的时候是倒序来取的,也就是说我们可以先把数组的顺序颠倒一下
				 * 而b现在是负值,所以取出索引0到-b即为需要取出的数组
				 * 也就是从原本的照片到需要点击的照片的数组
				 * 然后将原本的数组跟取出的数组进行拼接
				 * 再次倒序,使原本的倒序变为正序
				 */
				cArr.reverse();
				var oldarr = cArr.splice(0,-b)
				cArr = $.merge(cArr,oldarr);
				cArr.reverse();
				$(".list li").each(function(i,e){
					$(e).removeClass().addClass(cArr[i]);
				})
				index = myindex;
				show();
			}
		})
	})
	
	//改变底下按钮的背景色
	function show(){
		$($s).eq(index).addClass("blue").parent().siblings().children().removeClass("blue");
	}
	//点击class为p2的元素触发上一张照片的函数
	$(document).on("click",".p2",function (){
		prevImg();
		return false;//返回一个false值，让a标签不跳转
	});
	//点击class为p4的元素触发下一张照片的函数
	$(document).on("click",".p4",function (){
		nextImg();
		return false;
	});
	//鼠标移入box时清除定时器
	$(".box").mouseover( function (){
		clearInterval(timer);
	})
	//鼠标移出box时开始定时器
	$(".box").mouseleave( function (){
		timer = setInterval(nextImg,3000);
	})
	//进入页面自动开始定时器
	timer = setInterval(nextImg,3000);
	//移动端左右滑动touch事件
    $(".box").on('touchstart','.p3',function (e){
        clearInterval(timer);
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    $(".box").on('touchmove','.p3',function (e){
        clearInterval(timer);
    });
    $(".box").on('touchend','.p3',function (e){
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        moveEndY = e.originalEvent.changedTouches[0].pageY;
        X = moveEndX - startX;
        Y = moveEndY - startY;
        if (Math.abs(X) > Math.abs(Y) && X > 10){
            e.preventDefault();
            prevImg();
        }else if (Math.abs(X) > Math.abs(Y) && X < -10){
            e.preventDefault();
            nextImg();
        }
        timer = setInterval(nextImg,3500);
        return false;
    });
});
