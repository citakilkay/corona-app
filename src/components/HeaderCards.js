import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import numeral from "numeral";

const HeaderCards = ({cardData}) => {
    //const cardArray = ["Active Cases", "Total Deaths", "Total Recovered", "Today Cases", "Today Deaths", "Today Recovered"];
    const cardInfos = {
        cardContents:[
            {
                title: "Active Cases",
                dataNumber: numeral(cardData.active).format('0,0'),
                color: 'danger'
            },
            {
                title: "Total Deaths",
                dataNumber: numeral(cardData.deaths).format('0,0'),
                color: 'secondary'
            },
            {
                title: "Total Recovered",
                dataNumber: numeral(cardData.recovered).format('0,0'),
                color: 'success'
            },
            {
                title: "Today Cases",
                dataNumber: "+" + numeral(cardData.todayCases).format('0,0'),
                color: 'danger'

            },
            {
                title: "Today Deaths",
                dataNumber: "+" + numeral(cardData.todayDeaths).format('0,0'),
                color: 'secondary'
            },
            {
                title: "Today Recovered",
                dataNumber: "+" + numeral(cardData.todayRecovered).format('0,0'),
                color: 'success'
            }
        ]
    }
    const cards = cardInfos.cardContents.map((cardContent, index) => (
        
            <Col xs={6} md={4} key={index}>
            <Card bg= {cardContent.color} text='dark' className="mx-1 my-2 m-md-2 text-center">
                    <Card.Header as='h6'>{cardContent.title}</Card.Header>
                    <Card.Body className="text-dark text-center bg-light" as='h5'>{cardContent.dataNumber}</Card.Body>
                </Card>
            </Col>

    ));
    return (
        <>
        <Row>
                {cards}
        </Row>
        </>
    )
}
export default HeaderCards;
