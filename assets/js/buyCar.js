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

                            buycarstr = util_template(resOrderCar.datas, "oneBuyCar")
                            $(".list").html(buycarstr)
                            new control_checkbox()
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

let that = null
class control_checkbox {
    constructor() {
        this.oneBuyBox = $(".one")
        this.allFather = $(".container")
        this.delonebuycar = $(".delonebuycar")
        this.buycarlist = $(".list")
        this.paybtn = $(".pay")

        this.allbooknum = 0
        this.allbookprice = 0
        this.checkbooklist = []
        this.listStr = ""
        that = this
        this.init()
    }
    init() {
        this.all_to_one()
        this.one_to_all()
        this.onebuyNumPrice()
        this.allbuyNumPrice()
        this.delbuycar()
        this.payment()
    }
    payment(){
        this.paybtn.on("click",function(){
            localStorage.setItem("order",that.listStr)

            if(that.checkbooklist.length !== 0){
                location.href = "./assets/views/payorder.html"
            }
        })
    }
    delbuycar() {
        this.buycarlist.on("click", ".delonebuycar", function (e) {
            e.preventDefault()

            let url = this.getAttribute("href")
            let phone = localStorage.getItem("phone_Cookie")


            if(confirm("是否移除当前商品？")){
                $.ajax({
                    type: "GET",
                    url: url + `&phone=${phone}`,
                    data: {},
                    success: (res) => {
                        location.reload()
                    }
                })
            }


            // $.ajax({
            //     type: "GET",
            //     url: url + `&phone=${phone}`,
            //     data: {},
            //     success: (res) => {
            //         location.reload()
            //     }
            // })
        })
    }
    allbuyNumPrice() {
        this.checkbooklist = []
        this.allbooknum = 0
        this.allbookprice = 0
        this.oneBuyBox.each(function (index, dom) {
            if (this.querySelector(".checkboxone").checked) {
                let oneprice = parseFloat($(`#${dom.id}`).find(".oneprice").html())
                let inputtext = $(`#${dom.id}`).find(".num")

                that.checkbooklist.push({ bookid: dom.id, bookbuynum: inputtext[0].value, bookbuyprice: oneprice * inputtext[0].value })

                that.allbooknum += parseInt(inputtext[0].value)
                that.allbookprice += oneprice * inputtext[0].value
            }

        })

        $(".checkedbooknum").html(that.allbooknum)
        $(".checkedbookprice").html(that.allbookprice)

        this.listStr = JSON.stringify({allbooknum:this.allbooknum,allbookprice:this.allbookprice,checkbooklist:this.checkbooklist})
    }
    onebuyNumPrice() {

        this.allbuyNumPrice()

        this.oneBuyBox.each(function (index, dom) {
            let oneprice = parseFloat($(`#${dom.id}`).find(".oneprice").html())
            let allprice = $(`#${dom.id}`).find(".allprice")
            let inputtext = $(`#${dom.id}`).find(".num")

            $(`#${dom.id}`).find(".glyphicon-chevron-up").on("click", () => {
                inputtext[0].value++
                allprice.html(oneprice * inputtext[0].value)

                that.allbuyNumPrice()
            })

            $(`#${dom.id}`).find(".glyphicon-chevron-down").on("click", () => {
                inputtext[0].value--
                if (inputtext.val() <= 1) {
                    inputtext.val(1)
                }
                allprice.html(oneprice * inputtext[0].value)
                that.allbuyNumPrice()
            })

            $(`#${dom.id}`).find(".num").on("change", function () {
                if (isNaN(this.value) || this.value <= 1) {
                    this.value = 1
                }
                allprice.html(oneprice * inputtext[0].value)
                that.allbuyNumPrice()
            })

        })
    }

    all_to_one() {
        this.allFather.on("click", ".all", function () {
            let checkBoxAll = $(".checkboxone")
            let all = $(".all")
            checkBoxAll.each((index, dom) => {
                this.checked ? dom.checked = true : dom.checked = false
            })
            all.each((index, dom) => {
                dom.checked = this.checked
            })
            that.allbuyNumPrice()
        })
    }
    one_to_all() {
        this.oneBuyBox.on("click", ".checkboxone", function () {
            let flag = true
            let checkBoxAll = $(".checkboxone")
            let all = $(".all")

            checkBoxAll.each((index, dom) => {
                !dom.checked ? flag = false : flag
            })

            if (flag) {
                all.each((index, dom) => {
                    dom.checked = true
                })
            } else {
                all.each((index, dom) => {
                    dom.checked = false
                })
            }
            that.allbuyNumPrice()
        })
    }
}



