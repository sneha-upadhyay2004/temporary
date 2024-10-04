const Listing = require("../models/listing");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    };
//new formmmmmmm
    module.exports.renderNewForm = (req,res) => {
        res.render("listings/new.ejs");
    };
    ///show formmmmmmmmmmmmm
    module.exports.showListing = async(req,res)=>{
        let {id} = req.params;
        const listing =  await Listing.findById(id)
        .populate({
            path: "reviews",
            populate:{
                path:"author",
            },
        })
        .populate("owner");
        if(!listing){
            req.flash("error", "Listing you requested for does not exist");
            res.redirect("/listings")
        }
        res.render("listings/show.ejs",{listing})
     }
     ///////create listingggggggg
     module.exports.createListing = async (req,res,next) => {
      let url = req.file.path;
      let filename = req.file.filename;
      console.log(url, "..", filename)
        const newListing = new Listing (req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url, filename};
        // newListing.image = {
        //     url: url,
        //     filename:filename
        // },
       await newListing.save();
       req.flash("success", "New Listing Created")
        res.redirect("/listings");        
 }
     ////////////edit routeeeeeeee
     module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{listing});
     }
     /////////////update listings
     module.exports.updateListings = async(req,res)=>{  
    
        const { id } = req.params;
        // const { listing } = req.body; // listing object comes from the form
        await Listing.findByIdAndUpdate(id, listing, { new: true });
        req.flash("success", "Listing Updated")
        res.redirect(`/listings/${id}`);
     }

     ///module.deleteeeeeeeee
     module.exports.destroyListing = async(req,res) =>{
        let{id} =  req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted")
        res.redirect("/listings");
     }