//当表单发生提交行为的时候
$('#userForm').on('submit', function() {
    // alert(123);
    //获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    //向服务器端发送添加用户的请求
    $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function() {
                //刷新页面
                location.reload();
            },
            error: function() {
                alert('用户添加失败');
            }
        })
        //console.log(formData);
        //阻止表单的默认提交行为
    return false;
});
//实现图片上传功能
//当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function() {
    //this.files[0]
    //用户选择到的文件
    //console.log(this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData: false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            //  console.log(response);
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
});
//向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        //  console.log(response);
        //使用模版引擎将数据和html字符串进行拼接
        var html = template('userTpl', {
                data: response
            })
            // console.log(html);
            //将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
});

//通过事件委托的方式为编辑按钮添加点击事件
//第二个参数 编辑按钮
//利用事件冒泡机制
$('#userBox').on('click', '.edit', function() {
    //获取被点击用户的id值
    var id = $(this).attr('data-id');
    //alert(id);
    $.ajax({
        type: 'get',
        //restful风格的请求地址
        url: '/users/' + id,
        success: function(response) {
            //  console.log(response);
            var html = template('modifyTpl', response);
            //  console.log(html);
            $('#modifyBox').html(html);
        }
    })
});
//为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();
    //获取要修改的用户的id值
    var id = $(this).attr('data-id');
    // console.log(formData);
    //发送请求 修改用户信息
    $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function(response) {
                // console.log(response);
                //重新加载页面
                location.reload();
            }
        })
        //阻止表单默认提交
    return false;
});