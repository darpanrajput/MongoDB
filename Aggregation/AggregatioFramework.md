# 1.Count all females who are living in a particular state.
```js
db.contacts.aggregate([
    { $match: { gender: "female" } },
    { $group: { _id: { state: "$location.state" }, totalPerson: { $sum: 1 } } }
])
```
getting data for the people who are greater than 50 and grpupong  
them togetter to calculate the total person and average of each group(male, female)
and sort them in decending order of their total 
we then projected data into new format with rounded-off average age;

```js
db.contacts.aggregate[{
    $match: {
        'dob.age': {
            $gt: 50
        }
    }
}, {
    $group: {
        _id: {
            gender: '$gender'
        },
        totalPerson: {
            $sum: 1
        },
        avgAge: {
            $avg: '$dob.age'
        }
    }
}, {
    $sort: {
        totalPerson: -1
    }
}, {
        $project: {
            _id: 1,
            totalPerson: 1,
            roundedAvg: {
                $ceil: '$avgAge'
            }
        }
    }]

```

## Projecting the first and last name with capitalising the first characting of each

#### Sample Data
```js
{
  "_id": {
    "$oid": "630c993524a57debf0a15490"
  },
  "gender": "female",
  "name": {
    "title": "miss",
    "first": "maeva",
    "last": "wilson"
  },
  "location": {
    "street": "4962 36th ave",
    "city": "jasper",
    "state": "northwest territories",
    "postcode": "U0A 4J6",
    "coordinates": {
      "latitude": "-31.6359",
      "longitude": "111.3806"
    },
    "timezone": {
      "offset": "+9:00",
      "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
    }
  },
  "email": "maeva.wilson@example.com",
  "login": {
    "uuid": "8f2d499c-6a7e-4606-8c58-211fdb880c31",
    "username": "smallgoose815",
    "password": "weston",
    "salt": "TyL1q8hK",
    "md5": "bcedea61753320688ea27be01982556d",
    "sha1": "9e075df851fdaf292170d8e0a92c19ee37fba0f2",
    "sha256": "6f022405c6a384de3ab5cfc98cccdd97570e5b412046d05dfb79c23ae37612fa"
  },
  "dob": {
    "date": "1962-08-11T20:51:07Z",
    "age": 56
  },
  "registered": {
    "date": "2016-10-03T10:02:55Z",
    "age": 1
  },
  "phone": "727-218-6012",
  "cell": "443-382-6538",
  "id": {
    "name": "",
    "value": null
  },
  "picture": {
    "large": "https://randomuser.me/api/portraits/women/96.jpg",
    "medium": "https://randomuser.me/api/portraits/med/women/96.jpg",
    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/96.jpg"
  },
  "nat": "CA"
}

```

#### our query to get the result
```js

db.contacts.aggregate[{
 $project: {_id: 0,gender: 1,
  fullName: {
   $concat: [ {  $toUpper: '$name.title'},'. ',
    { $concat: [
      {$toUpper: {$substrCP: ['$name.first', 0,1]}},
      {$substrCP: ['$name.first',1,{$strLenCP: '$name.first'}]}
     ]
    }, ' ',

    {$concat: [
        {$toUpper: {$substrCP: ['$name.last', 0,1]}},
       { $substrCP: ['$name.last',1, { $strLenCP: '$name.last'}]}
     ]
    }
   ]
  }
 }
}]

```

#### sample out of above query

```json
{
    "gender":"male","fullName":"MR. Harvey Chambers"
}
```

# 2. Convert Location in geoJson Object
```js
db.contacts.aggregate[
    {$project:{"_id":0,
"name":{ $concat:[{$toUpper: "$name.title"}, ". ",
 "$name.first"," ","$name.last"]},
 "email":1,
 "location":{
   
   "type":"Point",coordinates:[
  {"$convert":{
    "input":"$location.coordinates.longitude",
    "to":"double",
    "onError":0.00,//onerror default
   "onNull":0.00 // default if longitude is null
  }
    
  },
   {"$convert":{
    "input":"$location.coordinates.latitude",
    "to":"double",
    "onError":0.00,//onerror default
   "onNull":0.00// default if latitude is null
   }
    
  }],
 
 },
 "birthdate":{
"$convert":{input:"$dob.date",to:"date"}},
 "age":"$dob.age",}
}
]
```
#### sample output
```js
{
"location":{
    "type":"Point",
    "coordinates":[168.9462,-22.5329]
    },

"email":"harvey.chambers@example.com",
"name":"MR. harvey chambers",
"birthdate":1988-05-27T00:14:03.000+00:00,
"age":30
}
```

### Project again the above data as input
```js
db.contacts.aggregate[{
$project:{"name":1,"email":1,"location":1,
"birthdateConvertedShorcut":{$toDate:"$birthdate"},
/*shorcut to directly converting the date without providing onError and onNull default*/
"birthdate":1,
"age":1}
}]
//another representation
db.contacts.aggregate[{
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
}]

```

#### sample output
```js

{
    "location":{
    "type":"Point",
    "coordinates":[168.9462,-22.5329]
    },
"email":"harvey.chambers@example.com",
"name":"MR. harvey chambers",
"birthdate":1988-05-27T00:14:03.000+00:00,
"age":30,
"birthdateConvertedShorcut":1988-05-27T00:14:03.000+00:00
}
```
### Grouping and sorting of above douments as input
```js
db.contacts.aggregate[{
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
},
{
     $sort: {
        _id: 1,
        numPerson: -1
    }
}
]

```


#### sample output
```js
//number of people born in year 1944 
{ _id:
    {
        birthdate:1944
    },
    numPerson:27
    
}

```

## 2.1 Whole Querry

```js
db.contacts.aggregate[{
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
},
//second->project in aggregate array
{
 $project: {
  name: 1,
  email: 1,
  location: 1,
  birthdateConvertedShorcut: {  $toDate: '$birthdate'},
  birthdate: 1,
  age: 1
 }
}, 

//third->grouping in aggregate array
{
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
},
//fourth->sorting in aggregate array
{
 $sort: {
  _id: 1,
  numPerson: -1
 }
}]
```






 


