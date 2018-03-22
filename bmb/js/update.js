var prefix = 'http://jyj.zuoapp.la/';
$(function () {
    var arr = window.location.href.split('?idCard=')
    var app = new Vue({
        el: '#app',
        data: {
            schools:'',
            code:'',
            WXUnits:'',
            WXPosts:'',
            userInfo:{}
        }
    })

    $.ajax({
        type: "get",
        dataType: "JSON",
        async: true,
        url: prefix+'portal/form/wxsearch',
        data:{
            searchword:arr[1]
        },
        success: function (data) {
            if(data.code==1){
                var info = data.data
                info.exhibition = prefix+info.user_photo
                app.userInfo = info
                console.log(data.data)
                sId = data.data.school_id
                console.log(data)
            }
            init();
        },
        error:function (e) {
            console.log(e)
        }
    })

    $('[type="date"]').change(function(){
       var index = $('[type="date"]').index($(this))
        $('.time').eq(index).val(changeTime($(this).val()))
    })
     function changeTime(time){
         var listTime = time.split("-")
         return listTime[0]+'年'+listTime[1]+"月"+listTime[2]+"日"
    }
    var code ;
    var schools;
    var WXUnits;
    var WXPosts;
    var sId ;
    var sIndex = 0;
    var uIndex = 0;
    var pIndex = 0;
    $('#select_k1').change(function () {
        sIndex = $(this).eq(0)[0].selectedIndex;
        uIndex = 0;
        pIndex = 0;
        $.ajax({
            type: "post",
            dataType: "JSON",
            async: true,
            url: prefix+'portal/form/getWXUnits?school_id='+schools[sIndex].school_id,
            success: function (data) {
                WXUnits = data.data;
                $.ajax({
                    type: "get",
                    dataType: "JSON",
                    async: true,
                    url: prefix+'portal/form/getWXPosts?school_id='+schools[sIndex].school_id+'&'+'unit='+WXUnits[uIndex].post_desc,
                    success: function (data) {
                        WXPosts = data.data;
                        $('#select_k2')[0][0].selected=true
                        $('#select_k3')[0][0].selected=true
                        $('#school_id').val(schools[sIndex].school_id);
                        $('#apply_num').val(WXPosts[pIndex].post_num);
                        app.WXUnits = WXUnits
                        app.WXPosts = WXPosts
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
    })
    $('#select_k2').change(function () {
        uIndex = $(this).eq(0)[0].selectedIndex;
        pIndex = 0;
        $.ajax({
            type: "get",
            dataType: "JSON",
            async: true,
            url: prefix+'portal/form/getWXPosts?school_id='+schools[sIndex].school_id+'&'+'unit='+WXUnits[uIndex].post_desc,
            success: function (data) {
                WXPosts = data.data;
                app.WXPosts = WXPosts
                setTimeout(function () {
                    $('#select_k3')[0][0].selected=true
                    $('#apply_num').val(WXPosts[pIndex].post_num);
                },0)
            },
            error:function (e) {
                console.log(e)
            }
        })

    })
    $('#select_k3').change(function () {
        pIndex = $(this).eq(0)[0].selectedIndex;
        $('#apply_num').val(WXPosts[pIndex].post_num);
    })

    function init() {
                $.ajax({
                    type: "get",
                    dataType: "JSON",
                    async: true,
                    url: prefix+'portal/form/getSchools',
                    success: function (data) {
                        schools = data.data
                        for(var z = 0;z<schools.length;z++){
                            if(schools[z].school_name ==app.userInfo.apply_center){
                                   sIndex = z;
                                    break;
                            }
                        }
                        $.ajax({
                            type: "post",
                            dataType: "JSON",
                            async: true,
                            url: prefix+'portal/form/getWXUnits?school_id='+sId,
                            success: function (data) {
                                WXUnits = data.data;
                                for(var i=0;i<WXUnits.length;i++){
                                    if(WXUnits[i].post_desc == app.userInfo.apply_unit ){
                                              console.log(WXUnits[i])
                                             uIndex = i ;
                                                break;
                                    }
                                }
                                $.ajax({
                                    type: "get",
                                    dataType: "JSON",
                                    async: true,
                                    url: prefix+'portal/form/getWXPosts?school_id='+sId+'&'+'unit='+WXUnits[uIndex].post_desc,
                                    success: function (data) {
                                            WXPosts = data.data;
                                            for(var j=0;j<WXPosts.length;j++){
                                                if(WXPosts[j].post_name == app.userInfo.apply_post ){
                                                    pIndex = j;
                                                    break;
                                                }
                                            }
                                            $('#school_id').val(sId);
                                            $('#apply_num').val(app.userInfo.apply_num);
                                            app.schools = schools
                                            app.WXUnits = WXUnits
                                            app.WXPosts = WXPosts
                                            console.log($('#select_k3'))
                                            setTimeout(function () {
                                                $('#select_k1')[0][sIndex].selected=true
                                                $('#select_k2')[0][uIndex].selected=true
                                                $('#select_k3')[0][pIndex].selected=true
                                            },0)
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
                    },
                    error:function (e) {
                        console.log(e)
                    }
                })

    }


    $('#submit').click(function () {
        if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test($('#idCard').val()))){
            $('.msg').html('请输入正确的身份证号码');
            $('.msg').css('top','0');
            $('html,body').animate({ scrollTop: $('#idCard').offset().top-60 }, 500);
            return;
        }
        var bl = true;
        $(".ipt").each(function (index) {
            if($(this).val()==null||$(this).val()==''){
                $('.msg').html($('.check').eq(index).html()+"有误");
                $('html,body').animate({ scrollTop: $('.check').eq(index).offset().top-60 }, 500);
                bl = false;
                return false;
            }
        })
        if(!bl){
            $('.msg').css('top','0');
            return;
        }
        console.log($('#idCard').val())

        console.log($('#form').serialize())
        $.ajax({
            method:'post',
            url:prefix+'portal/form/edit_wxPost',
            data:$('#form').serialize(),
            success:function (e) {
                $(".succ").show();
                setTimeout(function () {
                   // window.location.href = 'query.html';S
                },10000)
            }
        })


      //  $('#form').submit();
    })

    $('.ipt').focus(function(){
        $('.msg').css('top','-0.4rem');
    });

    $('#agreement').click(function () {
        $('.agreement').css('display','block');
        $('.mask').css('display','block');
    })

    $('.confirm').click(function () {
        $('.agreement').css('display','none');
        $('.mask').css('display','none');
    })



    $('input:radio').click(function () {
        $('input:radio').each(function () {
            if($(this)[0].checked){
                $(this).parent().addClass('success')
            }else{
                $(this).parent().removeClass('success')
            }
        })
    })
    $('input:radio').each(function () {
        if($(this)[0].checked){
            $(this).parent().addClass('success')
        }else{
            $(this).parent().removeClass('success')
        }
    })
        $("input[type='file']").change(function(evt){
           var files = evt.target.files;
            var f = files[0]
            $('.msg').css('top','-0.4rem');
            var formData = new FormData()
            formData.append('file',f)
            $.ajax({
                type: 'POST',
                url: prefix+'portal/form/avatarUpload',
                data: formData,
                dataType: 'JSON',
                processData: false,
                contentType: false,
                cache: false,
                async: true,
                success: function(data) {
                     $('#imgUrl').val("/upload/"+data.data.file);
                }
            })
            // $.ajaxFileUpload({
            //     url: "http://jyj.zuoapp.la/portal/form/avatarUpload",
            //     secureuri: false,
            //     fileElementId: "imgfile",
            //     dataType: 'json',
            //     data: {},
            //     success: function (data, status) {
            //         if (data.code == 1) {
            //             console.log(data)
            //         }
            //     }
            // })
            if(f){
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {
                       $(".tx").attr("src",e.target.result);  //预览图片的位置
                    };
                })(f);
                reader.readAsDataURL(f);
            }
        });
})