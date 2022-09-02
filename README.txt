==============================================================================================================================================================================================
signup API

post - http://localhost:8000/signup    (create new user to db)

req.body format                                user signup schema

{
  "firstName": "Shubham",                       //{ type: String, trim: true, required: true }
  "lastName": "Verma",                          //{ type: String, trim: true, required: true }
  "email": "shubham.verma@neosoftmail.com",     //{ type: String, required: true, trim: true, lowercase: true, unique: true }
  "password": "abcdef",                         //String
  "confirmPassword": "abcdef"                   //String
}

==============================================================================================================================================================================================

login API

get - http://localhost:8000/login     (returns auth-token for access other APIs)



req.query params

parameters             value

email                shubham.verma@neosoftmail.com
password             abcdef

res.header   // in returns you get a token for accessing the question paper related query 

header                 values //token for verification

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzEwYmMwOWYyMjQ1MDI0ZTA4YzM0OTAiLCJpYXQiOjE2NjIxMTk3ODR9.Z5X5PyoKAPU3tRcQA0hMcIuykNsEH7nxSav7pKf4hVM

==============================================================================================================================================================================================

blogs APIs

get blog from db

get - http://localhost:8000/blog/blogs   (returns blogs from db on the basis of query params)

req.query params

parameters           value

userId           returns mentioned users all blogs from db

OR

Title            returns mentioned title base blogs papers from db

OR

Tags            returns mentioned tags base blogs papers from db
 
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

add new blog 

post - http://localhost:8000/blog/add-blog   (create new blog to db)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzEwYmMwOWYyMjQ1MDI0ZTA4YzM0OTAiLCJpYXQiOjE2NjIxMTk3ODR9.Z5X5PyoKAPU3tRcQA0hMcIuykNsEH7nxSav7pKf4hVM

req.body format                                   

{
    userId: {                    //userId of the person who adding blog
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true,
        mainLength: 5,
        maxLength: 50
    },
    body: {
        type: String,
        required: true,
        mainLength: 10,
        maxLength: 255
    },
    tags: [String],
    comments: {
        type: [commentSchema]
    }
}

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

add new comment 

post - http://localhost:8000/blog/add-comment   (create new comment to blog)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzEwYmMwOWYyMjQ1MDI0ZTA4YzM0OTAiLCJpYXQiOjE2NjIxMTk3ODR9.Z5X5PyoKAPU3tRcQA0hMcIuykNsEH7nxSav7pKf4hVM

req.query params

parameters           value

id                  id of the blog you want to comment

req.body format                                   
{
    userId: {                    //userId of the person who adding comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        required: true,
        maxLength: 100
    }
}

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

edit blog

post - http://localhost:8000/blog/edit-blog   (edit blogs)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzEwYmMwOWYyMjQ1MDI0ZTA4YzM0OTAiLCJpYXQiOjE2NjIxMTk3ODR9.Z5X5PyoKAPU3tRcQA0hMcIuykNsEH7nxSav7pKf4hVM

req.query params

parameters           value

userId             id of the person who want to edit blog // if person is not the blog writer person can't add the blog

req.body format              // parameters that will not empty while updating, will be update in db                    
{
    "title" : "",
    "body" :  "",
    "tags" : ""
}

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------