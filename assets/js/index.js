class init_index{
    constructor(){
        this.bookAside = $(".bookAside")
        this.init()
        this.bookList = []
    }
    async init(){
        await $.ajax({
            type:"GET",
            url:"http://46ee815878.qicp.vip/web_bookstore/init_searchbook",
            data:{},
            success:(res) => {
                if(res.status == 0){
                    this.bookList = res.datas
                }else if(res.status == 1){
                    console.log("出错啦！");
                }
            }
        })
        
        this.init_bookAside()
        this.init_bookBox()
        new tobuycar()
    }
    init_bookAside(){
        let bookAsideStr = util_template(this.bookList,"bookAside")
        this.bookAside.find("ul").html(bookAsideStr)
    }
    init_bookBox(){
        let bookList = util_template(this.bookList,"oneBook",true)

        $(".commonBook").find(".bookBox").html(bookList[2])
        $(".newBook").find(".bookBox").html(bookList[0])
        $(".activeBook").find(".bookBox").html(bookList[1])
    }
}

$(function(){
    new init_index()
})
