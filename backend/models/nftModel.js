const { Schema, model, Types } = require('../connection');

const myschema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: 'nft_placeholder.png' },
    rarity: { type: String },
    category: { type: String, default: 'Unknown' },
    floorPrice: { type: Number },
    volume: { type: Number },
    chain: { type: String, default: 'Unknown' },
    currency: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('nft', myschema);

