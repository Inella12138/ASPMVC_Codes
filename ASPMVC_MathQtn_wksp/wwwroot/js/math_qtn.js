window.onload = function () {
    let x_elem = document.getElementById("x");
    let y_elem = document.getElementById("y");
    let z_elem = document.getElementById("z");
    let msg_elem = document.getElementById("msg");
    let z_val, y_val;//定义变量

    get_qtn();

    x.addEventListener("keypress", function (event) {    //为x添加一个监听器,检测键被按下
    //x_elem.addEventListener("keypress", function (event) 之前犯错误时将监听器赋给了x_elem
        if (event.keycode === 13 || event.key === "Enter") {   //检测是否为enter键，enter的键码为13，两个表达式起到作用相同
            //=== 表示严格相等（例如 == 可以将char转换为int和数字比较，但是 === 不行）
            if (CheckValidNum(x_elem.value)) { //检测输入是否合法
                let x_val = parseInt(x_elem.value); //获取x的值
                if (x_val + y_val === z_val) {      //y_val和z_val均是全局变量，所以能调用值
                    msg_elem.innerHTML = "Correct! Fetching new question...";//改变msg在HTML的值
                    msg_elem.classList.remove("incorrect");
                    msg_elem.classList.add("correct");//改变msg的class来改变颜色属性
                    setTimeout(function () {
                    //延时执行函数setTimeout(function(),time)
                        x_elem.value = "";
                        msg_elem.innerHTML = "";
                        get_qtn();
                    }, 2000);
                }
                else {
                    msg_elem.innerHTML = "Incorrect! Try again.";
                    msg_elem.classList.remove("correct");
                    msg_elem.classList.add("incorrect");
                }
            }
        }
    });

    function get_qtn(){
        let xhr = new XMLHttpRequest();         //初始化一个请求
        xhr.open("GET", "/Math/RandomGene");    //设置请求发送到的位置
        xhr.onreadystatechange = function () {  //当请求状态改变时执行function(){}中的语句
            if (xhr.readyState === 4 && xhr.status === 200) {
                //xhr.readystate === 4，表示请求执行完成，readystate详情见下文注释
                //xhr.status === 200，表示状态代码200，GET
                let qtn = JSON.parse(xhr.responseText);//定义变量接受RandomGene()方法返回的JSON数据
                y_val = parseInt(qtn.y);        //这两个变量在最开始已经声明，如果在这里才声明，会导致这两个变量成为
                z_val = parseInt(qtn.z);        //local变量，那么在“主程序”中无法调用这两个变量的值

                y_elem.innerHTML = y_val;       //innerHTML直接修改y,z这两个div的值
                z_elem.innerHTML = z_val;
            }
        }
        xhr.send();
    }
    //返回主程序
    /*0 (UNSENT): 请求未初始化。open 方法还未被调用。
    1(OPENED): 请求已经初始化，但是 send 方法还未被调用。
    2(HEADERS_RECEIVED): send 方法已经被调用，且头部和状态已经可获得。
    3(LOADING): 下载中；responseText 属性已经包含部分数据。
    4(DONE): 整个请求过程已经完成*/
    function CheckValidNum(input) {
        if (isNaN(input)) { //isNaN(text)，isNaN = is Not a Number，text不是数字时返回true
            alert("Please enter a valid number!");//弹窗
            return false;
        }
        const pattern = /^\d+$/;    //正则表达式，我也不知道为啥长这样
        if (!pattern.test(input)) { //正则表达式检测输入数字是否是整数
            alert("Please enter a valid number!");
            return false;
        }
        return true;
    }
    /*function PressEnter(event) {
        if (event.Keycode === 13 || event.Key === "Enter"){   //检测是否为enter键，enter的键码为13，===表示严格相等（例如==可以将char转换为int和数字比较，但是===不行）
            if (CheckValidNum(x_elem.value)) {
                let x_val = parseInt(x_elem.value);
                if (x_val + y_val == z_val) {
                    msg_elem.innerHTML = "Correct! Fetching new question...";
                    setTimeout(function () {
                        x_elem.value = "";
                        msg_elem.innerHTML = "";
                        get_qtn;
                    }, 2000);
                }
                else {
                    msg_elem.innerHTML = "Incorrect! Try again.";
                }
            }
        }
    }*/
    
/*if (CheckValidNum(input_elem.value)) {
                let sentval = new XMLHttpRequest();
                sentval.open("POST", "/Math/Check");
                //sentval.setRequestHeader("Content-Type","applicaiton/json; charset=utf8");
                sentval.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                //let data = {"Adder":input_elem.value};
                //sentval.send(JSON.stringify(data));
                sentval.send("input=" + input_elem.value);
            }*/
    

    /*function answerstatus(flag) {
        if (flag) {
            msg_elem.innerHTML = "Correct! Fetching new question...";
        }
        else {
            msg_elem.innerHTML = "Incorrect! Try again.";
        }
    }*/
}