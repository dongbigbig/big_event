$(function() {

    var form = layui.form;
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }



    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})



// $(function() {
//   var form = layui.form

//   form.verify({
//     nickname: function(value) {
//       if (value.length > 6) {
//         return '昵称长度必须在 1 ~ 6 个字符之间！'
//       }
//     }
//   })

//   initUserInfo()

//   // 因为 form 为局部变量，我们无法在函数之外使用，所以我们把 initUserInfo 移入到了函数内
//   // 初始化用户的基本信息
//   function initUserInfo() {
//     $.ajax({
//       method: 'GET',
//       url: '/my/userinfo',
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('获取用户信息失败！')
//         }
//         form.val("formUserInfo", res.data)
//       }
//     })
//   }

//   // 重置表单的数据
//   $('#btnReset').on('click', function(e) {
//     // 阻止表单的默认重置行为
//     e.preventDefault()
//     initUserInfo()
//   })

//   // 监听表单的提交事件
//   $('.layui-form').on('submit', function (e) {
//     // 阻止表单的默认重置行为
//     e.preventDefault();
//     // 发起 ajax 数据请求
//     $.ajax({
//       method: 'POST',
//       url: '/my/userinfo',
//       data: $(this).serialize(),
//       success: function (res) {
//         if (res.status !== 0) {
//           return layer.msg('更新用户信息失败！')
//         }
//         layer.msg('更新用户信息成功！')
//         // 调用父页面中的方法，重新渲染用户的头像和用户的信息
//         // <iframe> 中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可
//         window.parent.getUserInfo()
//       }
//     })
//   })
// })