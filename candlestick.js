import API_KEY from "./config.js"

const loadChart = async (ticker) => {
    const options = {
        chart: {
            type: 'candlestick'
        },
        series: [{
            data: getAllData(await fetchSingleStock(ticker))
        }],
        title: {
            text: `${ticker} Market Summary`,
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {enabled: true}
        }
    }

    var chart = new ApexCharts(document.getElementById('chart'), options)
    chart.render()
}

const getAllData = (singleStockData) => {
    const allData = []
    const {dates, close, high, low, open} = formatData(singleStockData)

    for (let i = 0; i < dates.length; i++) {
        allData.push({x: dates[i], 
                            y: [open[i], high[i], low[i], close[i]]})
        
    }

    return allData
}

const fetchSingleStock = async (ticker) => {
    const response = await fetch(`https://api.twelvedata.com/time_series?apikey=${API_KEY}&interval=1day&symbol=${ticker}`)
    return await response.json()
}


const formatData = (data) => {
    const dates = []
    const high = []
    const low = []
    const open = []
    const close = []

    data.values.forEach(interval => {
        dates.push(interval.datetime)
        high.push(interval.high)
        close.push(interval.close)
        open.push(interval.open)
        low.push(interval.low)
    })

    return {dates, close, high, low, open}
}

export {loadChart}