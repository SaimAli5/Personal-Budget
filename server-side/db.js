// dataBase where all envelops are stored
const envelops = [];


const getEnvelopeBycategory = (value)=>{
    const matchedEnvelope = envelops.filter(envelope =>{
        if(envelope.category === value){
            return envelope
        }
    });
    // checks if 'matchedEnvelop' is empty 
    if (matchedEnvelope.length === 0) {
      return "No envelops found with matching category";
    };
    return matchedEnvelope;
};

module.exports = {
    envelops,
    getEnvelopeBycategory
};