// // dataBase where all envelopes are stored
// const envelopes = [
// //     "id": 0,
// //     "category": "string",
// //     "budget": 0
// ];
// const transactions = [
// //     "id": 0,
// //     "date": "string",
// //     "category": "string",
// //     "payment": 0
// ];


// const getEnvelopeBycategory = (value)=>{
//     //filters to only matched envelopes
//     const matchedEnvelope = envelopes.filter(envelope => envelope.category === value);
//     //checks if no envelopes were found with matching categoryName
//     if (matchedEnvelope.length===0) {
//         return `Envelope with category name: "${value}" not found!`
//     } else {
//         return matchedEnvelope;
//     }

// };

// // middleware for updating envelopes
// const updateEnvelopeByIndex = (req, res, next) =>{
//     const envelopeBody = req.body;
//     const envelopeParam = req.params.categoryName;

//     const EnvelopeToUpdate = getEnvelopeBycategory(envelopeParam);

//     // .findIndex of EnvelopeToUpdate in envelopes
//     const envelopIndex = envelopes.findIndex( env => env.category === EnvelopeToUpdate[0].category);
//     if(envelopIndex !== -1){
//         envelopes[envelopIndex] = envelopeBody;
//     } else {
//         res.send('No envelopes found with matching category');
//     }
//     next();
// };

// module.exports = {transactions, envelopes, updateEnvelopeByIndex, getEnvelopeBycategory};