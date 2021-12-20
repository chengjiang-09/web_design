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