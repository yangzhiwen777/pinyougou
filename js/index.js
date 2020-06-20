window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus');
    var zuoanniu = this.document.querySelector('.zuoanniu');
    var youanniu = this.document.querySelector('.youanniu');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        zuoanniu.style.display = 'block';
        youanniu.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        zuoanniu.style.display = 'none';
        youanniu.style.display = 'none';
        timer = setInterval(function () {
            youanniu.click()
        }, 2000);
    });
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        var lis = this.document.createElement('li');
        // 添加序号
        lis.setAttribute('index', i);
        ol.appendChild(lis);
        // 小圆点的排他思想
        lis.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            // console.log(focus.offsetWidth);
            num = index;
            circle = index;
            // 点击小丽 切换图片
            animate(ul, -index * focusWidth);
        });
    }
    ol.children[0].className = 'current';
    // 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮 图片滚动
    var num = 0;
    var circle = 0;

    //   节流阀
    var flag = true;
    youanniu.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true
            });

            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 怕他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });


    zuoanniu.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;

                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 怕他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });

    // 自动播放轮播图
    var timer = setInterval(function () {
        youanniu.click()
    }, 2000);
});


