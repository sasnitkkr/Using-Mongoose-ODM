/* Donot use nodemon - causes multiple writes if saves multiple times */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB',{useNewUrlParser: true, useUnifiedTopology: true});

/* ------------ FRUITS COLLECTION/TABLE ------------ */

/* Creating Schema */
const fruitSchema = new mongoose.Schema({
    name : String,
    rating : Number,
    review : String
});

/* Creating Model */
                            // mongoose automatically creates 'fruits' collection/table
const Fruit = mongoose.model('Fruit', fruitSchema);

/* Adding Data to collection */

const apple = new Fruit({
    name: "Apple",
    rating : 5,
    review : "Apple a day!!"
});

// apple.save();

/* ------------ PEOPLE COLLECTION/TABLE ------------ */

const peopleSchema = mongoose.Schema({
    name: String,
    age : Number
});

const People = new mongoose.model('People', peopleSchema);

const john = new People({
    name : "John",
    age : 37
});

// john.save();

/* ----- ADDING SOME MORE FRUITS -----*/


const pineApple = new Fruit({
    name : "Pine Apple",
    rating : 5,
    review: "Sweet and Sour"
});

const banana = new Fruit({
    name : "Banana",
    rating : 5,
    review : "Healthy!" 
});

const kiwi = new Fruit({
    name : "Kiwi",
    rating : 5,
    review : "Expensive and Healthy"
});

// Fruit.insertMany([pineApple, banana, kiwi], function(err, docs){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Fruits Array stored successfully!");
//     }
// });

/* Reading Data from Collection */
Fruit.find({}, function(err, docs){
    if(err){
        console.log(err);
    }else{
        // It is good practice to close connection after last interaction with database
        mongoose.connection.close();
        console.log("Read Successfully!");
        docs.forEach(element => {
            console.log(element.name);
        });
    }
});




