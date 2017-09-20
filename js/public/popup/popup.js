$(function () {
    $(".myalert").click(function () {
        alert(
                "你好。世界！", 
                "欢迎你来到我的世界", 
                function () {
                  console.log('单击了确定')
                }, 
                {type: 'success', confirmButtonText: '好的'}
            );
    });
    $(".myconfirm").click(function () {
        confirm("", "确认将李四从九年级252班中删除么？", function (isConfirm) {
            if (isConfirm) {
               console.log('点击了确定')
            } else {
               console.log('点击了取消')
            }
        }, {confirmButtonText: '确定', cancelButtonText: '取消', width: 400});
    });
});



if (typeof $ === 'function') {
    $(function () {
        var BeAlert = {
            defaultConfig: {
                width: 320,
                height: 170,
                timer: 0,
                type: 'warning',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            },
            html: 
            '<div class="BeAlert_box">' +
            '<h2 class="alertTitle">警告</h2>'+
           /* '<div class="BeAlert_image"></div>' +*/
            '<div class="BeAlert_title"></div>' +
            '<div class="BeAlert_message"></div>' +
            '<div class="BeAlert_button">' +
            '<button class="BeAlert_confirm"></button>' +
            '<button class="BeAlert_cancel"></button>' +
            '</div>' +
            '</div>',
            overlay: '<div class="BeAlert_overlay"></div>',
            open: function (title, message, callback, o) {
                var opts = {}, that = this;
                $.extend(opts, that.defaultConfig, o);
                $('body').append(that.html).append(that.overlay);
                var box = $('.BeAlert_box');
                box.css({
                    'width': opts.width + 'px',
                    'min-height': opts.height + 'px',
                    'margin-left': -(opts.width / 2) + 'px'
                });
                $('.BeAlert_image').addClass(opts.type);
                title && $('.BeAlert_title').html(title).show(),
                message && $('.BeAlert_message').html(message).show();
                var confirmBtn = $('.BeAlert_confirm'), cancelBtn = $('.BeAlert_cancel');
                opts.showConfirmButton && confirmBtn.text(opts.confirmButtonText).show(),
                opts.showCancelButton && cancelBtn.text(opts.cancelButtonText).show();
                /*点击背景隐藏*/
                /*$('.BeAlert_overlay').unbind('click').bind('click', function () {
                    that.close();
                });*/
                
                confirmBtn.unbind('click').bind('click', function () {
                    that.close();
                    typeof callback === 'function' && callback(true);
                });
                cancelBtn.unbind('click').bind('click', function () {
                    that.close();
                    typeof callback === 'function' && callback(false);
                });
                var h = box.height();
                box.css({
                    'margin-top': -(Math.max(h, opts.height) / 2 + 100) + 'px'
                });
            },
            close: function () {
                $(".BeAlert_overlay,.BeAlert_box").remove();
            }
        };
        window.alert = function (title, message, callback, opts) {
            BeAlert.open(title, message, callback, opts);
        };
        var _confirm = window.confirm;
        window.confirm = function (title, message, callback, opts) {
            opts = $.extend({type: 'question', showCancelButton: true}, opts);
            if (typeof callback === 'function') {
                BeAlert.open(title, message, callback, opts);
            } else {
                return _confirm(title);
            }
        }
    });
}
