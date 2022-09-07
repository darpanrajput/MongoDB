### `$bucket` stage

now what does bucket do? The bucket stage allows you to output your data in, well in buckets for which you can calculate certain summary statistics. Buckets takes a group by parameter here, a group by field where you define by which field do you want to put your data into buckets
here,will go for the age,so dob.age,so here I'll refer to $dob.age. This tells bucket ok where is my input data essentially which I want to put into buckets.Then you define some boundaries and these are essentially your categories,so you could say I'm interested in my ages 0 to 18 to 30 to 50 to 80 to 120, something like this,this would now create your bucket, so the different categories you have,you want to categorize your data into.
if there is no categories that could be made out of boundaries it will be simply ignored.
<table>
<tr>
<th>Query 1</th>
<th> Output </th>

</tr>

<tr> 
<td>

```js
db.persons.aggregate[{
 $bucket: {
  groupBy: '$dob.age',//how you want to group your data
  boundaries: [ 0,18, 40, 60, 80, 120],//the categories and class[0-120]
  output: {
    //how many persons in the bucket
   numPersons: {
    $sum: 1
   },
   averageAge: {
     //average age of that bucket   
    $avg: '$dob.age'
   }
  }
 }
}]

```
</td>

<td>

```js
// the remaining boundaries were neglected we will get which was provide in the group
[{
  "_id": 18,
  "numPersons": 1778,
  "averageAge": 29.920697412823397
};
{
  "_id": 40,
  "numPersons": 1894,
  "averageAge": 49.63305174234424
},
{
  "_id": 60,
  "numPersons": 1328,
  "averageAge": 66.55798192771084
}
]
```
</td>

</tr>
</table>

alternative could to `autoBucket`

<table>
<tr>
<th>Query 2</th>
<th> Output </th>

</tr>

<tr> 
<td>

```js
db.persons.aggregate[[{
 $bucketAuto: {
  groupBy: '$dob.age',//how you want to group your data
  buckets: 5,//number of bucket that you want to create 
  //mongodb will automaticall create the classification and categorisation
  output: {
   numPersons: {
    $sum: 1
   },
   averageAge: {
    $avg: '$dob.age'
   }
  }
 }
}]]

```
</td>

<td>

<table>
<tr>
<th>doc-output-1</th>
<th>doc-output-2</th>
<th>doc-output-3</th>
<th>doc-output-4</th>
<th>doc-output-5</th>
</tr>

<tr>
<td>

```js
[{
  "_id": {
    "min": 21,
    "max": 32
  },
  "numPersons": 1042,
  "averageAge": 25.99616122840691
},
```
</d>
<td>

```js
{
  "_id": {
    "min": 32,
    "max": 43
  },
  "numPersons": 1010,
  "averageAge": 36.97722772277228
},

```

</d>
<td>

```js
{
  "_id": {
    "min": 43,
    "max": 54
  },
  "numPersons": 1033,
  "averageAge": 47.98838334946757
},

```

</d>
<td>

```js
{
  "_id": {
    "min": 54,
    "max": 65
  },
  "numPersons": 1064,
  "averageAge": 58.99342105263158
},
```
</d>
<td>

```js
{
  "_id": {
    "min": 65,
    "max": 74
  },
  "numPersons": 851,
  "averageAge": 69.11515863689776
}

```

</td>
</tr>
</table>
