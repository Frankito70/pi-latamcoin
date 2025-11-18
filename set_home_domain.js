const StellarSdk = require('stellar-sdk');

// Configuración del Servidor
const HORIZON_URL = "https://horizon-testnet.stellar.org";
const server = new StellarSdk.Server(HORIZON_URL);

// SOLUCIÓN DEL ERROR:
// Definimos la frase de contraseña de la Testnet manualmente.
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

// CLAVES (Tus claves verificadas)
const EMITTER_SECRET = "SAIXPTYM5BL2GQDBLFZGROSCI5DIY4JXJIEZDV4VW5KY4PML2HOAADU3";
const EMITTER_PUBLIC_KEY = "GCOQVGBWRBJ36TAUYLBE5R2AETKI3CQXYJEJNY6C6CMZ7C4F5GQUGMPK";

// EL DOMINIO DONDE SUBIRÁS TU ARCHIVO pi.toml (¡CORREGIDO A GITHUB PAGES!)
const HOME_DOMAIN = "frankito70.github.io"; 

const emitterKeypair = StellarSdk.Keypair.fromSecret(EMITTER_SECRET);

async function setDomain() {
    try {
        console.log(`\n--> Iniciando configuración de HOME_DOMAIN: ${HOME_DOMAIN}`);
        
        let emitterAccount = await server.loadAccount(emitterKeypair.publicKey());

        // Construimos la transacción para establecer el dominio
        const tx = new StellarSdk.TransactionBuilder(emitterAccount, {
            fee: "100", 
            networkPassphrase: NETWORK_PASSPHRASE
        })
        .addOperation(StellarSdk.Operation.setOptions({
            homeDomain: HOME_DOMAIN
        }))
        .setTimeout(30)
        .build();

        // Firmar y enviar
        tx.sign(emitterKeypair);
        const result = await server.submitTransaction(tx);
        
        console.log("   ✅ HOME_DOMAIN configurado exitosamente en Stellar.");
        console.log(`   Ver en explorador: https://testnet.stellarchain.io/account/${emitterKeypair.publicKey()}`);

    } catch (error) {
        console.error("\n❌ Error al establecer el dominio:");
        if (error.response && error.response.data && error.response.data.extras) {
            console.error("   Detalle del servidor:", JSON.stringify(error.response.data.extras.result_codes, null, 2));
        } else {
            console.error("   Mensaje:", error.message);
        }
    }
}

setDomain().catch(err => {
    console.error("Error fatal:", err);
});