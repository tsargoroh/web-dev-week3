async function getData() {
    const url1 = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
    const url2 = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    let table = document.getElementById("table")
    
    let dataPromise1 = await fetch(url1)
    let dataPromise2 = await fetch(url2)
    let dataJSON1 = await dataPromise1.json()
    let dataJSON2 = await dataPromise2.json()

    let municipalities = Object.values(dataJSON1.dataset.dimension.Alue.category.label)
    let values = dataJSON1.dataset.value
    let employed = dataJSON2.dataset.value

    /* console.log(municipalities) */

    for (let i=0; i < municipalities.length; i++) {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")

        emp_percentage = Math.round(employed[i] / values[i] * 10000) / 100
        if (emp_percentage > 45){
            tr.classList.add("green")
        } else if (emp_percentage < 25) {
            tr.classList.add("red")
        }

        td1.innerHTML = municipalities[i]
        td2.innerHTML = values[i]
        td3.innerHTML = employed[i]
        td4.innerHTML = emp_percentage
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        table.appendChild(tr)
    }
}

getData()