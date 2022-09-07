# Applying Multiple Operators to our array
So let's say we now wanted to transform our friend objects such that we only output the highest exam score
for every person,so we no longer have the exam scores array, we still only get three person results but we have no examscores in there but only the highest exam score.
[Sample Input Document](SampleInputDocumentTable.md)

<table>
<tr>
<th>Query 1</th>
<th> Output  </th>
</tr>

<tr> 
<td>

```js
db.collectionName.aggregate[
    
{$unwind: '$examScores'}, 
 
 {
 $project: {
  _id: 1,
  name: 1,
  age: 1,
  score: '$examScores.score'
 }
}, {
 $group: {
  _id: '$_id',
  name: {
   $first: '$name'
  },
  maxScore: {
   $max: '$score'
  }
 }
}, {
 $sort: {
  maxScore: -1
 }
}]

```
</td>

<td>

```js
[{
  "_id": {
    "$oid": "631721c7fee4245756dba72b"
  },
  "name": "Max",
  "maxScore": 88.5
},

{
  "_id": {
    "$oid": "631721c7fee4245756dba72d"
  },
  "name": "Maria",
  "maxScore": 75.1
}
,

{
  "_id": {
    "$oid": "631721c7fee4245756dba72c"
  },
  "name": "Manu",
  "maxScore": 74.3
}]

```
</td>

</tr>
</table>