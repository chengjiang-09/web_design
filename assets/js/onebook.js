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
                }else if(res.status == 1){
                    console.log(res.msg);
                }
            }
        })

        this.init_book()
    }
    init_book(){
        let bookListStr = util_template(this.bookList,"booktl")
        
        $(".bookbody").html(bookListStr)
    }
}
$(function(){
    new init_thebook()
})