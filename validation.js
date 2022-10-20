db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectid and is required'
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objectid and is required'
              }
            }
          }
        }
      }
    }
  }
});


//Right POST INSERTION

db.posts.insertOne({
	
	title:"My first Post",
	text:"This is my first post i hope you liked it",
	tags:["new","tech"],
	creator:ObjectId("62fa2d7c77335a93ded6b6bb"),
	comments:[
	{
		text:"i liked it thanks",
		author:ObjectId("62fa2d7c77335a93ded6b6bd")
	}
	]
	
})
//ADD USERS

db.users.insertMany([
{
	name:"darpan",
	age:90,
	email:"darpan@rjput.gmail.com"
},
{
	name:"Ram",
	age:45,
	email:"raam@gmail.com"
},

{
	name:"shyam",
	age:56,
	email:"shyam@gmail.com"
}]
)






