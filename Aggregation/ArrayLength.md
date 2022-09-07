# Array Length
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

 we can use a helpful operator, the` $size` operator which calculates the length of an array.
 <table>
<tr>
<th>Query 1</th>
<th> Output </th>
</tr>
<tr>
<td>

```js

db.fiends.aggregate[
    $project:{
  _id:0,
  numScores:{$size:"$examScores"}
}]
```
</td>

<td>

```js
[{ "numScores": 3},
{ "numScores": 3},
{ "numScores": 3}]
```
</td>
</tr>
 </table>

 [Array Filter](ArrayLength.md)