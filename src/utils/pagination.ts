
export  function paginar(count:number, cantidad:number) {
    const isInteger = Number.isInteger(count / cantidad);
  
    if (isInteger) {
      return count;
    } else {
      const result = Math.floor(count / cantidad) + 1
      
      return result;
    }
  }