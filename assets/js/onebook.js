class init_thebook{
    constructor(){
        this.search = window.location.search
        this.init()
        this.bookList = []
    }
    async init(){
        await $.ajax({
            type:"GET",
            url:`http://46ee815878.qicp.vip/books${this.search}`,
            data:{},
            success:(res) => {
                if(res.status == 0){
                    this.bookList = res.datas
                    this.init_book()

                    new onebooktobuycar(res.datas[0].bookid)
                }else if(res.status == 1){
                    $(".bookbody").html(`<h1>${res.msg} 未找到当前页面！</h1>`)
                }
            }
        })
    }
    init_book(){
        let bookListStr = util_template(this.bookList,"booktl")
        
        $(".bookbody").html(bookListStr)
    }
}

$(function(){
    new init_thebook()
})