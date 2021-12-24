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
                            new initOneOrder(res.datas.phone,res.datas.username)
                        }
                    }
                })
            } else if (res.status == 1) {
                localStorage.removeItem("phone_Cookie")
                localStorage.removeItem("userName")

                location.href = "../../register_login.html"
            }
        }
    })
} else {
    location.href = "../../register_login.html"
}

class initOneOrder{
    constructor(phone,username){
        this.phone = phone
        this.username = username
        this.orderCarList = JSON.parse(localStorage.getItem("order"))
        this.payBtn = $(".pay")
        this.paylist = {}
        this.init()
    }
    init(){
        this.initoneorder()
        this.pay()
    }
    pay(){
        this.payBtn.on("click",() => {
            let toplace = $(".toplace").val()
            let touser = $(".touser").val()

            if(toplace.length > 0 && touser.length > 0){
                this.paylist.toplace = toplace
                this.paylist.touser = touser

                $.ajax({
                    type:"POST",
                    url:"http://46ee815878.qicp.vip/web_bookstore/payment",
                    data:this.paylist,
                    success:(res) => {
                        if(res.status == 0){
                            alert(res.msg)
                            localStorage.removeItem("order")
                            location.href = "../../myorder.html"
                        }
                    }
                })
            }
        })
    }
    initoneorder(){
        let nowtime = this.formatetime(new Date())

        $(".orderid").html(`${this.phone}${nowtime[0]}`)
        $(".inordertime").html(`${nowtime[1]}`)
        $(".inorderuser").html(`${this.username}`)
        $(".allprise").html(`${this.orderCarList.allbookprice}`)
        $(".allnum").html(`${this.orderCarList.allbooknum}`)
        $(".userphone").html(`${this.phone}`)

        this.paylist = {
            orderid:`${this.phone}${nowtime[0]}`,
            ordertime:`${nowtime[1]}`,
            orderuser:`${this.username}`,
            totalprice:`${this.orderCarList.allbookprice}`,
            orderstatus:0,
            totalnum:`${this.orderCarList.allbooknum}`,
            orderphone:`${this.phone}`,
        }
    }
    fultime(n){
        return n>9 ? n : `0${n}`
    }
    formatetime(nowtime){
        let Y = nowtime.getFullYear()
        let M = this.fultime(nowtime.getMonth() + 1)
        let d = this.fultime(nowtime.getDay())

        let h = this.fultime(nowtime.getHours())
        let m = this.fultime(nowtime.getMinutes())
        let s = this.fultime(nowtime.getSeconds())

        return [`${Y}${M}${d}${h}${m}${s}`,`${Y}-${M}-${d}`]
    }
}

