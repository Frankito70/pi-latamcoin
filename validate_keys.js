// validate_keys.js
// Valida que las secret keys del archivo .env tengan formato Stellar correcto.

require('dotenv').config();
const StellarSdk = require('stellar-sdk');

function validar(nombre, secret) {
    try {
        if (!secret || !secret.startsWith("S")) {
            console.log(`❌ ${nombre}: NO válida — no empieza con "S"`);
            return;
        }

        const kp = StellarSdk.Keypair.fromSecret(secret);
        console.log(`✔️ ${nombre}: OK — Pública: ${kp.publicKey()}`);
    } catch (e) {
        console.log(`❌ ${nombre}: ERROR — ${e.message}`);
    }
}

console.log("Validando claves encontradas en .env...\n");

validar("ISSUER_SECRET", process.env.ISSUER_SECRET);
validar("DISTRIBUTOR_SECRET", process.env.DISTRIBUTOR_SECRET);
