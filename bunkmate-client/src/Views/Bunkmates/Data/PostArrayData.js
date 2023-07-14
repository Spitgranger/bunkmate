

export const postArray =
    [
        {
            firstName: 'Christina',
            avatar: "https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.jpg?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0=",
            location: 'New York City',
            postMessage: 'Looking for roommates in chicago illinois. Budget is 2600 dollars if anyone is interested please message and we will talk',
            postId: `post-id-${23}`,
            dateCreated: "06-09-2022",
            dateEdited: '',
            userId: `user-id-${24234}`,
            likes: 2,
            profile: "Christina's profile",
            comments: [['642129a8955f2f754577b53c', "I'm in the area"]],
        },
        {
            firstName: 'Jesse',
            avatar: 'https://www.realholidays.co.uk/wp-content/uploads/2018/10/Matt-Website-Profile-2-300x300-c-default.jpg',
            location: 'Chicago',
            postMessage: 'Hey everyone, I need some roommates now please. Im actively searching so please message me if youre interested, this is the place I had in mind: ',
            images: ["https://www.nobroker.in/blog/wp-content/uploads/2022/07/Modern-Bedroom-Design.jpg", "image2"],
            postId: `post-id-${10}`,
            userId: `user-id-${3253}`,
            dateCreated: "02-09-2023",
            dateEdited: '02-10-2023',
            profile: "Jesse's profile",
            likes: 15,
            comments: [['64208036e62251477f44fcad', "I love the idea"], ['64207d361f5cb6b3f8dbcf75', "I'm in the area"], ['64207d361f5cb6b3f8dbcf75', "Message me, money isn't an issue"]],
        },
        {
            //obtained from querying user profile using userID
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSezGOpQSyxqLHMV2AHhvfpW0ajntgm42b0Ew&usqp=CAU',
            //obtained from querying user profile using userID
            firstName: 'Lauren',
            //obtained from querying user profile using userID
            profile: "Lauren's profile",
            //obtained from request
            location: 'Chicago',
            //rest of data is obtained from the post
            postMessage: 'Hello everyone, im looking to move into this place. Anyone wanna be my roommate?',
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Balcony_View.jpg/1200px-Balcony_View.jpg", "image2"],
            postId: `post-id-${2434323}`,
            userId: `user-id-${242252}`,
            dateCreated: "06-02-2022",
            //this field is only filled if a post has been edited
            dateEdited: '',
            //modifiable field
            likes: 324,
            //modifiable field
            //each item within the array stores the userId as a key, and the values are the comments
            comments: [['64208a374215d240a8515fda', "The view is fantastic!!! I actually live nearby, message me if you're interested so we can meet up and grab some coffee!"], ['64208036e62251477f44fcad', "I love the idea"], ['64207d361f5cb6b3f8dbcf75', "I'm in the area"]],
        },
    ]