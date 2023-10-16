function convertToDecimal(inputNumber,from_base){
    // inputNumber = inputNumber.toString();
    var numberLen = inputNumber.length;
    var position = numberLen;
    var answer = 0;

    var d = {'A':10, 'B':11, 'C':12,'D':13,'E':14,'F':15,'G':16};
    var k = {'10':'A','11':'B','12':'C','13':'D','14':'E','15':'F','16':'G'};

    for(var i = 0; i < numberLen; i++){
        var num = inputNumber[i];
        if(from_base<=10 && num >= '0' && num<from_base){
            num = Number(num);
        }
        else if(num >= '0' && num <= '9' && num<from_base){
            num = Number(num);
        }
        else if(num >='A' && num<=k[from_base.toString()] ){
            num = d[num];
        }
        else{
            return NaN;
        }
        position--; 
        answer += (num* Math.pow(from_base,position));
    }
    return answer;
}

function convertToBase(inputNumber,to_base){
    inputNumber = Number(inputNumber);
    var remainder = 0;
    var answer = "";
    if(!isNaN(inputNumber)){
        inputNumber = Number(inputNumber);
        var k = {'10':'A','11':'B','12':'C','13':'D','14':'E','15':'F','16':'G'};

        while(inputNumber != 0){
            remainder = inputNumber % to_base;
            inputNumber = ((inputNumber - remainder) / to_base);
            if(remainder >= 10){
                answer = k[remainder.toString()] + answer;
            }
            else{
                answer =  remainder + answer;
            }
        }
    }
    return answer;
}      

function floatConvertToDecimal(inputNumber,from_base){

    var numberLen = inputNumber.length;
    var position = 0;
    var answer = 0;

    var d = {'A':10, 'B':11, 'C':12,'D':13,'E':14,'F':15,'G':16};
    var k = {'10':'A','11':'B','12':'C','13':'D','14':'E','15':'F','16':'G'};

    for( var i=0;i<numberLen;i++){
        var num=inputNumber[i];
        if(from_base<=10 && num>='0' && num<from_base){
            num = Number(num);
        }
        else if(num>='0'&& num<='9' && num<from_base){
            num = Number(num);
        }
        else if(num>='A' && num<= k[from_base.toString()]){
            num = d[num];
        }
        else{
            return NaN;
        }
        position--;
        answer += (num* Math.pow(from_base,position));
    }
    return answer;
}

function floatConvertToBase(inputNumber,to_base){

    var i=0;
    var answer = "";
    var k = {'10':'A','11':'B','12':'C','13':'D','14':'E','15':'F','16':'G'};

    var x = inputNumber;
    // console.log(inputNumber);

    if(!isNaN(inputNumber)){
        while(!isNaN(x) && i<15){
            var multiplied_number = (x*to_base).toFixed(20).toString();
            // console.log(multipled_number);
            
            var new_number = multiplied_number;
            
            // console.log(x," ",to_base);
            if(new_number.includes(".")){
                var remainder = new_number.split('.');
            }
            else{
                var remainder = []
                remainder[0] = new_number;
                remainder[1] = NaN;
            }
            // console.log(new_number);
            // console.log(remainder);

            if(remainder[0] >= 10){
                answer += k[remainder[0].toString()];
            }
            else{
                answer +=  remainder[0].toString();
            }
            // console.log(answer);
            x = Number('.'+remainder[1]);
            i+=1;
        }
    }

    return answer;
}

function removeTrailingZeros(str){
    return str.replace(/0+$/, '');
}

//access all the webpage elements
let txtNumber=document.getElementById('txtNumber');
let from_base=document.getElementById('fbase');
let baseDDL=document.getElementById('tbase');
let convertBtn=document.getElementById('btnConvert');
let spanEl=document.getElementById('convertedValue');

convertBtn.addEventListener('click',function(){
    //+ converts string to its decimal number.
    let n= txtNumber.value;
    a = n.split('.');
    size = a.length;
    // console.log(size);
    let fbase = +from_base.value;
    let base = +baseDDL.value;
    // console.log(num,base);
    // let num = parseInt(n,fbase);
    if(size == 1){
        let num = convertToDecimal(a[0],fbase);
        if(isNaN(num)){
            spanEl.textContent= 'Please enter a valid number.';
            spanEl.style.color= '#EF5350';
        }
        else{
            let convertedValue = convertToBase(num,base);
            spanEl.textContent= convertedValue.toUpperCase();
            spanEl.style.color= '#06270b';
            spanEl.style.fontWeight='bold';
        }
    }
    else if(size == 2){
        let num1 = convertToDecimal(a[0],fbase);
        let num2 = floatConvertToDecimal(a[1],fbase);
        // console.log(num1);
        // console.log(num2);
        let num = num1 + num2;
        // console.log(num);

        if(isNaN(num)){
            spanEl.textContent= 'Please enter a valid number.';
            spanEl.style.color= '#EF5350';
        }
        else{
            let convertedValue1 = convertToBase(num1,base);
            // console.log(convertedValue1);
            let convertedValue2 = floatConvertToBase(num2,base);
            // console.log(convertedValue2);
            let convertedValue = removeTrailingZeros(convertedValue1 +'.'+ convertedValue2);
            // console.log(convertedValue);
            spanEl.textContent= convertedValue.toUpperCase();
            spanEl.style.color= '#06270b';
            spanEl.style.fontWeight='bold';
        }
    }
})