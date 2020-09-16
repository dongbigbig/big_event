$(function() {


    var layer = layui.layer
    var form = layui.form

    iniyCate()

    // 初始化富文本编辑器 
    initEditor()

    function iniyCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
    // 1. 初始化图片裁剪器  
    var $image = $('#image')  
        // 2. 裁剪选项  
    var options = {  
            aspectRatio: 400 / 280,
             preview: '.img-preview'
        }  
        // 3. 初始化裁剪区域  
    $image.cropper(options)

    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    })


    $('#coverFile').on('change', function(e) {
        var files = e.target.files;
        if (files.length === 0) {
            return
        }

        var newImgURL = URL.createObjectURL(files[0]);

        $image 
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)    
    })

    var art_state = '已发布'

    $("#btnSave2").on('click', function() {
        art_state = '草稿'
    })

    $("#form-pub").on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state)

        $image
            .cropper('getCroppedCanvas', {  
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { 
                fd.append('cover_img', blob)
                publishArticle(fd)
            })  
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = '../../../article/art_list.html'
            }
        })
    }
})




// $(function() {
//   var layer = layui.layer
//   var form = layui.form

//   initCate()

//   // 初始化富文本编辑器
//   initEditor()
//   // 定义加载文章分类的方法
//   function initCate() {
//     $.ajax({
//       method: 'GET',
//       url: '/my/article/cates',
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('初始化文章分类失败！')
//         }
//         // 调用模板引擎，渲染分类的下拉菜单
//         var htmlStr = template('tpl-cate', res)
//         $('[name=cate_id]').html(htmlStr)
//         // 一定要记得调用 form.render() 方法
//         form.render()
//       }
//     })
//   }


//    // 1. 初始化图片裁剪器
//    var $image = $('#image')

//    // 2. 裁剪选项
//    var options = {
//      aspectRatio: 400 / 280,
//      preview: '.img-preview'
//    }

//    // 3. 初始化裁剪区域
//    $image.cropper(options);

//    //  选择封面按钮的点击事件
//    $('#btnChooseImage').on('click', function() {
//     $('#coverFile').click()
//   })

//   // 监听 coverFile 的 change 事件，获取用户选择的文件列表
//   $('#coverFile').on('change', function (e) {
//     // 获取到文件的列表数组
//     var files = e.target.files
//     // 判断用户是否选择了文件
//     if (files.length === 0) {
//       return
//     }
//     // 根据文件，创建对应的 URL 地址
//     var newImgURL = URL.createObjectURL(files[0])
//     // 为裁剪区域重新设置图片
//     $image
//       .cropper('destroy') // 销毁旧的裁剪区域
//       .attr('src', newImgURL) // 重新设置图片路径
//       .cropper(options) // 重新初始化裁剪区域
//   })

//   // 标记位
//   var artState = '已发布'
//   $('#btnSave2').on('click', function () {
//     artState = '草稿'
//   })

//   // 监听表单的提交按钮事件
//   $('#form-pub').on('submit', function (e) {
//     // 1. 阻止表单的默认提交行为
//     e.preventDefault();
//     // 2.生成 formData 对象，用来承载图片文件
//     var fd = new FormData($(this)[0]);
//     // 3.将发布的状态保存到 formData 中
//     fd.append('state', artState);
//     // 4.将剪裁后的图片放入到 formDta
//     $image
//       .cropper('getCroppedCanvas', {
//         // 创建画布
//         width:　400,
//         height: 400
//       }).toBlob(function (blob) {
//         // 将 Canvas 画布上的内容，转化为文件对象
//         // 得到文件对象后，进行后续的操作
//         // 5. 将文件对象，存储到 fd 中
//         fd.append('cover_img', blob)
//         // 6. 发起 ajax 数据请求
//         publishArticle(fd)
//       })
//   })

//   function publishArticle(fd) {
//     $.ajax({
//       method: 'POST',
//       url: '/my/article/add',
//       data: fd,
//       // 注意：如果向服务器提交的是 FormData 格式的数据，
//       // 必须添加以下两个配置项
//       contentType: false,
//       processData: false,
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('发布文章失败！')
//         }
//         layer.msg('发布文章成功！')
//         // 切换 nav 的显示
//         window.parent.changeNav('art-list', 'art-pub')
//         // 发布文章成功后，跳转到文章列表页面
//         location.href = '/article/art_list.html'
//       }
//     })
// }
// })