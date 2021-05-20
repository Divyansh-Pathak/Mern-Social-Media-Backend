const express = require("express");
const router = express.Router();

router.get("/communities", async (req, res) => {
    console.log("/communities Fire");
    const communityData = [
    {
        communityName:"Music",
        communityDisc:"This Community is for Music Lovers"

    },
    {
        communityName:"Art Lover",
        communityDisc:"This Community is for them who loves evry type of art"

    },
    {
        communityName:"Pantings",
        communityDisc:"This Community is for them who have interest in paintings"

    },
    {
        communityName:"Coders",
        communityDisc:"This Community is for programmers"

    },
    {
        communityName:"Computer Science",
        communityDisc:"This Community is dedicated to computer science"

    },
    {
        communityName:"Photography",
        communityDisc:"This Community is for Photographers"

    },
    {
        communityName:"Market News",
        communityDisc:"This Community provides you the recent news related to market and business"

    },
]

res.json(communityData);
  
});

  module.exports = router;