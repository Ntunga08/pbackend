import testmonial from "../models/testmonialmodel.js";

export const getTestmonials = async (req, res) => {
  try {
    const testmonials = await testmonial.find();
    res.status(200).json({
      success: true,
      data: testmonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const createTestmonial = async (req, res) => {
  try {
    const newTestmonial = await testmonial.create(req.body);
    res.status(201).json({
      success: true,
      data: newTestmonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const updateTestmonial = async (req, res) => {
  try {
    const updatedTestmonial = await testmonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTestmonial) {
      return res.status(404).json({
        success: false,
        error: 'Testmonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTestmonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteTestmonial = async (req, res) => {
  try {
    const deletedTestmonial = await testmonial.findByIdAndDelete(req.params.id);

    if (!deletedTestmonial) {
      return res.status(404).json({
        success: false,
        error: 'Testmonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
export const getTestmonialById = async (req, res) => {
  try {
    const testmonialItem = await testmonial.findById(req.params.id);

    if (!testmonialItem) {
      return res.status(404).json({
        success: false,
        error: 'Testmonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testmonialItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

