class login{
    constructor(formID){
        this.login = $(`#${formID}`)
        this.inputPhone = this.login.find("#inputPhone")
        this.inputPassword = this.login.find("#inputPassword")
        this.init()
    }
    init(){
        this.login_submit()
    }
    login_submit(){
        this.login.on("submit",(e) => {
            e.preventDefault()

            let inputs = this.login.find("input")
            let flag = true

            inputs.each((index,dom) => {
                $(dom).val() === "" ? flag = false : flag = true
            })

            if(flag){
                let phone = this.inputPhone.val()
                let password = this.inputPassword.val()

                $.ajax({
                    type:"POST",
                    url:"http://46ee815878.qicp.vip/web_bookstore/user_login",
                    data:{
                        phone:phone,
                        password:password
                    },
                    success:(res) => {
                        if(res.status === 0){
                            localStorage.setItem("phone_Cookie",res.datas.phone)
                            location.href = "./index.html"
                        }else if(res.status === 1){
                            alert(res.msg)
                        }
                    }
                })
            }
        })
    }
}
$(function(){
    new login("loginForm")
})