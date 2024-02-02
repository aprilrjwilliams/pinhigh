const STRIPE_CONFIG = {
    SECRET_KEY: 'sk_test_51OdOUsEutSUlLZ7PVsenQCJIs0XkeNfZAoKeNSjdTvmiwhVv89yu2MFBGZdX7zyKI718UH4yhCxjzvP2HWxVJVEy00qbHwS0uR',
    CURRENCY: 'USD',
    SUCCESS_URL: 'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
    CANCEL_URL: 'http://localhost:4200/payment'
}


module.exports = {
    STRIPE_CONFIG
}