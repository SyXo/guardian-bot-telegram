const express = require("express");

// Routes
// const customRoutes = require("./src/custom/custom.routes");

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/**
 * @api {get} /pdf-delivery/v1/health-check Get return "Service Up!"
 * @apiExample {get} Example usage:
 * http://apiurl/pdf-delivery/v1/health-check
 * @apiName Gethealth-check
 * @apiGroup HealthCheck
 *
 *
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.get("/v1/health-check", (req, res) =>
  res.status(200).json({
    message: "Service Up!",
  })
);

// mount routes at /custom
// router.use("/v1/custom", customRoutes);

module.exports = router;
