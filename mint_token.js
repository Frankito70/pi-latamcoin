// mint_token.js
require('dotenv').config();
const StellarSdk = require('stellar-sdk');

StellarSdk.Networks.useTestNetwork();
const server = new StellarSdk.Server('http://localhost:8000');

// CONFIGURACIÓN
const ASSET_CODE = "LATAM";
const ISSUER_SECRET = process.env.ISSUER_SECRET;
const DISTRIBUTOR_PUBLIC = "GDHECRM5U7DQXADWDKHBXQWBTIPACVP5C53M2BVRRQZRM562TIEPSTTI";

(async () => {
  try {
    if (!ISSUER_SECRET) throw new Error("Falta ISSUER_SECRET en .env");
    const issuerKey = StellarSdk.Keypair.fromSecret(ISSUER_SECRET);
    const issuerAccount = await server.loadAccount(issuerKey.publicKey());

    const asset = new StellarSdk.Asset(ASSET_CODE, issuerKey.publicKey());
    const fee = await server.fetchBaseFee();
    const amountToMint = "100000"; // cantidad a acuñar y enviar al distribuidor

    const tx = new StellarSdk.TransactionBuilder(issuerAccount, { fee, networkPassphrase: StellarSdk.Networks.TESTNET })
      .addOperation(StellarSdk.Operation.payment({
        destination: DISTRIBUTOR_PUBLIC,
        asset: asset,
        amount: amountToMint
      }))
      .setTimeout(60)
      .build();

    tx.sign(issuerKey);
    const res = await server.submitTransaction(tx);
    console.log(`Acuñados ${amountToMint} ${ASSET_CODE}. Hash:`, res.hash);
  } catch (err) {
    console.error("Error acuñando tokens:", err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
  }
})();
