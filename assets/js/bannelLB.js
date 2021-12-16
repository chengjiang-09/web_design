window.addEventListener('load', function() {
    var bannerBox = document.querySelector('.bannerLB');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');

    var bannerList = document.querySelector('.bannerList');

    var ul = bannerBox.querySelector('ul')

    var bannerwidth = bannerBox.offsetWidth;

    bannerBox.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })

    bannerBox.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        },3000)
    })

    var num = 0;
    var num2 = 0;

    console.log(bannerBox.children[0].children.length);

    for(var i = 0; i < bannerBox.children[0].children.length; i++){

        var li = document.createElement('li');

        li.setAttribute('index',i);

        bannerList.appendChild(li);

        li.addEventListener('click', function() {

            for(var i = 0; i < bannerList.children.length; i++){
                bannerList.children[i].style.color = 'rgba(255, 255, 255, 0.5)';
            }

            this.style.color = 'white';

            num = this.getAttribute('index');
            num2 = this.getAttribute('index');

            console.log(num);

            console.log(bannerwidth);
            console.log(this.getAttribute('index'));

            animate(ul, -bannerwidth * this.getAttribute('index'));

        })

    }
    bannerList.children[0].style.color = 'white';

    var cpyul =  ul.children[0].cloneNode(true);

    ul.appendChild(cpyul);
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if(flag){
            flag = false;
            if(num == ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }
            num ++;
            animate(ul, -bannerwidth * num, function(){
                flag = true;
            });
    
            num2 ++;
    
            if(num2 == ul.children.length -1){
                num2 = 0;
            }
    
            bannerlistD();
        }
    })

    arrow_l.addEventListener('click', function () {
        if(flag){
            flag = false;
            if(num == 0){
                num = ul.children.length - 1;
                ul.style.left = -num * bannerwidth + 'px';
            }
            num --;
            animate(ul, -bannerwidth * num, function(){
                flag = true;
            });
    
            num2 --;
    
            if(num2 == -1){
                num2 = ul.children.length - 2;
            }
    
            bannerlistD();
        }
    })

    function bannerlistD() {
        for(var i = 0; i < bannerList.children.length; i++){
            bannerList.children[i].style.color = 'rgba(255, 255, 255, 0.5)';
        }

        bannerList.children[num2].style.color = 'white';
    }

    var timer = setInterval(function () {
        arrow_r.click();
    },3000)

})