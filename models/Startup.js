const keystone = require("keystone");
const Types = keystone.Field.Types;

/**
 * Startups Model
 * ===================
 */

const Startup = new keystone.List("Startup", {
  track: true,
  autokey: { path: "key", from: "name", unique: true }
});

Startup.add({
  name: { type: String, index: true },
  logo: { type: Types.CloudinaryImage },
  website: Types.Url,
  isHiring: Boolean,
  description: { type: Types.Markdown },
  location: Types.Location,
  members: { type: Types.Relationship, ref: "User" }
});

/**
 * Relationships
 * =============
 */

//  Founders For the Given Startup (Should be user)
Startup.relationship({
  ref: "User",
  refPath: "startup",
  path: "members"
});

/**
 * Registration
 * ============
 */

Startup.defaultColumns = "name, website, isHiring";
Startup.register();
