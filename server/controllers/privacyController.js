import PrivacyPolicy from "../models/PrivacyPolicy.js";

export const getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne({ isActive: true }).sort({ updatedAt: -1 });

    if (!policy) {
      return res.status(200).json({
        success: true,
        policy: {
          title: "Privacy Policy",
          summary: "This privacy policy explains how we handle personal information on this website.",
          content: "We respect your privacy and only collect data necessary to provide and improve our services. Information may be used for contact, communication, and service delivery. We do not sell personal information to third parties. Please contact us if you have questions about how your data is handled.",
          isActive: true,
        },
      });
    }

    res.status(200).json({
      success: true,
      policy,
    });
  } catch (error) {
    console.error("Get privacy policy error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while getting privacy policy",
    });
  }
};

export const getAllPrivacyPolicies = async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find().sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      policies,
    });
  } catch (error) {
    console.error("Get all privacy policies error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while getting privacy policies",
    });
  }
};

export const createPrivacyPolicy = async (req, res) => {
  try {
    const { title, summary, content, isActive } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Privacy policy content is required",
      });
    }

    const existingPolicy = await PrivacyPolicy.findOne();

    if (existingPolicy) {
      return res.status(409).json({
        success: false,
        message: "Privacy policy already exists. Update the current policy instead.",
      });
    }

    const policy = await PrivacyPolicy.create({
      title: title || "Privacy Policy",
      summary: summary || "",
      content,
      isActive: isActive !== false,
    });

    res.status(201).json({
      success: true,
      message: "Privacy policy created successfully",
      policy,
    });
  } catch (error) {
    console.error("Create privacy policy error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating privacy policy",
      error: error.message,
    });
  }
};

export const updatePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, isActive } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Privacy policy content is required",
      });
    }

    const policy = await PrivacyPolicy.findByIdAndUpdate(
      id,
      {
        title: title || "Privacy Policy",
        summary: summary || "",
        content,
        isActive: isActive !== undefined ? isActive : true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Privacy policy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Privacy policy updated successfully",
      policy,
    });
  } catch (error) {
    console.error("Update privacy policy error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating privacy policy",
      error: error.message,
    });
  }
};

export const deletePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const policy = await PrivacyPolicy.findByIdAndDelete(id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Privacy policy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Privacy policy deleted successfully",
    });
  } catch (error) {
    console.error("Delete privacy policy error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting privacy policy",
    });
  }
};