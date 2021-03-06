const keystone = require("keystone");

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = "about";
  locals.page.title = "About SoteTalent";

  locals.organisers = [
    {
      name: "Jakub Simek",
      image: "/images/organisers/jakub.png",
      twitter: "jakubsimek",
      title: "Founder, MC, Coordinator",
      profile: "/member/sharkie"
    },
    {
      name: "Gift N. Mtambo",
      image: "/images/organisers/mtambo.png",
      twitter: "giftnmtambo",
      title: "Community coordinator",
      profile: "/member/jed-watson"
    },
    {
      name: "Erick Mwamodo",
      image: "/images/organisers/mwamodo.png",
      twitter: "mwamodojnr",
      title: "Merglabs coordinator",
      profile: "/member/john-van-der-loo"
    }
  ];

  view.render("site/about");
};
