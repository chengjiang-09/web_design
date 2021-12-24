let phone_Cookie = localStorage.getItem("phone_Cookie")
let buycarstr = ""
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

                $(".userNamePhone").html(res.datas.username)

                $.ajax({
                    type: "GET",
                    url: "http://46ee815878.qicp.vip/web_bookstore/init_ordercar",
                    data: {
                        phone: res.datas.phone
                    },
                    success: (resOrderCar) => {
                        if (resOrderCar.datas) {
                            $(".ordercarnum").html(resOrderCar.datas.length)
                            new init_myorder(res.datas.phone)
                        }
                    }
                })
            } else if (res.status == 1) {
                localStorage.removeItem("phone_Cookie")
                localStorage.removeItem("userName")

                location.href = "./register_login.html"
            }
        }
    })
} else {
    location.href = "./register_login.html"
}

class init_myorder{
    constructor(phone){
        this.phone = phone
        this.init()
    }
    init(){
        this.initmyorder()
    }
    initmyorder(){
        $.ajax({
            type:"GET",
            url:"http://46ee815878.qicp.vip/web_bookstore/init_orderform",
            data:{phone:this.phone},
            success:(res) => {
                if(res.status === 0){
                    let myorderStr = util_template(res.datas,"ordertl")

                    $(".list").html(myorderStr)
                }
            }
        })
    }
}