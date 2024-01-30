const stripeServices = require('./stripe.services')


exports.createPaymentSession = (req, res, next) => {
    stripeServices.createSession({priceId: req.body.priceId, mode: req.body.mode}, (response) => {
        return res.status(200).send(response);
    });
};