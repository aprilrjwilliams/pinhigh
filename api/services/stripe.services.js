const { STRIPE_CONFIG} = require("../configs/stripe.config");

const stripe = require("stripe")(STRIPE_CONFIG.SECRET_KEY);

async function createSession(params, callback){
    console.log('STRIPE_CONFIG.SUCCESS_URL ', STRIPE_CONFIG.SUCCESS_URL)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{price: params.priceId, quantity: 1}],
        mode: params.mode, 
        success_url: STRIPE_CONFIG.SUCCESS_URL,
        cancel_url: STRIPE_CONFIG.CANCEL_URL
    });

    callback({id: session.id})
}

module.exports = {
    createSession
}