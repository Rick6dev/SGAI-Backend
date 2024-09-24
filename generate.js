
const  codes=[]
function cambio(code) {
    let num = parseInt(code.substring(code.length - 9, code.length - 7));
    num += 1;
  
    let strNum;
    if (num < 10) {
      strNum = `0${num}`;
    } else {
      strNum = `${num}`;
    }
  
    const updatedCode = code.substring(0, code.length - 9) + strNum + code.substring(code.length - 7);
    return updatedCode;
  }
  
  function generateCode(codes,flag) {
    // Request values from the user
    // const typeAof = prompt("Ingrese el tipo de AOF");
    let typeAof=''
    let typeNp=''

    if(flag%2==0){
    typeAof = 'B';

    }else{
    typeAof = 'A';

    }


    if(flag%3==0){
        typeNp = 'Operacional';
    }else if(flag%5==0){
        typeNp = 'SUBDEBAN';
    }else{
        typeNp = 'NP';
    }
  
  

  
    // Generate the code
    let code = 'VPA-';
  
    if (typeAof === 'A') {
      code += 'GAT';
    } else {
      code += 'GAOF';
    }
  
    code += '-IA';
  
    if (typeNp === 'SUBDEBAN') {
      code += 'SUB';
    } else if (typeNp === 'Operacional') {
      code += 'O';
    } else {
      code += 'NP';
    }
  
    code += '-01-';
  
    // Generate the code for the fifth segment
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    let month = `${currentMonth}`;
  
    if (parseInt(month) < 10) {
      month = `0${month}`;
    }
  
    const year = currentDate.getFullYear();
    code += month + year;

    let duplicate = false;
    for (let count_code=0;codes.length>= count_code;count_code++) {
      if (code === codes[count_code]) {
        duplicate = true;
        
      
    
    }
    if (duplicate) {
        code = cambio(code);
        duplicate = false;

    }}

  
    return code;
  }
  
  let flag = 0;
  
  while (flag < 100) {
   let code =generateCode(codes,flag);
   codes.push(code);
    flag++;
  }
  
  console.log(codes.sort());