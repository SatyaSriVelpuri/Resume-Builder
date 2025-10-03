// import mongoose from 'mongoose';

// const resumeSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   thumbnailLink: { type: String },
//   template: { type: String, colorPalette:{String} },
//   profileInfo: {
//     profilePreviewUrel:String,
//     fullName:String,
//     designation: String,
//     summary:String,
//   },
//     contactInfo: {
//     email: String,
//     phone: String,
//     location: String,
//     linkedin: String,
//     github: String,
//     website: String,
//   },
//   //work experience section
//     workExperience: [  
//         {
//             company:String,
//             role:String,
//             startDate:String,
//             endDate:String,
//             description:String,
//         },
//     ],
//     //education section
//     education: [
//         {
//             degree:String,
//             institution:String,
//             startDate:String,
//             endDate:String,
//         },
//     ],
//     //skills section
//     skills: [
//         {
//             name :String,
//             progress:Number,
//         }
//     ],
//     //projects section
//     projects: [
//         {   
//             title:String,
//             description:String,
//             gitLink:String,
//             liveDemo:String,
//         },
//     ],
//     //certifications section
//     certifications: [
//         {
//             title:String,
//             issuer:String,
//             year:String,
//         },
//     ],
//     languages: [
//         {
//             name:String,
//             progress:Number,
//         },
//     ],
//     interests: [String],
// }
// {
//     timestamps:{createdAt:"createdAt", updatedAt:"updatedAt"}
// }
// );

// export default mongoose.model('Resume', ResumeSchema);
import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { type: String, required: true },
    thumbnailLink: { type: String },

    // Fixed template field
    template: {
      type: String,
      colorPalette: [String] 
    },
    
    profileInfo: {
      profilePreviewUrl: String, // fixed typo
      fullName: String,
      designation: String,
      summary: String,
    },

    contactInfo: {
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      website: String,
    },

    // Work experience section
    workExperience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    // Education section
    education: [
      {
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
      },
    ],

    // Skills section
    skills: [
      {
        name: String,
        progress: Number,
      },
    ],

    // Projects section
    projects: [
      {
        title: String,
        description: String,
        gitLink: String,
        liveDemo: String,
      },
    ],

    // Certifications section
    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],

    languages: [
      {
        name: String,
        progress: Number,
      },
    ],

    interests: [String],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export default mongoose.model("Resume", ResumeSchema);
