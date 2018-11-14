var scrape = require("../scripts/scrape");

var articlesController = require("../controller/articles");
var commentsController = require("../controller/comments");

module.exports = function (router) {
  router.get("/", function (req, res) {
    res.render("index");
  });

  router.get("/saved", function (req, res) {
    res.render("article");
  });


  router.get("/api/fetch", function (req, res) {
    articlesController.fetch(function (err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today. Check back soon!"
        });
      } else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  router.get("/api/articles", function (req, res) {
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }

    articlesController.get(query, function (data) {
      res.json(data);
    });
  });

  router.delete("/api/articles/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    articlesController.delete(query, function (err, data) {
      res.json(data);
    });
  });

  router.patch("/api/articles", function (req, res) {
    articlesController.update(req.body, function (err, data) {
      res.json(data);
    });
  });

  router.get("/api/comments/:article_id?", function (req, res) {
    var query = {};
    if (req.params.article_id) {
      query._id = req.params.article_id;
    }

    commentsController.get(query, function (err, data) {
      res.json(data);
    });
  });

  router.delete("/api/comments/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    commentsController.delete(query, function (err, data) {
      res.json(data);
    });
  });

  router.post("/api/comments", function (req, res) {
    commentsController.save(req.body, function (data) {
      res.json(data);
    });
  });

  router.delete("/api/clear", function (req, res) {
    var query = {};
    articlesController.delete(query, function (err, data) {
      res.json(data);
    });
  });
}