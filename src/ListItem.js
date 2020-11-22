import logo from './logo.svg';
import './App.css';
import data from './data.json'
import React, { useContext, useState, useEffect } from "react";
import { Button } from 'react-bootstrap'

const tranaction = [{
    "id": "0ed6c015-ea38-465e-9323-bafae969baea",
    "type": "account",
    "iconURL": "https://s3-eu-west-1.amazonaws.com/lunarway-dev-cdn/pfm/category_other.png",
    "localizableTitle": "Transfer",
    "categoryIconUrl": "https://s3-eu-west-1.amazonaws.com/lunarway-dev-cdn/pfm/category_other.png",
    "deleted": "2020-10-06T13:13:42Z",
    "status": "future",
    "time": "2021-03-10T04:30:00Z",
    "categoryID": "other",
    "transactionAmount": null,
    "billingAmount": {
        "amount": -1,
        "currency": "DKK"
    }
}
]


const handleImage = (image) => {
    if (image == "https://api.dev.lunarway.com/storage/49485e1b-26d6-4014-bddc-2a7b62d5dbc6/redirect" || image == "https://api.dev.lunarway.com/user/avatar/541eb61e-0317-4e45-831f-35a28e036b52/thumbnail") {
        image = "https://s3-eu-west-1.amazonaws.com/lunarway-dev-cdn/pfm/category_other.png"
        return image
    }
    else {
        return image
    }
}

const handleDate = (date) => {
    let tempDate = new Date(date);
    date = ("0" + tempDate.getDate()).slice(-2) + "/" + ("0" + (tempDate.getMonth() + 1)).slice(-2) + "/" + tempDate.getFullYear().toString().substr(-2) + " " + ("0" + tempDate.getHours()).slice(-2) + ":" + ("0" + tempDate.getMinutes()).slice(-2);
    return date
}

const handleAmount = (amount, currency) => {

    if (parseInt(amount) <= -1) {
        amount = amount + ",00"
    }
    if (parseInt(amount) >= 100) {
        amount = amount + ",00"
    }
    let formattedAmount = "";
    formattedAmount = amount + " " + currency
    return formattedAmount
}

const handleStyleAmount = (amount) => {
    const style1 = {
        color: "red"
    }
    const style2 = {
        color: "black"
    }
    if (amount < 0) {
        return style1
    }
    return style2
}

const handleStyleStatus = (status) => {
    let colorString = "";
    switch (status) {
        case "future":
            return "#007bff"
            break;
        case "financial":
            return "#78f892"    
            break;
        case "authorization":
            return "#eb8e00"
            break;
    }

}

const onLoadDiv = (id) => {
    var div = document.getElementById(id);
    div.style.visibility = "hidden"
}

const mouseOverDiv = (id) => {
    var div = document.getElementById(id);
    div.style.visibility = "visible"
}

const mouseOutDiv = (id) => {
    var div = document.getElementById(id);
    div.style.visibility = "hidden"
}


function ListItem({ data, handleClick, handleDivClick, showDelete, handleShow }) {
    if (data.deleted !== null) {
        return (
            <div className="parent" style={{ opacity: '40%', textAlign: "center" }}>
                <div>
                   <img className="div1" src={handleImage(data.iconURL)} style={{ maxWidth: '60px', marginRight: '100%'}}></img>
                </div>
                <p className="div2">{data.type}</p>
                <p className="div3">{data.localizableTitle}</p>
                <p className="div4" style={handleStyleAmount(data.billingAmount.amount)}> {handleAmount(data.billingAmount.amount, data.billingAmount.currency)}</p>
                <p className="div5">{handleDate(data.time)}</p>
                <div className="div6">
                    <p style={{ margin: 'auto', borderRadius: '10px', background: handleStyleStatus(data.status), padding: '2px'}}>{data.status}</p>
                    <span style={{ width: '10px' }}></span>
                    <p className="labelDeleted" style={{ margin: 'auto', borderRadius: '10px', background: '#ff0018', color: 'white', padding: '2px'}}> Deleted</p>
                </div>
                <img className="div7" src={data.categoryIconUrl} style={{ maxWidth: '60px' }}></img>
                <Button hidden={true} id = {data.id} variant="danger" disabled={true} className="div8" onClick={handleClick} style={{ maxWidth: '50px', maxHeight: '50px' }}>X</Button>
            </div>
        )
    }
    return (
        <div onLoad =  {() => onLoadDiv(data.id)} className="parent" style={{ textAlign: "center" }} onMouseOver = {() => mouseOverDiv(data.id)} onMouseLeave = {() => mouseOutDiv(data.id)}>
            <img className="div1" src={handleImage(data.iconURL)} style={{ maxWidth: '60px'}}/>
            <p className="div2">{data.type}</p>
            <p className="div3">{data.localizableTitle}</p>
            <p className="div4" style={handleStyleAmount(data.billingAmount.amount)}> {handleAmount(data.billingAmount.amount, data.billingAmount.currency)}</p>
            <p className="div5">{handleDate(data.time)}</p>
            <p className="div6" style = {{background: handleStyleStatus(data.status)}}>{data.status}</p>
            <img className="div7" src={data.categoryIconUrl} style={{ maxWidth: '60px' }}></img>
            <div className="div8" id = {data.id} style = {{display: "flex"}}>
            <Button variant="primary"  onClick={handleDivClick} style={{ maxWidth: '50px', maxHeight: '50px' }}> ?</Button>
            <Button variant="danger"  onClick={handleClick} style={{ maxWidth: '50px', maxHeight: '50px' }}>X</Button>
            </div>
        </div>
    );
}

export default ListItem;
