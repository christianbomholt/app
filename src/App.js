import logo from './logo.svg';
import './App.css';
import './index.css'
import data from './data.json'
import React, { useContext, useState, useEffect } from "react";
import ListItem from './ListItem';
import {Col, Row, Modal, Button, Container, Spinner} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {



  const [transactionArray, setTransactionArray] = useState(data.data.transactions);
  const [toggleTypeTitle, setToggleTypeTitle] = useState("Type");
  const [toggleTitleTitle, setToggleTitleTitle] = useState("Title");
  const [toggleAmountTitle, setToggleAmountTitle] = useState("Amount");
  const [toggleDateTitle, setToggleDateTitle] = useState("Date");
  const [toggleStatusTitle, setToggleStatusTitle] = useState("Status");
  const [loading, setLoading] = useState(false);

  const [isToggledType, setIsToggledType] = useState(false);
  const [isToggledTitle, setIsToggledTitle] = useState(false);
  const [isToggledAmount, setIsToggledAmount] = useState(false);
  const [isToggledDate, setIsToggledDate] = useState(false);
  const [isToggledStatus, setIsToggledStatus] = useState(false);
  const [modalInfoShow, setModalInfoShow] = useState(false);
  const [modalDelteShow, setModalDeleteShow] = useState(false);
  const [selectedForInfo, setSelectedForInfo] = useState();
  const [selectedIndexForDelete, setSelectedIndexForDelete] = useState();
  const [selectedTransAction, setSelectedTransaction] = useState();


  const deleteTransAction = (index) => {
    let tempArray = [];
    transactionArray.forEach(element => {
      tempArray.push(element);
    });
    tempArray.splice(index, 1);
    setModalDeleteShow(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactionArray(tempArray);
    }, 1000)
  }

  const handleDeletedStatus = (deletedstatus) => {
    if (deletedstatus === null) {
      return "Active"
    }
    else return "Deleted at: " + deletedstatus
  }

  const handleTransactionAmoun = (transactionamont) => {
    if (transactionamont === null) {
      return "No transaction amount"
    }
    else return "Transaction amount: " + transactionamont.amount + transactionamont.currency
  }

  const handleSelectedIndex = (transaction, index) => {
    setSelectedIndexForDelete(index);
    setSelectedTransaction(transaction)
    console.log(selectedTransAction);
    setModalDeleteShow(true);
  }

  const handleSelectItem = (transaction) => {
    setSelectedTransaction(transaction);
    setTimeout(() => {

    })
    setModalInfoShow(!modalInfoShow);
  }

  const sortByAmount = () => {
    setIsToggledAmount(!isToggledAmount);
    if (isToggledAmount) {
      setToggleAmountTitle("Amount, asc.");
      const sorted = [...transactionArray].sort((a, b) => {
        return a.billingAmount.amount - b.billingAmount.amount
      });
      setTransactionArray(sorted);
      //do sort amount ascending
    }
    else {
      setToggleAmountTitle("Amount, dsc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return b.billingAmount.amount - a.billingAmount.amount
      });
      setTransactionArray(sorted);
       //do sort amount descending
    }

  }
  const sortByType = () => {
    setIsToggledType(!isToggledType);
    if (isToggledType) {
      setToggleTypeTitle("Type, asc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return a.type.localeCompare(b.type);
      });
      setTransactionArray(sorted);
      
    }
    else {
      setToggleTypeTitle("Type, dsc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return b.type.localeCompare(a.type);
      });
      setTransactionArray(sorted);
    }
  }
  const sortByTitle = () => {
    setIsToggledTitle(!isToggledTitle);
    if (isToggledTitle) {
      setToggleTitleTitle("Title, asc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return a.localizableTitle.localeCompare(b.localizableTitle);
      });
      setTransactionArray(sorted);
    }
    else {
      setToggleTitleTitle("Title, dsc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return b.localizableTitle.localeCompare(a.localizableTitle);
      });
      setTransactionArray(sorted);
    }
  }
  const sortByDate = () => {
    setIsToggledDate(!isToggledDate);
    if (isToggledDate) {
      setToggleDateTitle("Date, asc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return Date.parse(a.time) - Date.parse(b.time)
      });
      setTransactionArray(sorted);
    }
    else {
      setToggleDateTitle("Date, dsc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return Date.parse(b.time) - Date.parse(a.time)
      });
      setTransactionArray(sorted);
    }
  }
  const sortByStatus = () => {
    setIsToggledStatus(!isToggledStatus);
    if (isToggledStatus) {
      setToggleStatusTitle("Status, asc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return a.status.localeCompare(b.status);
      });
      setTransactionArray(sorted);
    }
    else {
      setToggleStatusTitle("Status, dsc.")
      const sorted = [...transactionArray].sort((a, b) => {
        return b.status.localeCompare(a.status);
      });
      setTransactionArray(sorted);
    }
  }

  return (
    <div className="App">
      <h1>LUNAR APP</h1>
      <div className="parent" style={{ height: '50px', marginBottom: ''}}>
        <button hidden={true} className="div1">x</button>
        <Button className="div2" onClick={() => sortByType()} style ={{display: "block", width: '100%'}}>{toggleTypeTitle}</Button>
        <Button className="div3" onClick={() => sortByTitle()} style ={{display: "block", width: '100%'}}>{toggleTitleTitle}</Button>
        <Button className="div4" onClick={() => sortByAmount()} style ={{display: "block", width: '100%'}}>{toggleAmountTitle}</Button>
        <Button className="div5" onClick={() => sortByDate()} style ={{display: "block", width: '100%'}}>{toggleDateTitle}</Button>
        <Button className="div6" onClick={() => sortByStatus()} style ={{display: "block", width: '100%'}}>{toggleStatusTitle}</Button>
        <button hidden={true} className="div7">x</button>
        <button hidden={true} className="div8">x</button>
      </div>
      {transactionArray.map((transaction, index) => {
        if (transaction != null && transaction != undefined && transaction != 'undefined') {
          return (
            <ListItem data={transaction} handleClick={() => handleSelectedIndex(transaction, index)} handleDivClick={() => handleSelectItem(transaction)}></ListItem>
          )
        }
      })}
      <Modal show={modalInfoShow} onHide={() =>setModalInfoShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Showing information on transaction ID: {selectedTransAction && selectedTransAction.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} md={4}>
              Type: {selectedTransAction && selectedTransAction.type}
            </Col>
            <Col xs={6} md={4}>
              Title: {selectedTransAction && selectedTransAction.localizableTitle}
            </Col>
            <Col xs={6} md={4}>
              Category: {selectedTransAction && selectedTransAction.categoryID}
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              Billing amount: {selectedTransAction && selectedTransAction.billingAmount.amount + selectedTransAction.billingAmount.currency}
            </Col>
            <Col xs={6} md={4}>
              {selectedTransAction && handleTransactionAmoun(selectedTransAction.transactionAmount)}
            </Col>
            <Col xs={6} md={4}>
              {selectedTransAction && handleDeletedStatus(selectedTransAction.deleted)}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant ="secondary" onClick={() => setModalInfoShow(false)}>Close</Button>
      </Modal.Footer>
      </Modal>

      <Modal show={modalDelteShow} onHide={() =>setModalDeleteShow(false)}>
        <Modal.Header closeButton>
    <Modal.Title>Do you want to delete transaction with ID:</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedTransAction && selectedTransAction.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>setModalDeleteShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() =>deleteTransAction(selectedIndexForDelete)}>
            Delete
          </Button>
          
        </Modal.Footer>
      </Modal>
      {loading && <Spinner animation="border" variant="primary" loading ={false}/>}
      
    </div>
  );
}

export default App;
