# Store your Pipeline Result into New Collection:
`{$out:"collectionName"}`
The $out operator will cause the pipeline to persist the results to the specified location (collection, S3, or Atlas). If the collection exists it will be replaced.
<table>
<tr>
<th>Query</th>
<th>output</th>
</tr>

<tr>

<td>

```js
[{
 $project: {
  _id: 0,
  name: {
   $concat: [
    {
     $toUpper: '$name.title'
    },
    '. ',
    '$name.first',
    ' ',
    '$name.last'
   ]
  },
  email: 1,
  location: {
   type: 'Point',
   coordinates: [
    {
     $convert: {
      input: '$location.coordinates.longitude',
      to: 'double',
      onError: 0,
      onNull: 0
     }
    },
    {
     $convert: {
      input: '$location.coordinates.latitude',
      to: 'double',
      onError: 0,
      onNull: 0
     }
    }
   ]
  },
  birthdate: {
   $convert: {
    input: '$dob.date',
    to: 'date'
   }
  },
  age: '$dob.age'
 }
}, {
 $project: {
  name: 1,
  email: 1,
  location: 1,
  birthdateConvertedShorcut: {
   $toDate: '$birthdate'
  },
  birthdate: 1,
  age: 1
 }
}, {
 $group: {
  _id: {
   birthdate: {
    $isoWeekYear: '$birthdate'
   }
  },
  numPerson: {
   $sum: 1
  }
 }
}, {
 $sort: {
  _id: 1,
  numPerson: 1
 }
}, {
 $out: 'transformedPerson' //it will create a collection by this and then store the pipeline result at this collection
}]

```
</td>

<td>

#### sample output
```js

{
  "_id": {
    "birthdate": {
      "$numberLong": "1944"
    }
  },
  "numPerson": 27
},

{
  "_id": {
    "birthdate": {
      "$numberLong": "1944"
    }
  },
  "numPerson": 27
},
{
  "_id": {
    "birthdate": {
      "$numberLong": "1947"
    }
  },
  "numPerson": 93
}{
  "_id": {
    "birthdate": {
      "$numberLong": "1948"
    }
  },
  "numPerson": 100
}
{
  "_id": {
    "birthdate": {
      "$numberLong": "1948"
    }
  },
  "numPerson": 100
}
{
  "_id": {
    "birthdate": {
      "$numberLong": "1948"
    }
  },
  "numPerson": 100
}
{
  "_id": {
    "birthdate": {
      "$numberLong": "1948"
    }
  },
  "numPerson": 100
}{
  "_id": {
    "birthdate": {
      "$numberLong": "1948"
    }
  },
  "numPerson": 100
}{
  "_id": {
    "birthdate": {
      "$numberLong": "1948"
    }
  },
  "numPerson": 100
}{
  "_id": {
    "birthdate": {
      "$numberLong": "1948"
    }
  },
  "numPerson": 100
}

....some more document upto 500
```
</td>
</tr>
<table>

