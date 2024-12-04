// Base64 Encoder
export const toBase64 = (data) => {
    return Buffer.from(data, 'utf8').toString('base64');
};

// Base64 Decoder
export const fromBase64 = (base64Data) => {
    return Buffer.from(base64Data, 'base64').toString('utf8');
};
