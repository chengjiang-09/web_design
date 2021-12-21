class init_newbook{
    constructor(){
        this.bookLeft = $(".navLeft")
        this.bookRight = $(".allbook")
        this.init()
    }
    async init(){
        await $.ajax({
            type:"GET",
            url:"http://46ee815878.qicp.vip/web_bookstore/init_commonbook",
            data:{},
            success:(res) => {
                if(res.status == 0){
                    console.log(res.datas);
                    this.bookList = res.datas
                }else if(res.status == 1){
                    console.log("出错啦！");
                }
            }
        })


        this.init_bookAside()
        this.init_book()
    }
    init_bookAside(){
        let bookAsideStr = util_template(this.bookList,"bookAside")
        this.bookLeft.find("ul").html(bookAsideStr)
    }
    init_book(){
        let bookStr = util_template(this.bookList,"oneBook")
        this.bookRight.find(".bookBox").html(bookStr)
    }
}

$(function() {
    new init_newbook()
})