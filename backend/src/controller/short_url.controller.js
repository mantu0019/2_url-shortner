import { nanoid } from "nanoid";
import urlModel from "../mode/url.model.js";

export const createShort_url = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL field Is Required",
      });
    }
    const shortId = nanoid(8);

    const shortUrl = await urlModel.create({
      shortId: shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    if (!shortUrl) {
      return res.status(401).json({
        success: false,
        message: "shortURL not created",
      });
    }

    res.status(201).json({
      success: true,
      message: "shortUrl created successfully",
      shortUrl,
    });
  } catch (error) {
    console.log("something went wrong from createShort_rul controller", error);

    res.status(500).json({
      success: false,
      message: "something went wrong from createShort_rul controller",
    });
  }
};

export const getShortUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const shortUrl = await urlModel.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
    );
    console.log("this is shortUrl", shortUrl);
    if (!shortUrl) {
      return res.status(401).json({
        success: false,
        message: "shortUrl not found",
      });
    }

    return res.redirect(shortUrl.redirectUrl);
  } catch (error) {
    console.log("something went wrong from getShortUrl controller", error);

    return res.status(500).json({
      success: false,
      message: "something went wrong from getShortUrl controller",
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;

    const result = await urlModel.findOne({ shortId });

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Short Id is not provided",
      });
    }

    res.status(200).json({
      success: true,
      message: 'success',
      totalClicks: result.visitHistory.length,
      result,
    });
  } catch (error) {
    console.log("something went wrong from getAnalytics controller", error);
    res.status(500).json({
      success: false,
      message: "something went wrong from getAnalytics controller",
    });
  }
};
