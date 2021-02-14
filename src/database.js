const mongoose = require('mongoose');

const promiseRetry = require('promise-retry');

promiseRetry({retries: 200, factor: 2, minTimeout: 1000, maxTimeout: 4000}, 
    async (retry, number) => {
    console.log('attempt number', number);
 
    return await mongoose.connect('mongodb://localhost/printerclientdb', {
        useFindAndModify: false, 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
    })
    .catch(retry);
})
.then(function (db) {
    console.log('Database is connected')
}, function (err) {
    console.log(err)
});


