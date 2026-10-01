const express = require("express");

const router = express.Router();

router.get("/hello", (req, res) => {
    console.log("✅ Frontend connected to /api/hello");
    res.json({
        message: "Connected! This message came from the Hamro Aawaj backend"
    });
});

module.exports = router;