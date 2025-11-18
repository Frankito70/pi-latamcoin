// change_trust.js - para stellar-sdk v8.x (acepta http local con allowHttp)
require('dotenv').config();
const StellarSdk = require('stellar-sdk');

// Conectar a Horizon local (proxy) — allowHttp: true es necesario en v8
const server = new StellarSdk.Server('http://localhost:8000', { allowHttp: true });

// Configuración
const ASSET_CODE = 'LATAM';
const ISSUER_PUBLIC = 'GCOQVGBWRBJ36TAUYLBE5R2AETKI3CQXYJEJNY6C6CMZ7C4F5GQUGMPK';
const DISTRIBUTOR_SECRET = process.env.DISTRIBUTOR_SECRET;

(async () => {
  try {
    if (!DISTRIBUTOR_SECRET) throw new Error('Falta DISTRIBUTOR_SECRET en .env');

    const distributorKeypair = StellarSdk.Keypair.fromSecret(DISTRIBUTOR_SECRET);
    const distributorPub = distributorKeypair.publicKey();

    console.log('🔎 Cargando cuenta Distribuidor:', distributorPub);
    const distributorAccount = await server.loadAccount(distributorPub);

    const asset = new StellarSdk.Asset(ASSET_CODE, ISSUER_PUBLIC);

    const fee = await server.fetchBaseFee();
    const tx = new StellarSdk.TransactionBuilder(distributorAccount, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: asset,
        limit: '1000000000'
      }))
      .setTimeout(60)
      .build();

    tx.sign(distributorKeypair);

    console.log('🚀 Enviando ChangeTrust a la red (creando trustline)...');
    const txResult = await server.submitTransaction(tx);

    console.log('✅ Trustline creada con éxito. TX hash:', txResult.hash);
    console.log('Verifica: http://localhost:8000/accounts/' + distributorPub);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en change_trust.js:');
    if (err.response && err.response.data) {
      console.error(JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(err.stack || err.message || err);
    }
    process.exit(1);
  }
})();
