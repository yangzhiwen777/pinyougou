$(function () {
    // 全选与全不选模块
    $(".checkall").change(function () {
        // console.log($(this).prop("checked"));
        $(".j-checkbox ,.checkall").prop("checked", $(this).prop("checked"))
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    $(".j-checkbox").change(
        function () {
            if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
                $(".checkall").prop("checked", true);
            }
            else {
                $(".checkall").prop("checked", false);
            }
            if ($(this).prop("checked")) {
                // 让所有的商品添加 check-cart-item 类名
                $(this).parents(".cart-item").addClass("check-cart-item");
            } else {
                // check-cart-item 移除
                $(this).parents(".cart-item").removeClass("check-cart-item");

            }
        }

    );
    // 增减产品数量模块
    $(".increment").click(function () {
        var num = $(this).siblings(".itxt").val();
        num++;
        $(this).siblings(".itxt").val(num);
        // 增加商品小计模块
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        var price = (num * p).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    // 减号
    $(".decrement").click(function () {
        var num = $(this).siblings(".itxt").val();
        if (num == 1) {
            return false;
        }
        num--;
        $(this).siblings(".itxt").val(num);
        // 减少商品小计模块
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        // var price = (num * p).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (num * p).toFixed(2))
        getSum();
    });
    // 用户修改文本框的值计算小计模块
    $(".itxt").change(function () {
        // console.log($(this).val());
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        // console.log($(this).val() * p);
        var num = $(this).val();
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (num * p).toFixed(2))
        getSum();
    });
    getSum();
    // 计算总额总计模块
    function getSum() {
        var count = 0;//总件数
        var money = 0;//总钱数
        $(".itxt").each(function (i, ele) {
            count = count + parseInt($(ele).val());
        });
        // console.log(count);
        $(".amount-sum em").text(count)

        $(".p-sum").each(function (i, ele) {
            // $(ele).text().substr(1);
            money = money + parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    //删除商品  按钮
    $(".p-action").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //  删除选中的按钮
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //清空购物车
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    });
    // $(".j-checkbox:checked").parents(".cart-item").css("background", "pink");
})