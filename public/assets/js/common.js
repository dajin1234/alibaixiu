$('#logout').on('click', function() {
    // console.log(1111);
    var isConfirm = confirm('您真的要退出吗');
    if (isConfirm) {
        //   alert('用户点击了确认按钮')
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        })
    }
});