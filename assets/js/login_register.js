class register{
    constructor(formId){
        this.register = $(`#${formId}`)
        this.inputPhone = this.register.find("#inputPhone")
        this.inputPassword1 = this.register.find("#inputPassword1")
        this.inputPassword2 = this.register.find("#inputPassword2")
        this.init()
    }
    init(){
        this.register_submit() //注册提交
        this.verify_data()  //表单验证
    }
    register_submit(){
        this.register.on("submit",(e) => {
            e.preventDefault()

            let inputs = this.register.find("input")
            let flag = true

            inputs.each((index,dom) => {
                $(dom).val() === "" ? flag = false : flag = true
            })

            if(flag){
                let phone = this.inputPhone.val()
                let password1 = this.inputPassword1.val()
                let password2 = this.inputPassword2.val()

                $.ajax({
                    type:"POST",
                    url:"http://46ee815878.qicp.vip/web_bookstore/user_register",
                    data:{
                        phone:phone,
                        password1:password1,
                        password2:password2,
                    },
                    success:(res) => {
                        if(res.status === 0){
                            localStorage.setItem("phone_Cookie",res.datas.phone)
                            localStorage.setItem("userName",res.datas.username)
                            location.href = "./index.html"
                        }else if(res.status === 1){
                            alert(res.msg)
                        }
                    }
                })
            }
        })
    }
    verify_data(){
        //手机号验证
        this.inputPhone.on("blur",function(){

            let str = $(this).val()

            if(str.trim() === ""){
                $(this).parent().siblings(".warning").children("p").html("手机号输入错误！")
            }else{
                let re = /^1[3-9]\d{9}$/

                if(str.match(re)){
                    $(this).parent().siblings(".warning").children("p").html("")

                    $.ajax({
                        type:"POST",
                        url:"http://46ee815878.qicp.vip/api/verification_phone",
                        data:{
                            phone:str
                        },
                        success:(res) => {
                            if(res.status === 0){
                                $(this).parent().siblings(".warning").children("p").html("")
                            }else if(res.status === 1){
                                $(this).parent().siblings(".warning").children("p").html(res.msg)
                            }
                        }
                    })


                }else{
                    $(this).parent().siblings(".warning").children("p").html("手机号输入错误！")
                }
            }
        })

        //密码验证
        this.inputPassword1.on("blur",function(){

            let str = $(this).val()

            if(str.trim() === ""){

                $(this).parent().siblings(".warning").children("p").html("密码格式错误！")

            }else{
                let re = /^[0-9a-zA-Z_-]{6,20}$/

                if(str.match(re)){
                    $(this).parent().siblings(".warning").children("p").html("")
                }else{
                    $(this).parent().siblings(".warning").children("p").html("密码格式错误！")
                }
            }

        })
        
        //二次密码验证
        this.inputPassword2.on("blur",() => {

            let str = this.inputPassword2.val()

            if(str.trim() === ""){

                this.inputPassword2.parent().siblings(".warning").children("p").html("密码输入不一致！")

            }else{
                
                if(str === this.inputPassword1.val()){
                    this.inputPassword2.parent().siblings(".warning").children("p").html("")
                }else{
                    this.inputPassword2.parent().siblings(".warning").children("p").html("密码输入不一致！")
                }
            }

        })
    }
}
$(function(){
    new register("registerForm")
})