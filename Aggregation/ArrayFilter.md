# ArrayFilters
filter allows you to filter arrays in documents inside of the projection phase.
[Input Document is here](SampleInputDocumentTable.md)

`scores` is the new filed that will be created on the fly.
`$filter` is the filter operator that takes a document these are
* `input`- this our input array to be filtered.
* `as` each element will be stored in temp variable in as.
* `cond` to conditinally filter the array items.
    * `cond` is the document that takes `$gt` array.
    * `$gt` is the array that takes each array item and filter them.
    * `$$sc.score` is the each array item from *examScores*. here the `$$` is refers to the value of temp variable sc and then to extract the sore 
  we use ectra `$` symbol.

<table>
<tr>
<th>Query 1</th>
<th> Output</th>
</tr>

<tr>
 <td>

```js
db.friends.aggregate[{
 $project: {
  _id: 0,
  scores: {
   $filter: {
    input: '$examScores',
    as: 'sc',
    cond: {
     $gt: [
      '$$sc.score',
      60
     ]
    }
   }
  }
 }
}]

```

 </td>

  <td>

```js
{
  "scores": [
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
  "scores": [
    {
      "difficulty": 2,
      "score": 74.3
    }
  ]
},

{
  "scores": [
    {
      "difficulty": 3,
      "score": 75.1
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












