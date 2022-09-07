##### Additional Stages-Top next 5 Oldest People In our Data set after skipping top 10 oldest people.

<table>
<tr>
<th>Query 1</th>
<th> Output </th>

</tr>

<tr> 
<td>

```js
db.persons.aggregate[{
 $project: {
  _id: 0,
  name: {
   $concat: [
    '$name.first',
    ' ',
    '$name.last'
   ]
  },
  birthDate: {
   $toDate: '$dob.date'
  }
 }
}, {
 $sort: {
  birthDate: 1
 }
}, {
 $project: {
  name: 1,
  birthDate: {
   $year: '$birthDate'
  }
 }
}, {
 $skip: 10 //for pagination
}, {
 $limit: 5 //limit the output
}]

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
  "name": "eva murray",
  "birthDate": 1944
},
```
</td>
<td>

```js
{
  "name": "elena chevalier",
  "birthDate": 1944
},

```

</td>
<td>

```js
{
  "name": "gretchen schmidtke",
  "birthDate": 1944
},

```

</td>
<td>

```js
{
  "name": "joseph thomas",
  "birthDate": 1944
},
```
</td>
<td>

```js
{
  "name": "sarah lee",
  "birthDate": 1944
}]
```

</td>
</tr>
</table>
