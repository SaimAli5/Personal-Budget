// middleware for updating envelopes
const updateEnvelopeByIndex = (req, res, next) =>{
    const envelopeBody = req.body;
    const envelopeParam = req.params.categoryName;

    const EnvelopeToUpdate = getEnvelopeBycategory(envelopeParam);

    // .findIndex of EnvelopeToUpdate in envelopes
    const envelopIndex = envelopes.findIndex( env => env.category === EnvelopeToUpdate[0].category);
    if(envelopIndex !== -1){
        envelopes[envelopIndex] = envelopeBody;
    } else {
        res.send('No envelopes found with matching category');
    }
    next();
};

module.exports = {updateEnvelopeByIndex};