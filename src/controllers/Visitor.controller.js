import { VisitorFile } from "../models/Admins/visitors.models.js";

export const uploadVisitorFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const visitorFile = new VisitorFile({
      XlFile: req.file.path || req.file.location,
    });

    await visitorFile.save();
    res.status(201).json({
      success: true,
      message: "Visitor file uploaded successfully",
      data: visitorFile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading visitor file",
      error: error.message,
    });
  }
};