const { Router } = require("express");
const router = Router();
const Model = require("../models/nftModel");

router.post("/add", (req, res) => {
  new Model(req.body)
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/auth", (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) res.json(result);
      else res.status(401).json({ message: "login failed" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
  Model.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/getbymail/:email", (req, res) => {
  Model.findOne({email : req.params.email})
    .then((result) => {
      if (result) res.json(result);
      else res.status(401).json({ message: "email not found" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});
router.put("/update/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// getbyid
router.get("/getbyid/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      if (result) res.json(result);
      else res.status(401).json({ message: "id not found" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;