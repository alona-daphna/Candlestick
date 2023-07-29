import { loadChart } from "./candlestick.js"
document.addEventListener("DOMContentLoaded", async () => {
    const btn = document.getElementById('submit')
    btn.addEventListener('click', async () => {
        document.getElementById('chart').innerHTML = ''
        const ticker = document.getElementById('ticker-input').value
        await loadChart(ticker)
    })

})
