const {Schema,model} = require('mongoose');

const ROLES = [
  "frontend developer",
  "backend developer",
  "cloud engineer",
  "system admin",
  "full stack developer",
  "project manager",
  "ux designer",
  "director",
];

const LEVELS = ["junior", "senior"];
const GENDERS = ["female", "male"];
const MINAGE = 18;

const CURRENT_YEAR = new Date().getFullYear();

const MemberSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 60,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 60,
      required: true,
    },
    gender: {
      type: String,
      enum: GENDERS,
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
      min: [1900, "birthYear too small"],
      max: [CURRENT_YEAR-MINAGE, "birthYear cannot be in the future, and you must be at least 18 years to be a member."],
    },
    role: {
      type: String,
      enum: ROLES,
      required: true,
    },
    level: {
      type: String,
      enum: LEVELS,
      required: true,
    },
    experienceYears: {
      type: Number,
      min: [0, "experienceYears must be >= 0"],
      max: [60, "experienceYears unrealistic"],
      default: 0,
      validate: {
        validator(v) {
          // Basic sanity: cannot exceed working-years since age 18
          const maxPossible = Math.max(0, CURRENT_YEAR - this.birthYear - 18);
          return v <= maxPossible + 1; // +1 wiggle for boundary
        },
        message:
          "experienceYears exceeds possible working years for given birthYear",
      },
    },
    salary: {
      type: Number,
      min: [450000, "salary below lower bound"],
      max: [2000000, "salary above upper bound"],
      required: true,
    },
    socialSecurityNumber: {
      type: String,
      required: true,
      unique: true,
      // 11 digits; Mod11 not re-validated here (handled by generator)
      match: [/^\d{11}$/, "SSN must be 11 digits"],
    },
    imageUrl: {
      type: String,
      default: "/img/employees/stock.png",
    },
  },
  {
    collection: "members",
    timestamps: true,
  }
);

// Optional: normalize casing on names
MemberSchema.pre("save", function (next) {
  if (this.firstName) this.firstName = this.firstName.trim();
  if (this.lastName) this.lastName = this.lastName.trim();
  next();
});

module.exports = model("Member", MemberSchema);