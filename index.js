/* Donot use nodemon - causes multiple writes if saves multiple times */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB',{useNewUrlParser: true, useUnifiedTopology: true});

/* ------------ FRUITS COLLECTION/TABLE ------------ */

/* Creating Schema */
const fruitSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min: [1, 'Must be at least 1, got {VALUE}'],
        max: [10, 'Must be at most 10, got {VALUE}']
    },
    review : String
});

/* Creating Model */
                            // mongoose automatically creates 'fruits' collection/table
const Fruit = mongoose.model('Fruit', fruitSchema);

/* Adding Data to collection */

const apple = new Fruit({
    name: "Apple",
    rating : 56,
    review : "Apple a day!!"
});

// apple.save();

const peach = new Fruit({
    rating : 10,
    review : "yummy peach"
});

// peach.save();

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

/* ------------ Reading Data from Collection --------------*/
Fruit.find({}, function(err, docs){
    if(err){
        console.log(err);
    }else{
        // It is good practice to close connection after last interaction with database
        // mongoose.connection.close();
        console.log("Read Successfully!");
        docs.forEach(element => {
            console.log(element.name);
        });
    }
});

/* ----------- DELETE SOME EXTRA ENTRIES ADDED DUE TO NODEMON ------------ */
// 1st parameter is array-filter i.e. delete ids in
Fruit.deleteMany({_id: ["60f9a3f6318d1c18e4182587", "60f9a3f6318d1c18e4182585", "60f9a3f6318d1c18e4182586", "60fadc5eab86fc3f989c8922", "60fadc9a68b9d5344884204d"]}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Deleted Many Successfully");
    }
});

Fruit.updateOne({_id : "60fadc4725830440345ca1ca"},{name : "Peach"}, function(err){
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        console.log("Updated name to Peach, Successfully!");
    }
});




