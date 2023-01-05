// dataBase where all envelopes are stored
const envelopes = [];


const getEnvelopeBycategory = (value)=>{
    const matchedEnvelope = envelopes.filter(envelope =>{
        if(envelope.category === value){
            return envelope
        }
    });
    // checks if 'matchedEnvelop' is empty 
    if (matchedEnvelope.length === 0) {
      return "No envelopes found with matching category";
    };
    return matchedEnvelope;
};

module.exports = {
    envelopes,
    getEnvelopeBycategory
};