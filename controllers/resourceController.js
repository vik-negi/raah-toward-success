import Resource from "../models/resource.js";

class ResourceController {
    static getAllResources = async (req, res) => {
        try {
            var resource = await Resource.find();
            return res.status(200).json({
                data: resource,
                status: "success",
                message: "Post liked successfully",
            });

        } catch (err) {
            return res.status(500).json({ status: "failed", message: err.message });
        }
    }

    static addResources = async (req, res) => {
        const { title, description, link, category } = req.body;
        try {
            if (!title && !description) {
                return res.status(400).json({
                    status: "failed",
                    message: "All fields are required",
                });
            }
            var resource = {
                title: title,
                description: description,
                category: category == null ? [] : category,
            };
            if (link) {
                resource.link = link;
            }
            var resourceModel = new Resource(resource);
            await resourceModel.save();
            return res.status(200).json({

                status: "success",
                message: "resources created successfully",
            });

        } catch (err) {
            return res.status(500).json({ status: "failed", message: err.message });
        }
    }
}

export default ResourceController;