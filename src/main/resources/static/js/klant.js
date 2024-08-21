"use strict"
import {byId, toon, verberg, verwijderChildElementenVan} from "./util.js";

byId("zoek").onclick = async () =>{
    verwijderChildElementenVan(byId("klanten"))
    verberg("table")
    verberg("storing")
    verberg("verplicht")
    const stukWoord = byId("input")
    if(!stukWoord.checkValidity()){

        toon("verplicht")
        stukWoord.focus()
    }
    else{
        findByStukWoord(stukWoord.value)

    }
}


async function findByStukWoord(stukWoord){
    const response = await fetch (`klanten?stukWoord=${stukWoord}`)
    if(response.ok){
        const lijstKlanten = await response.json()
        const klanten = byId("klanten")
        for( const klant of lijstKlanten){
            toon("table")
            const tr = klanten.insertRow()
            const a = document.createElement("a")
            a.href = "bevestig.html"
            a.textContent = klant.voorEnAchternaam
            a.dataset.klantId = klant.id
            const td = document.createElement("td")
            td.appendChild(a)
            tr.appendChild(td)
            tr.insertCell().textContent = klant.straatNummer
            tr.insertCell().textContent = klant.postcode
            tr.insertCell().textContent = klant.gemeente

        }
        const links = document.querySelectorAll("#klanten a")
        for(const link of links){
            link.onclick = () => {
                sessionStorage.setItem("klantId", Number(link.getAttribute('data-klant-id')))
                sessionStorage.setItem("voorEnAchternaam", link.textContent)
            }
        }
    }
    else{
        toon("storing")
    }
}