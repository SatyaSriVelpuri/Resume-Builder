import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';


export const createResume = async (req, res) => {
    try{
        const {title}= req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                profilePreviewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body, // Merge with any additional data from the request body
        })
        res.status(201).json(newResume);
    }
    catch (error)
    {
        res.status(500).json({message:"Failed to create resume", error:error.message});
    }

}

//get function

export const getUserResumes = async (req,res) =>{
    try {
      const resumes = await Resume.find({ userId: req.user._id }).sort({
        updatedAt: -1,
      });
      res.json(resumes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get resume", error: error.message });
    }
}

//get resume by id 
export const getResumeById = async (req,res) =>{
    try {
      const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
      if(!resume){
        return res.status(404).json({message:"Resume not found"});
      }
      res.json(resume);
    }
     catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get resume", error: error.message });
    }
}

//update resume function 
export const updateResume = async (req,res) =>{
    try {
      const resume = await Resume.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id })
        if(!resume){
            return res.status(404).json({message:"Resume not found or not authorized"})
        }   
        //merge updated resume 
        Object.assign(resume, req.body)
        //save updated resume 
        const savedResume = await resume.save();
        res.json(savedResume);
    }
    catch (error) 
    {
        res.status(500).json({ message: "Failed to update resume", error: error.message });
    }
    }

    //delete resume function
    // export const deleteResume = async (req,res) =>{


    //     try {
    //         const resume = await Resume.findOneAndDelete(
    //             { _id: req.params.id, userId: req.user._id })
    //             if(!resume){
    //                 return res.status(404).json({message:"Resume not found or not authorized"})
    //             }
    //             //create a uploads folder and store the resume there 
    //             const uploadsFolder= path.join(process.cwd(),'uploads');
    //             //delete the thumbnail 
    //             if(resume.thumbnailLink){
    //                 const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
    //                 if(fs.existsSync(oldThumbnail)){
    //                     fs.unlinkSync(oldThumbnail);
    //                 }
    //             }
    //             if(resume.profileInfo?.profilePreviewUrl){
    //                 const oldProfileImg = path.join(uploadsFolder, path.basename(resume.profileInfo?.profilePreviewUrl))
    //                 if(fs.existsSync(oldProfileImg)){
    //                     fs.unlinkSync(oldProfileImg);
    //                 }    
    //             }
    //             //delete the resume 
    //             const deleted= await Resume.findOneAndDelete({
    //                 _id: req.params.id, userId: req.user._id
    //             })
    //             if(!deleted){
    //                 return res.status(404).json({message:"Resume not found or not authorized"})
    //             }
    //             res.json({message:"Resume deleted successfully"});
    //     }
    //     catch(error)
    //     {
    //         res.status(500).json({ message: "Failed to delete resume", error: error.message });
    //     }
    // }
    // delete resume function
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or not authorized" });
    }

    // create an uploads folder and store the resume there 
    const uploadsFolder = path.join(process.cwd(), 'uploads');

    // delete the thumbnail 
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
    }

    // delete the profile image 
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfileImg = path.join(uploadsFolder, path.basename(resume.profileInfo?.profilePreviewUrl));
      if (fs.existsSync(oldProfileImg)) {
        fs.unlinkSync(oldProfileImg);
      }
    }

    // ✅ At this point, resume is already deleted
    return res.json({ message: "Resume deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete resume", error: error.message });
  }
};
