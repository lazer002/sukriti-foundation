const mon = require('mongoose')
const mongo = mon.connect('mongodb+srv://admin123:U9EfIgWx937O08k6@cluster0.r23nlsu.mongodb.net/sukriti?retryWrites=true&w=majority&appName=Cluster0')
.then((res)=>{
    console.log('connected');
})
.catch((err)=>{
console.log(err);
})

module.exports = mongo
