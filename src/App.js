import './App.css';
import { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CasesByCountry from './components/CasesByCountry';
import HeaderCards from './components/HeaderCards';
import FormControl from './components/FormControl';
import LineGraph from './components/LineGraph';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import MapLeaflet from './components/MapLeaflet';


const App =() => {
  const [countries,setCountries] = useState([]);
  const [cardData,setCardData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37.80746, lng: -80.4796});
  const [mapZoom, setMapZoom] = useState(5);
  const [historicalDeaths, setHistoricalDeaths] = useState([]);
  const [historicalCases, setHistoricalCases] = useState([]);
  const [historicalRecv, setHistoricalRecv] = useState([]);
  const [historicalDates, setHistoricalDates] = useState([]);
  const [] = useState([]);
  /*const [getCardInfos, setGetCardInfos] = useState("https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true");
  const [selectedCountry, setSelectedCountry] = useState("WorldWide");*/
  const onChangeCountry = async (e) => {
    const countryCode = e.target.value;
    const urlCards = (countryCode === "WorldWide" ? `https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true` :
      `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=false&twoDaysAgo=false&strict=false&allowNull=false`)
    const resultOption = await axios(urlCards);
    setCardData(resultOption.data);
    setMapCenter(countryCode === "WorldWide" ? [37.80746, -80.4796] : [resultOption.data.countryInfo.lat, resultOption.data.countryInfo.long]);
    setMapZoom(4);
    const urlLineData = (countryCode === "WorldWide" ? `https://disease.sh/v3/covid-19/historical/all?lastdays=210` :
      `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=210`);
    const resultLine = await axios(urlLineData);
    const lineArrayDeaths = [];
    const lineArrayCases = [];
    const lineArrayRecv = [];
    setHistoricalDeaths(countryCode === "WorldWide" ? 
      () => {
        for (let i = 0; i < 210; i = i + 10) {
        lineArrayDeaths.push(Object.values(resultLine.data.deaths)[i]);
      }
      return lineArrayDeaths;} :
      () => {
        for (let i = 0; i < 210; i = i + 10) {
          lineArrayDeaths.push(Object.values(resultLine.data.timeline.deaths)[i]);
        }
      return lineArrayDeaths;}
    );
      setHistoricalCases(countryCode === "WorldWide" ? () => {
        for (let i = 0; i < 210; i = i + 10) {
          lineArrayCases.push(Object.values(resultLine.data.cases)[i]);
        }
        return lineArrayCases;
      } : () => {
        for (let i = 0; i < 210; i = i + 10) {
          lineArrayCases.push(Object.values(resultLine.data.timeline.cases)[i]);
        }
        return lineArrayCases;
      }
    );
    setHistoricalRecv(countryCode === "WorldWide" ?
      () => {
        for (let i = 0; i < 210; i = i + 10) {
          lineArrayRecv.push(Object.values(resultLine.data.recovered)[i]);
        }
        return lineArrayRecv;
      } :
      () => {
        for (let i = 0; i < 210; i = i + 10) {
          lineArrayRecv.push(Object.values(resultLine.data.timeline.recovered)[i]);
        }
        return lineArrayRecv;
      });
  }

  useEffect(async () => {
    const result = await axios(`https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=true&sort=active&allowNull=true`);
    setCountries(result.data);
    const resultOption = await axios(`https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true`);
    setCardData(resultOption.data);
    const resultDefault = await axios(`https://disease.sh/v3/covid-19/historical/all?lastdays=210`);
    const lineArrayDeaths = [];
    const lineArrayCases = [];
    const lineArrayRecv = [];
    const lineArrayDates = Object.getOwnPropertyNames(resultDefault.data.deaths);
    setHistoricalDates(lineArrayDates);
    setHistoricalDeaths(() => {
      for (let i = 0; i < 210; i = i + 10) {
        lineArrayDeaths.push(Object.values(resultDefault.data.deaths)[i]);
      } return lineArrayDeaths;
    });
    setHistoricalCases(() => {
      for (let i = 0; i < 210; i = i + 10) {
        lineArrayCases.push(Object.values(resultDefault.data.cases)[i]);
      } return lineArrayCases;
    });
    setHistoricalRecv(() => {
      for (let i = 0; i < 220; i = i + 10) {
        lineArrayRecv.push(Object.values(resultDefault.data.recovered)[i]);
      }
      return lineArrayRecv;
    });
  }, []);
  return (
    <>
        <Container fluid={true}>
          <Row className="my-4">
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12} sm={8}>
                  <h1 className="text-center">COVID-19 TRACKER</h1>
                </Col>
                <Col xs={12} sm={4}>
                  <FormControl countries={countries} onChangeCountry={onChangeCountry}/>
                </Col>
                <Col xs={12}>
                  <HeaderCards cardData={cardData}/>
                </Col>
              </Row>
              <MapLeaflet mapCenter = {mapCenter} mapZoom={mapZoom} cardData= {cardData}/>
            </Col>
            <Col xs={12} md={6}>
              <div className="tableDiv mb-3">
                <Table className="tableComponent">
                  <CasesByCountry countries={countries}/>
                </Table>
              </div>
              <LineGraph historicalDeaths ={historicalDeaths} historicalCases ={historicalCases} historicalDates = {historicalDates} historicalRecv ={historicalRecv}/>
            </Col>
          </Row>
        </Container>
    </>
  );
}
export default App;
