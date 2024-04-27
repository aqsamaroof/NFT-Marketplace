const mongoose = require('mongoose');

const url = "mongodb+srv://aqsa8299:1234@cluster0.vaizmgh.mongodb.net/nftmarketplace?retryWrites=true&w=majority&appName=Cluster0"

// asynchronous functions - return Promise object
mongoose.connect(url)
.then((result) => {
    console.log('database connected successfully');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;