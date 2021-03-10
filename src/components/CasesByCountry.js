import numeral from "numeral";
import { useState } from 'react';
const CasesByCountry = ({ countries }) => {
    const [sortedByTitle, setSortedByTitle] = useState();
    class FilteredDatas {
        constructor( caseTest, deathPop, deathRecv, todayCases, activeCases, countryName) {
            this.caseTest = caseTest;
            this.deathPop = deathPop;
            this.deathRecv = deathRecv;
            this.todayCases = todayCases;
            this.activeCases = activeCases;
            this.countryName = countryName;
        }
    }
    const dataArray = [];
    countries.map((countryData) => {
        let caseTest = parseFloat(countryData.cases / countryData.tests).toFixed(2);
        let deathPop = parseInt(countryData.population / countryData.deaths);
        let deathRecv = parseFloat(countryData.deaths / countryData.recovered).toFixed(2);
        let todayCases = countryData.todayCases;
        let activeCases = countryData.cases;
        if (caseTest == Infinity) {
            caseTest = 0;
        }
        if (deathRecv == Infinity) {
            deathRecv = 0;
        }
        const filteredData = new FilteredDatas(caseTest, deathPop, deathRecv, todayCases, activeCases, countryData.country);
        dataArray.push(filteredData);
    })
    return (
        <>
            <thead className="titleTable">
                <tr>
                    <th className="bg-dark text-light">#</th>
                    <th className="bg-dark text-light" onClick={() => setSortedByTitle("countryName")}>Country</th>
                    <th className="bg-dark text-light" onClick = {() => setSortedByTitle("activeCases")}>Active Cases</th>
                    <th className="bg-dark text-light" onClick = {() => setSortedByTitle("todayCases")}>Today Cases</th>
                    <th className="bg-dark text-light" onClick = {() => setSortedByTitle("caseTest")}>Case/Test</th>
                    <th className="bg-dark text-light" onClick = {() => setSortedByTitle("deathPop")}>Pop./Death</th>
                    <th className="bg-dark text-light" onClick = {() => setSortedByTitle("deathRecv")}>Death/Recv.</th>
                </tr>
            </thead>
                <tbody>
                {dataArray.sort((a, b) => b[sortedByTitle] >= a[sortedByTitle] ? 1 : b[sortedByTitle] < a[sortedByTitle] ? -1 : 0).map((countryData, key) => {
                        
                        return (
                            <tr key={key}>
                                <td className="text-right">{key + 1}</td>
                                <td className="pl-2"><strong>{countryData.countryName}</strong></td>
                                <td className="pl-2 text-right">{numeral(countryData.activeCases).format('0,0')}</td>
                                <td className="pl-2 text-right">{numeral(countryData.todayCases).format('0,0')}</td>
                                <td className="pl-2 text-right">{countryData.caseTest}</td>
                                <td className="pl-2 text-right">{numeral(countryData.deathPop).format('0,0')}</td>
                                <td className="pl-2 text-right">{countryData.deathRecv}</td>
                            </tr>
                        );
                        })
                    }
                </tbody>
        </>
    )
}
export default CasesByCountry;
