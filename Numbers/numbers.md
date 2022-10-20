# Integers; Long; Doubles
| Interges(int32)          | Longs(int 64)           | Doubles(64bit)                                           | high Precision Doubles(128bit)                               |
| :----------------------- | :---------------------- | :------------------------------------------------------- | :----------------------------------------------------------- |
| Only full Numbers        | Only full Numbers       | Number with Decimal places                               | Number with Decimal places                                   |
| use for number intergers | use for large intergers | use with floats where high precision is **not required** | use for float intergers where high precision **is required** |
`db.numtest.insertOne({a:1.0})` here the default is 64bit double
we can force mongoDB to store the Int32 bit to save some 
sapce in the disk.`db.numtest.insertOne({age:NumberInt(29)})`

## Working with Int64
Let say we enter the value but since our integer is greater than
the capacity of Int32 it stores the completely different value.
```js
db.companies.insertOne({valuation:NumberInt("500000000000")})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6319ca266fd183095e8f1394")
}
> db.companies.findOne()
{ "_id" : ObjectId("6319ca266fd183095e8f1394"), "valuation" : 1783793664 }
>

```
when the value exceed the capacity of the data it simply 
revert back to it's negative starting values
```js
db.companies.insertOne({valuation:NumberInt("2147483647")})
{ "_id" : ObjectId("6319cadf6fd183095e8f1395"), "valuation" : 2147483647 }
```

```js
db.companies.insertOne({valuation:NumberInt("2147483648")}) //increased only by 1 to its current limit
{ "_id" : ObjectId("6319cadf6fd183095e8f1395"), "valuation" : 2147483647 }
{ "_id" : ObjectId("6319caf66fd183095e8f1396"), "valuation" : -2147483648 }
```

###### we can store the 64bit long interger:
`db.companies.insertOne({valuation:NumberLong("2147483648")}) `
<sub>*Note: we always use NumberLong(stringNumber) i.e "2147483648"*</sub>

why it is necessay to store the number as text this is because
if you want to perform some mathmatical operation it will be
easier to perfrom like {$inc:salary};
eg:
```js 
db.companies.insertOne({amount:NumberInt("10")});
db.companies.updateOne({},{$inc:{amount:10}})
> db.acc.find()
{ "_id" : ObjectId("6319cf0a6fd183095e8f1397"), "amount" : 20 }
>
//other wise $inc wouldn't worked as expected
```

#### double number precision
```js
db.science.insertOne({a:0.3,b:0.1});

> db.science.aggregate([{$project:{result:{$subtract:["$a","$b"]}}}])
{ "_id" : ObjectId("6319d06b6fd183095e8f1398"), "result" : 0.19999999999999998 }
>
// thats why we need to be careful how be store double precision
//it will be too costly if you store

```

## Working with Decimal 128bit

convert the decimal number to 128bit decimal number 
we can limit the precision digits
```js
> db.science.insertOne({a:NumberDecimal("0.3"),b:NumberDecimal("0.1")})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6319d8cb6fd183095e8f1399")
}
> db.science.aggregate([{$project:{result:{$subtract:["$a","$b"]}}}])
{ "_id" : ObjectId("6319d8cb6fd183095e8f1399"), "result" : NumberDecimal("0.2") }// here the subtraction is good
>

```
similarly this can be done to avoid while incrementing the number
`db.science.updateOne({},{$inc:{a:NumberDecimal("0.1")}})`

<sub>***Note:you can also use the scaleFactorto get the precison digitS but decimalNumber is most preferable***</sub>

