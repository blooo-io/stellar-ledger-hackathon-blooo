import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Str from "@ledgerhq/hw-app-str";
import StellarSdk from "stellar-sdk";
import { listen } from "@ledgerhq/logs";

// const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// listen((log) => console.log(log));

// let transport;
// let str;
// let addressWallet;
// let recipient = StellarSdk.Keypair.random().publicKey();
// let value = 10;
// let gasPrice;


// const getStrAppVersion = async () => {
//   transport = await TransportWebUSB.create();
//   str = new Str(transport);
//   const result = await str.getAppConfiguration();
//   return result.version;
// };

// const getStrPublicKey = async () => {
//   transport = await TransportWebUSB.create();
//   str = new Str(transport);
//   const result = await str.getPublicKey("44'/148'/0'");
//   return result.publicKey;
// };


// const signStrTransaction = async (addressPubKey, recipient, value, previous_hash_transaction) => {
//   const accountInfo = await server.loadAccount(addressWallet);

//   // check if previous hash_transaction's creator is the recipient
//   try {
//     fetch(`https://horizon-testnet.stellar.org/transactions/${previous_hash_transaction}`)
//     .then(res => res.json())
//     .then(data => {
//       if (recipient != data.source_account)
//         throw "Error Atomicity Transactions"
//     });
//   } catch (error) {
//     console.error("Failed to fund demo account! Please try again later.");
//   }

//   const transaction = new StellarSdk.TransactionBuilder(accountInfo, {
//     fee: StellarSdk.BASE_FEE,
//     networkPassphrase: StellarSdk.Networks.TESTNET,
//     timebounds: await server.fetchTimebounds(100),
//   })
//     .addOperation(StellarSdk.Operation.payment({
//       destination: recipient,
//       asset: StellarSdk.Asset.native(),
//       amount: value,
//     }))
//     .addMemo(StellarSdk.Memo.text("Test Transaction"))
//     .build();

//   const result = await str.signTransaction(
//     "44'/148'/0'",
//     transaction.signatureBase()
//   );

//   // add signature to transaction
//   const keyPair = StellarSdk.Keypair.fromPublicKey(addressPubKey);
//   const hint = keyPair.signatureHint();
//   const decorated = new StellarSdk.xdr.DecoratedSignature({
//     hint: hint,
//     signature: result.signature,
//   });
//   transaction.signatures.push(decorated);

//   return transaction;
// };
