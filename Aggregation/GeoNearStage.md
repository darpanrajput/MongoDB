## GeoNear Stage In Aggregation
first we have to create the location index
to use the geo aggregation and to use
geolocation or the geospatial aggregation pipeline step.
 I'll run the pipeline I'll build now against
`db.transformedPersons.createIndex( {location:"2dsphere"})`
if you want to use geoNear,it has to be the first element in the pipeline because it needs to use that index and the first pipeline. then you can use other querries. So therefore if you have any other filters which you want to run directly on the collection, you can add it<br/>
`near`defines  the point location that you are currently add.<br/>
`distanceField` defines the new field that mongodb create on the fly that will be reflected in our output data which is basically a distance in m 
from the point that you mentioned.<br/>
`maxDistance` that you want to set how far the person can from the given points.<br/>
`query` if you want to write and any other query or filter the data further you can do here<br/>
`$limit` number the document you want to get in the ouput<br/>
`spherical` whether to search in circlar area or straigth distance<br/>
<table>
<tr>
<th>Query 1</th>
<th> Output </th>

</tr>

<tr> 
<td>

```js
/**
 * near: The point to search near.
 * distanceField: The calculated distance.
 * maxDistance: The maximum distance, in meters, documents can be before being excluded from results.
 * query: Limits results that match the query
 * includeLocs: Optional. Labels and includes the point used to match the document.
 * $limit: Optional. The maximum number of documents to return.
 * spherical: Defaults to false. Specifies whether to use spherical geometry.
 */
db.persons.aggregate[[{
 $geoNear: {
  near: {type: 'Point',coordinates: [ -18.4, -42.8 ]},
  distanceField: 'distance',
  maxDistance: 300000,
  query: {age: {$gte: 30 } },
  $limit: 10,
  spherical: true
 }
}]]

```
</td>

<td>

```js

[{
  "_id": {
    "$oid": "6318515e358eb881720688eb"
  },
  "location": {
    "type": "Point",
    "coordinates": [
      -18.5996,
      -42.6128
    ]
  },
  "email": "elijah.lewis@example.com",
  "name": "MR. elijah lewis",
  "birthdate": {
    "$date": {
      "$numberLong": "512462418000"
    }
  },
  "age": 32,
  "distance": 26473.52536319881
};
{
  "_id": {
    "$oid": "6318515e358eb8817206946b"
  },
  "location": {
    "type": "Point",
    "coordinates": [
      -16.8251,
      -41.9369
    ]
  },
  "email": "delores.thompson@example.com",
  "name": "MRS. delores thompson",
  "birthdate": {
    "$date": {
      "$numberLong": "450516885000"
    }
  },
  "age": 34,
  "distance": 161267.42830913173
}
]
```
</td>

</tr>
</table>