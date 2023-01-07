export function numOfWeek(key:string):number {
    let dateArr = key.split('.') 
    
    let dataItem = new Date(Number(dateArr[2]),Number(dateArr[1]),Number(dateArr[0]));
    let dayn = (dataItem.getDay() + 6) % 7;
    dataItem.setDate(dataItem.getDate() - dayn + 3);
    let firstThursday = dataItem.valueOf();
    dataItem.setMonth(0, 1);
    if (dataItem.getDay() !== 4) {
        dataItem.setMonth(0, 1 + ((4 - dataItem.getDay()) + 7) % 7);
       }
    return 1 + Math.ceil((firstThursday - dataItem.valueOf()) / 604800000);
}

export function numOfWeekNow():number {
    
    
    let dataItem = new Date();
    let dayn = (dataItem.getDay() + 6) % 7;
    dataItem.setDate(dataItem.getDate() - dayn + 3);
    let firstThursday = dataItem.valueOf();
    dataItem.setMonth(0, 1);
    if (dataItem.getDay() !== 4) {
        dataItem.setMonth(0, 1 + ((4 - dataItem.getDay()) + 7) % 7);
       }
    return 1 + Math.ceil((firstThursday - dataItem.valueOf()) / 604800000);
}