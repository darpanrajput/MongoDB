# Using Projection With Arrays
Let's say you only want to output the first value of that array instead of all the exam scores.
below are the 3 input documents
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

<table>
<tr>
<th>Query 1</th>
<th>Output</th>
</tr>

<tr>
<td>

```js

db.friends.aggregate[{
  _id:0,
  examScores:{$slice:["$examScores",1]}// gives the firts value of array
}]
```
</td>

<td>

```js

[{
  "examScores": [
    {
      "difficulty": 4,
      "score": 57.9
    }
  ]
},

{
  "examScores": [
    {
      "difficulty": 7,
      "score": 52.1
    }
  ]
}
,
{
  "examScores": [
    {
      "difficulty": 3,
      "score": 75.1
    }
  ]
}]


```

</td>
</tr>

</table>



sometimes you want to you have let's say the last two, for this you can actually use a negative value

<table>
<tr>
<th>Query 2</th>
<th>Output</th>
</tr>

<tr>
<td>

```js

db.friends.aggregate[{
  _id:0,
  examScores:{$slice:["$examScores",-2]}//gives last 2 elememts from array
}]
```
</td>

<td>

```js

[{
  "examScores": [
    {
      "difficulty": 6,
      "score": 62.1
    },
    {
      "difficulty": 3,
      "score": 88.5
    }
  ]
},

{
  "examScores": [
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
,
{
  "examScores": [
    {
      "difficulty": 8,
      "score": 44.2
    },
    {
      "difficulty": 6,
      "score": 61.5
    }
  ]
}]


```

</td>
</tr>

</table>

#### This means start at position two and then give me one element

<table>
<tr>
<th>Query 3</th>
<th>Output</th>
</tr>

<tr>
<td>

```js

db.friends.aggregate[{
  _id:0,
  examScores:{$slice:["$examScores",2,1]}//gives last 2 elememts from array
}]
```
</td>

<td>

```js

[{
  "examScores": [
    {
      "difficulty": 3,
      "score": 88.5
    }
  ]
},

{
  "examScores": [
    {
      "difficulty": 5,
      "score": 53.1
    }
  ]
}
,
{
  "examScores": [
    {
      "difficulty": 6,
      "score": 61.5
    }
  ]
}]


```

</td>
</tr>

</table>

[Array Length calculation](ArrayLength.md)