class onebooktobuycar{
    constructor(bookid){
        this.bookid = bookid
        this.toBuyCarBtn = $(".tobuycar")
        this.init()
    }
    init(){
        this.tobuycarUrl()
    }
    tobuycarUrl(){
        this.toBuyCarBtn.on("click",() => {
            let phone_Cookie = localStorage.getItem("phone_Cookie")

            if(phone_Cookie){
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
    
                            $.ajax({
                                type:"GET",
                                url:`http://46ee815878.qicp.vip/web_bookstore/add_ordercar?bookid=${this.bookid}&phone=${res.datas.phone}`,
                                data:{},
                                success:(res) => {
                                    if(res.status == 0){
                                        alert(res.msg)
                                        new verify_session().vSession()
                                    }else{
                                        alert(res.msg)
                                    }
                                }
                            })
                        }else if(res.status == 1){
                            localStorage.removeItem("phone_Cookie")
                            localStorage.removeItem("userName")

                            location.href = "../../register_login.html"
                        }
                    }
                })
            }else{
                location.href = "../../register_login.html"
            }
        })
    }
}