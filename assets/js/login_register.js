class register{
    constructor(formId){
        this.register = $(`#${formId}`)
        this.inputPhone = this.register.find("#inputPhone")
        this.inputPassword1 = this.register.find("#inputPassword1")
        this.inputPassword2 = this.register.find("#inputPassword2")
        this.init()
    }
    init(){
        this.register_submit()
        this.verify_data()
    }
    register_submit(){
        this.register.on("submit",function(e){
            e.preventDefault()
        })
    }
    verify_data(){
        this.inputPhone.on("blur",function(){

            let str = $(this).val()

            if(str.trim() === ""){
                $(this).parent().siblings(".warning").children("p").html("手机号输入错误！")
            }else{
                let re = /^1[3-9]\d{9}$/

                if(str.match(re)){
                    $(this).parent().siblings(".warning").children("p").html("")
                }else{
                    $(this).parent().siblings(".warning").children("p").html("手机号输入错误！")
                }
            }
        })

        
    }
}
$(function(){
    new register("registerForm")
})