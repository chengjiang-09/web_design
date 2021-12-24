$(function(){
    let bookname = ""
    if(location.search.split("?")[1]){
        bookname = decodeURI(location.search.split("?")[1].toString())
    }

    $("#inputsearchbtn").on("click",function(){
        $.ajax({
            type:"GET",
            url:"http://46ee815878.qicp.vip/web_bookstore/searchBooks",
            data:{bookname:$("#inputsearch").val()},
            success:(res) => {
                if(res.status == 0){
                    let str = util_template(res.datas,"oneBook")

                    $(".bookBox").html(str)

                    new tobuycar()
                }else{
                    $(".bookBox").html("<h1>未查询到此书籍！</h1>")
                }
            }
        })
    })
    
    if(bookname){
        $("#inputsearch").val(bookname)
        $("#inputsearchbtn").click()
    }else{
        $("#inputsearch").val("")
        $("#inputsearchbtn").click()
    }
})