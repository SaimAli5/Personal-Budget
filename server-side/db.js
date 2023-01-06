// dataBase where all envelopes are stored
const envelopes = [{
    "name": "envelope1",
    "category" : "test"

}];


const getEnvelopeBycategory = (value)=>{
    //filters to only matched envelopes
    const matchedEnvelope = envelopes.filter(envelope => envelope.category === value);
    //checks if no envelopes were found with matching categoryName
    if (matchedEnvelope.length===0) {
        return `Envelope with category name: "${value}" not found!`
    } else {
        return matchedEnvelope;
    }

};

module.exports = {
    envelopes,
    getEnvelopeBycategory
};