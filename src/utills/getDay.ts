export function getDay (key:string):number {
    let dateArr = key.split('.') 

   return new Date(Number(dateArr[2]),Number(dateArr[1]),Number(dateArr[0])).getDay();
}