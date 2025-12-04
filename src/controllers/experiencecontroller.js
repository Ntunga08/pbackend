import Experience from "../models/experience.js";
import Profile from "../models/profile.js";


export const getAllExperience =async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                error: 'Profile not found. Create a profile first.'
            });

        }
        const experiences = await Experience.find({ profile: profile._id })
            .populate('profile', 'firstname lastname email')
            .sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }       


};

export const addExperience = async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                error: 'Profile not found. Create a profile first.'
            });
        }

        const newExperience = new Experience({
            ...req.body,
            profile: profile._id
        });

        const savedExperience = await newExperience.save();

        res.status(201).json({
            success: true,
            data: savedExperience
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        }); 


    }
};

export const updateExperience = async (req, res) => {
    try {
        const {id} = req.params;

        let experience = await Experience.findById(id);
        if(!experience){
            return res.status(404).json({
                success: false,
                error: 'Experience entry not found'
            });

        }

        experience = await Experience.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: experience
        }); 
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        }); 

    }

    };

    export const deleteExperience = async (req,  res) =>{
        try { 
            const {id} = req.params;

            const experience = await Experience.findById(id);
            if(!experience){
                return res.status(404).json({
                    success: false,
                    error: 'Experience entry not found'
                });
                
            }
            await Experience.findByIdAndDelete(id);

            res.status(200).json({
                success: true,
                message: 'Experience entry deleted successfully'
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }   

    };

export const deleteExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const experience = await Experience.findByIdAndDelete(id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                error: 'Experience entry not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Experience entry deleted successfully',
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await Experience.findById(id)
            .populate('profile', 'firstname lastname email');

        if (!experience) {
            return res.status(404).json({
                success: false,
                error: 'Experience entry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};



