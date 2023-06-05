export const functionsDevfinance = {
    setLocalStorange(key, value){
        return  window.localStorage.setItem(key, JSON.stringify(value)) 
    },

    convertStringNumberTo(number){
        const resultCaracters = number.replace(',', '.').match(/-|[0-9|.|,]/g).join('') 
        return {
            float(){ return Number.parseFloat(resultCaracters) },
            integer(){ return Number.parseInt(resultCaracters) }
        }                
    },

    convetTextDateToRightFormatForBrowserForBrowser(text){
        const dateSplited = text.split("/")
        return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0]
    },

    numberRounder(number){
        const m = Number((Math.abs(number) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(number);
    },

    colorRgbToHex(rgb){
        return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    },

    CssSelectiorAndValuesTotalCardsByEntrances(arrayEntrances){
        const valueOfTotalCards = 
        [
           {   
                cssSelector: "#totalDisplay",
                value: arrayEntrances.reduce((acc, entrance) => acc + entrance.amount, 0) 
            },
            {   
                cssSelector: "#incomeDisplay",
                value: arrayEntrances.map(entrance => entrance.amount >= 0.00 ? entrance.amount : 0).reduce((acc, value) => acc + value, 0)
            },
            {   
                cssSelector: "#expenseDisplay",
                value: arrayEntrances.map(entrance => entrance.amount < 0.00 ? entrance.amount : 0).reduce((acc, value) => acc + value, 0)
            }    
        ]
        return valueOfTotalCards
    }
}