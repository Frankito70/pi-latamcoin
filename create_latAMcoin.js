const StellarSdk = require('stellar-sdk');

// Configuración del Servidor
const HORIZON_URL = "https://horizon-testnet.stellar.org";
const server = new StellarSdk.Server(HORIZON_URL);

// SOLUCIÓN DEL ERROR:
// Definimos la frase de contraseña de la Testnet manualmente.
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

// CLAVES
const DISTRIBUTOR_SECRET = "SC6KAAEVA26KI6ABIJ4APG26IYFBCPT2QJYKUW32UCZC5PTIE7JJBISY";
const EMITTER_SECRET = "SAIXPTYM5BL2GQDBLFZGROSCI5DIY4JXJIEZDV4VW5KY4PML2HOAADU3";
const EMITTER_PUBLIC_KEY = "GCOQVGBWRBJ36TAUYLBE5R2AETKI3CQXYJEJNY6C6CMZ7C4F5GQUGMPK";

// Configuración del Token
const TOKEN_CODE = "LATAMCOIN";
const INITIAL_SUPPLY = "55000000";

const distributorKeypair = StellarSdk.Keypair.fromSecret(DISTRIBUTOR_SECRET);
const emitterKeypair = StellarSdk.Keypair.fromSecret(EMITTER_SECRET);
const LATAMcoin = new StellarSdk.Asset(TOKEN_CODE, EMITTER_PUBLIC_KEY);

async function createAndMintToken() {
    try {
        console.log(`\n--> Iniciando creación de ${TOKEN_CODE}...`);
        console.log(`- Emisor: ${emitterKeypair.publicKey()}`);
        console.log(`- Distribuidor: ${distributorKeypair.publicKey()}`);

        // -----------------------------------------------
        // PASO 1: Crear Trustline
        // -----------------------------------------------
        console.log("\n[1/2] Creando Trustline...");
        
        let distributorAccount = await server.loadAccount(distributorKeypair.publicKey());

        // Construimos la transacción pasando la NETWORK_PASSPHRASE aquí
        const trustTx = new StellarSdk.TransactionBuilder(distributorAccount, {
            fee: "100", 
            networkPassphrase: NETWORK_PASSPHRASE
        })
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: LATAMcoin,
            limit: '900000000000.0000000',
        }))
        .setTimeout(30)
        .build();

        trustTx.sign(distributorKeypair);
        await server.submitTransaction(trustTx);
        console.log("   ✅ Trustline creada exitosamente.");

        // -----------------------------------------------
        // PASO 2: Acuñar (Minting)
        // -----------------------------------------------
        console.log(`\n[2/2] Acuñando ${INITIAL_SUPPLY} tokens...`);
        
        let emitterAccount = await server.loadAccount(emitterKeypair.publicKey());

        const paymentTx = new StellarSdk.TransactionBuilder(emitterAccount, {
            fee: "100",
            networkPassphrase: NETWORK_PASSPHRASE
        })
        .addOperation(StellarSdk.Operation.payment({
            destination: distributorKeypair.publicKey(),
            asset: LATAMcoin,
            amount: INITIAL_SUPPLY,
        }))
        .setTimeout(30)
        .build();

        paymentTx.sign(emitterKeypair);
        await server.submitTransaction(paymentTx);
        console.log(`   ✅ Acuñación exitosa.`);

        // -----------------------------------------------
        // Confirmación Final
        // -----------------------------------------------
        console.log("\n🎉 **¡OPERACIÓN COMPLETADA!**");
        console.log(`   Token: ${TOKEN_CODE}`);
        console.log(`   Cantidad: ${INITIAL_SUPPLY}`);
        console.log(`   Ver en explorador: https://testnet.stellarchain.io/account/${distributorKeypair.publicKey()}`);

    } catch (error) {
        console.error("\n❌ Error en el proceso:");
        if (error.response && error.response.data && error.response.data.extras) {
            console.error("   Detalle del servidor:", JSON.stringify(error.response.data.extras.result_codes, null, 2));
        } else {
            console.error("   Mensaje:", error.message);
        }
    }
}

createAndMintToken().catch(err => {
    console.error("Error fatal:", err);
});

