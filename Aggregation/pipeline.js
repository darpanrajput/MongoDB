//caculate the all females that are living in a particular state.

db.contacts.aggregate([
    { $match: { gender: "female" } },
    { $group: { _id: { state: "$location.state" }, totalPerson: { $sum: 1 } } }
])

//getting data for the people who are greater than 50 and grpupong  
//them togetter to calculate the total person and average of each group(male, female)
//and sort them in decending order of their total 
//we then projected data into new format with rounded-off average age;
[{
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