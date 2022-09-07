# Pushing elements into newly created Arrays

#### sample Table
| Document 1       | Document 2   | Document 3           |
| :--------------- | :----------- | :------------------- |
| **Hello**        | *more stuff* | [Google](google.com) |
| **you can also** | put pipes\|  | [Google](google.com) |


| Col 1            | col 2        | col 3                                              |
| :--------------- | :----------- | :------------------------------------------------- |
| **Hello**        | *more stuff* | [Google](google.com)                               |
| **you can also** | put pipes\|  | `"_id": {` `"$oid": "631721c7fee4245756dba72b" `}` |




#### sample input document



```js

{
  "_id": {
    "$oid": "631721c7fee4245756dba72b"
  },
  "name": "Max",
  "hobbies": [
    "Sports",
    "Cooking"
  ],
  "age": 29,
  "examScores": [
    {
      "difficulty": 4,
      "score": 57.9
    },
    {
      "difficulty": 6,
      "score": 62.1
    },
    {
      "difficulty": 3,
      "score": 88.5
    }
  ]
}

```
#### query

```js

db.friends.aggregate[{
 $group: {
  _id: {
   age: '$age'
  },
  allHobbies: {
   $push: '$hobbies'
  }
 }
}]

```

#### sample out of the above query

here the new `allHobbies` array contains the `hobbies` item but in 
nested structure we want only the single item.
this query justify the hobbies associated with a particular age group
as we have taken `age` as `the _id`
```js   
{
  "_id": {
    "age": 29
  },
  "allHobbies": [
    [
      "Sports",
      "Cooking"
    ],
    [
      "Cooking",
      "Skiing"
    ]
  ]
}

```

# $unwind: to individually adding the element of an array
unwind takes one document and spits out multiple document.
*here is somple innput documents that we used to querry our data.*
<table>
<tr>
<th>Document 1</th>
<th> Document 2 </th>
<th> Document 3 </th>
</tr>

<tr> 
<td>

```js
{
  "_id": {
    "$oid": "631721c7fee4245756dba72b"
  },
  "name": "Max",
  "hobbies": [
    "Sports",
    "Cooking"
  ],
  "age": 29,
  "examScores": [
    {
      "difficulty": 4,
      "score": 57.9
    },
    {
      "difficulty": 6,
      "score": 62.1
    },
    {
      "difficulty": 3,
      "score": 88.5
    }
  ]
}

```
</td>

<td>

```js
{
  "_id": {
    "$oid": "631721c7fee4245756dba72c"
  },
  "name": "Manu",
  "hobbies": [
    "Eating",
    "Data Analytics"
  ],
  "age": 30,
  "examScores": [
    {
      "difficulty": 7,
      "score": 52.1
    },
    {
      "difficulty": 2,
      "score": 74.3
    },
    {
      "difficulty": 5,
      "score": 53.1
    }
  ]
}

```
</td>

<td>

```js

{
  "_id": {
    "$oid": "631721c7fee4245756dba72d"
  },
  "name": "Maria",
  "hobbies": [
    "Cooking",
    "Skiing"
  ],
  "age": 29,
  "examScores": [
    {
      "difficulty": 3,
      "score": 75.1
    },
    {
      "difficulty": 8,
      "score": 44.2
    },
    {
      "difficulty": 6,
      "score": 61.5
    }
  ]
}
```
</td>
</tr>
</table>

### Aggregation function
<table>
<tr>
  <th>Query 1</th>
  <th>Output</th>

</tr>
<tr>
<td>

```js
db.friends.aggregate[
  //unwinding the array element
  {
 $unwind: {
  path: '$hobbies'
 }
}]
```
</td>

<td>

```js
[{
  "_id": {
    "age": 30
  },
  "allHobbies": [
    [
      "Eating",
      "Data Analytics"
    ]
  ]
},
{
  "_id": {
    "age": 29
  },
  "allHobbies": [
    [
      "Sports",
      "Cooking"
    ],
    [
      "Cooking",
      "Skiing"
    ]
  ]
}]
```
</td>
</tr>


</table>
<table>
<tr>
<th>Query 2 on Input Document</th>
<th>output</th>
</tr>
<tr>
<td>

```js
db.friends.aggregate[
  //unwinding the array element
  {
 $unwind: {
  path: '$hobbies'
 }
}, 
//grouping 
{
 $group: {
  _id: {
   age: '$age'
  },
  allHobbies: {
   $push: '$hobbies'
  }
 }
}]
```
</td>

<td>

```js
  [{
  "_id": {
    "age": 30
  },
  "allHobbies": [
    "Eating",
    "Data Analytics"
  ]
},

{
  "_id": {
    "age": 29
  },
  "allHobbies": [
    "Sports",
    "Cooking",
    "Cooking",
    "Skiing"
  ]
}]
```
</td>
</tr>
</table>
You might not want duplicate values and to avoid that,
you can use an alternative to push. Instead of push, you can use add to set, add to set does almost the same
but if I run it, you see now we have no duplicate values because add to set essentially also pushes
but avoids duplicate values. If it finds that an entry already exists,
it just doesn't push the new value,
this is what adds to set does.
So with that, with unwind, with push in the group stage and with add to set in the group stage

</table>
<table>
<tr>
<th>Query 3 on Input Document</th>
<th>output</th>
</tr>
<tr>
<td>

```js
db.friends.aggregate[  
{//unwinding the array element
 $unwind: {
  path: '$hobbies'
 }
}, 
//grouping 
{
 $group: {
  _id: {
   age: '$age'
  },
  allHobbies: {
   $addToSet: '$hobbies'
  }
 }
}]
```
</td>

<td>

```js
  [{
  "_id": {
    "age": 29
  },
  "allHobbies": [
    "Sports",
    "Cooking",
    "Skiing"
  ]
},

{
  "_id": {
    "age": 30
  },
  "allHobbies": [
    "Eating",
    "Data Analytics"
  ]
}]
```
</td>
</tr>
</table>

### [Projection in Arrays](UsingProjectionWithArrays.md)
