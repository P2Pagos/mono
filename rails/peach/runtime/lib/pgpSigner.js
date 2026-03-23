import * as openpgp from 'openpgp'

// Sign a text message with the merchant's PGP private key.
// Returns the armored PGP signature block only (-----BEGIN PGP SIGNATURE----- ... -----END PGP SIGNATURE-----)
export const signMessage = async (armoredPrivateKey, passphrase, text) => {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey }),
    passphrase,
  })
  const message = await openpgp.createCleartextMessage({ text })
  const signed = await openpgp.sign({ message, signingKeys: privateKey })
  const match = signed.match(/-----BEGIN PGP SIGNATURE-----([\s\S]+?)-----END PGP SIGNATURE-----/)
  return match[0]
}

// Encrypt a text message for the counterparty (seller).
// Also encrypted to own public key so the merchant can decrypt their own sent messages.
// Signed with the merchant's private key for authenticity.
// Returns an armored PGP message string.
export const encryptMessage = async (text, counterpartyArmoredKey, armoredPrivateKey, armoredPublicKey, passphrase) => {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey }),
    passphrase,
  })
  const counterpartyKey = await openpgp.readKey({ armoredKey: counterpartyArmoredKey })
  const ownKey = await openpgp.readKey({ armoredKey: armoredPublicKey })
  const message = await openpgp.createMessage({ text })
  return openpgp.encrypt({
    message,
    encryptionKeys: [counterpartyKey, ownKey],
    signingKeys: privateKey,
  })
}
