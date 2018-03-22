var prefix = 'http://jyj.zuoapp.la/';
$(function () {
    var schools;
    var news;
    $.ajax({
        type: "post",
        dataType: "JSON",
        async: true,
        url: prefix+'portal/form/getSchools',
        success: function (data) {
            schools = data.data;
            $.ajax({
                type: "get",
                dataType: "JSON",
                async: true,
                url: prefix+'/portal/index/getWXNews',
                success: function (data) {
                    news = data.data.data
                    var str = '';
                    for(var i=0;i<news.length;i++){
                        var fmtDates = fmtDate((news[i].create_time)*1000)
                        str += '<div class="w-dd ft14 new"><i class=" ">'+news[i].post_title+'</i><span class="flyr">'+fmtDates+'</span> </div>'
                    }
                    $('#context-box').html(str)
                    var strs = '';
                    console.log(schools)
                    for(var j = 0;j<schools.length;j++){
                            strs+= '<li class="t-box"> <div class="t"> <img src="http://jyj.zuoapp.la/upload/'+schools[j].school_logo+'" alt="" class="t-img"> <p class="">'+schools[j].school_name+'</p> </div> </li>'
                    }
                    $('#t').html(strs)
                    $('.new').click(function () {
                            var index = $('.new').index($(this))
                            window.location.href = 'http://jyj.zuoapp.la/portal/article/index/id/'+news[index].id+'.html'
                        }
                    )
                    $('.t').click(function () {
                            var i = $('.t').index($(this))
                            window.location.href = 'index.html?id='+schools[i].school_id
                        }
                    )
                },
                error:function (e) {
                    console.log(e)
                }
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
        $('.ipt').focus(function(){
            $('.msg').css('top','-0.4rem');
        });
        $('#queryId').click(function () {
            var context = $('#text').val()
            if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(context))){
                $('.msg').html('请输入正确的身份证号码');
                $('.msg').css('top','0');
            return;
            }
            window.location.href = 'update.html?idCard='+context
            // $.ajax({
            //     type: "get",
            //     dataType: "JSON",
            //     async: true,
            //     url: prefix+'portal/form/wxsearch',
            //     data:{
            //         searchword:context
            //     },
            //     success: function (data) {
            //         if(data.code==1){
            //             document.cookie.userInfo = data.data;
            //             window.location.href = 'update.html'
            //         }
            //     },
            //     error:function (e) {
            //         console.log(e)
            //     }
            // })
    })


})
function fmtDate(obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}