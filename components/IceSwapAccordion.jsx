import Accordion from 'react-bootstrap/Accordion';

function IceSwapAccordion({info}) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>View Details of this token</Accordion.Header>
        <Accordion.Body>
        <p> Address : <a href={`https://polygonscan.com/address/${info.address}`} target="_blank"> {info.address} </a> </p>
        <p> Symbol : {info.symbol} </p>
        <p> Decimals : {info.decimals} </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default IceSwapAccordion;