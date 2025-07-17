const express = require("express") ;
const router =express.Router() ;
const {listingSchema} =require("../schema.js") ;
const ExpressError = require("../utils/expressError.js") ;
const wrapAsync = require("../utils/wrapAsync.js") ;
const Listing =require("../models/listing.js") ;
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js") ;
const listingControllers = require("../controllers/listings.js") ;

router
.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn,validateListing,wrapAsync(listingControllers.createListing)) ;
//  new Route
router.get("/new" ,isLoggedIn,listingControllers.renderNewForm); 
// show route
router
.route("/:id")
.get(wrapAsync(listingControllers.showListing))
// update route
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingControllers.updateListing))
// DELETE ROUTE
.delete(isLoggedIn,isOwner,wrapAsync(listingControllers.destroyListing)) ;
//  Create route
// edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.renderEditForm));

module.exports = router ;