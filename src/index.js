import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Str from "@ledgerhq/hw-app-str";
import StellarSdk from "stellar-sdk";
import { listen } from "@ledgerhq/logs";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

listen((log) => console.log(log));

let transport;
let str;
let addressWallet;
let recipient = StellarSdk.Keypair.random().publicKey();
let value = 10;
let gasPrice;

const getStrAppVersion = async () => {
  transport = await TransportWebUSB.create();
  str = new Str(transport);
  const result = await str.getAppConfiguration();
  return result.version;
};

const getStrPublicKey = async () => {
  transport = await TransportWebUSB.create();
  str = new Str(transport);
  const result = await str.getPublicKey("44'/148'/0'");
  return result.publicKey;
};

const sellerTransaction = async (addressPubKey, latlong, price, date) => {
  const accountInfo = await server.loadAccount(addressWallet);
  const transaction = new StellarSdk.TransactionBuilder(accountInfo, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
      timebounds: await server.fetchTimebounds(100),
    })
      .addOperation(StellarSdk.Operation.manageData(
        {
        name: "latlong",
        value: latlong,
        },
        {
          name: "date",
          value: date,
        },
        {
          name: "price",
          value: price,
        }
      ))
      .addMemo(StellarSdk.Memo.text("Test Transaction"))
      .build();
  const result = await str.signTransaction(
    "44'/148'/0'",
    transaction.signatureBase()
  );

  // add signature to transaction
  const keyPair = StellarSdk.Keypair.fromPublicKey(addressPubKey);
  const hint = keyPair.signatureHint();
  const decorated = new StellarSdk.xdr.DecoratedSignature({
    hint: hint,
    signature: result.signature,
  });
  transaction.signatures.push(decorated);

  return transaction;
};

const signStrTransaction = async (addressPubKey, recipient, value, sellerAddressPubKey, previous_hash_transaction) => {
  const accountInfo = await server.loadAccount(addressWallet);

  // check online previous_hash_transaction-creator c'est le sellerAddressPubKey
  try {
    fetch(`https://stellar.expert/explorer/testnet/tx/${previous_hash_transaction}`)
    .then(res => res.json())
    .then(function(out) {
      if (sellerAddressPubKey != out.sourceAccount)
        throw "monException"
    });
  } catch (error) {
    console.error("Failed the previous hash transaction's creator is the sellerAddressPubKey! Please try again.");
  }

  const transaction = new StellarSdk.TransactionBuilder(accountInfo, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
    timebounds: await server.fetchTimebounds(100),
  })
    .addOperation(StellarSdk.Operation.payment({
      destination: recipient,
      asset: StellarSdk.Asset.native(),
      amount: value,
    }))
    .addMemo(StellarSdk.Memo.text("Test Transaction"))
    .build();

  const result = await str.signTransaction(
    "44'/148'/0'",
    transaction.signatureBase()
  );

  // add signature to transaction
  const keyPair = StellarSdk.Keypair.fromPublicKey(addressPubKey);
  const hint = keyPair.signatureHint();
  const decorated = new StellarSdk.xdr.DecoratedSignature({
    hint: hint,
    signature: result.signature,
  });
  transaction.signatures.push(decorated);

  return transaction;
};

document.getElementById("connect-ledger").onclick = async function () {
  //Getting the Stellar App version
  const version = await getStrAppVersion();

  //Getting the stellar account public key
  addressWallet = await getStrPublicKey();
  //Getting the stellar account information
  const accountInfo = await server.loadAccount(addressWallet);

  //Get gas price from stellar sdk
  gasPrice = StellarSdk.BASE_FEE;

  //Fill the inputs with the default value
  document.getElementById("wallet").value = addressWallet;
  document.getElementById("balance").value = accountInfo.balances[0].balance;
  document.getElementById("gasPrice").value = gasPrice;
  document.getElementById("value").value = value;
  document.getElementById("recipient").value = recipient;
  document.getElementById(
    "version"
  ).innerHTML = `Stellar Application version: ${version}`;
};

document.getElementById("tx-transfer").onclick = async function () {
  //Getting information from the inputs
  value = document.getElementById("value").value;
  recipient = document.getElementById("recipient").value;

  //Building transaction with the information gathered
  const transaction = await signStrTransaction(addressWallet, recipient, value);

  const transactionResult = await server.submitTransaction(transaction);

  // Display the Ropsten etherscan on the screen
  const hash = transactionResult.hash;
  const url = "http://testnet.stellarchain.io/tx/" + hash ;
  document.getElementById("url").innerHTML = url;
  document.getElementById("url").href = url;

};

// const root = ReactDOM.createRoot(document.getElementById('root'));


// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
