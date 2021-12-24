$(function(){
    $(".glyphicon-search").on("click",function(){

        let searchStr = $("#inputsearch").val()

        location.href = "./searchBooks.html"
        console.log(searchStr);
        if(searchStr.length > 0){
            location.href = `./searchBooks.html?${searchStr}`
        }else{
            location.href = "./searchBooks.html"
        }
    })
})