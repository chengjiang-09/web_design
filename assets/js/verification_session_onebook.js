class verify_session {
    constructor() {
        this.username = $(".userNamePhone")
        this.init()
    }
    init() {
        this.vSession()
    }
    vSession() {
        let phone_Cookie = localStorage.getItem("phone_Cookie")

        if (phone_Cookie) {
            $.ajax({
                type: "POST",
                url: "http://46ee815878.qicp.vip/api/verification_session",
                data: {
                    phone_Cookie: phone_Cookie
                },
                success: (res) => {
                    if (res.status == 0) {
                        localStorage.setItem("phone_Cookie", res.datas.phone)
                        localStorage.setItem("userName", res.datas.username)

                        this.username.html(res.datas.username)
                        this.username.parent().prop("href","./userCenter.html").siblings(".logout").html("<a href='./commonbooks.html'>注销</a>")
                        
                        $(".logout").find("a").prop("href",`http://46ee815878.qicp.vip/web_bookstore/user_logout?phone=${res.datas.phone}`)

                        $(".logout").on("click","a",function(e){
                            e.preventDefault()

                            let url = this.href

                            $.ajax({
                                type:"GET",
                                url:url,
                                data:{},
                                success:(res) => {
                                    if(res.status == 0){
                                        alert("账户已注销！")
                                        location.reload()
                                    }else{
                                        alert("账户注销失败！")
                                    }
                                }
                            })
                        })

                        $.ajax({
                            type:"GET",
                            url:"http://46ee815878.qicp.vip/web_bookstore/init_ordercar",
                            data:{
                                phone: res.datas.phone
                            },
                            success:(resOrderCar) => {
                                if(resOrderCar.datas){
                                    $(".ordercarnum").html(resOrderCar.datas.length)
                                }
                            }
                        })


                    }else if(res.status == 1){
                        localStorage.removeItem("phone_Cookie")
                        localStorage.removeItem("userName")
                    }
                }
            })
        }
    }
}

$(function(){
    new verify_session()
})