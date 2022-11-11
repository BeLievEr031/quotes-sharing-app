import QuotesModel from "../models/QuotesModel.js";
import UserModel from "../models/UserModel.js";

const geAllQuotes = async (req, res) => {
  try {
    const quotes = await QuotesModel.find().populate("author");
    res.json({
      success: true,
      quotes,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const createQuotes = async (req, res) => {
  const user = req.user;
  const { quote } = req.body;
  console.log(quote);
  if (!quote) {
    return res.json({
      success: false,
      msg: "All fields required..",
    });
  }

  try {
    const newQuote = await new QuotesModel({
      quote,
      author: {
        name: user.name,
        id: user._id,
      },
    });
    await newQuote.save();
    user.quotes.push(newQuote._id);
    await user.save();
    res.json({
      success: true,
      msg: "Quotes uploaded",
      newQuote,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const deleteQuote = async (req, res) => {
  const user = req.user;
  const { quoteID } = req.params;

  try {
    if (!quoteID) {
      return res.json({
        success: false,
        msg: "Invalid quote",
      });
    }

    let deleteQuote = await QuotesModel.findById(quoteID);

    if (!deleteQuote) {
      return res.json({
        success: false,
        msg: "Invalid quote",
      });
    }

    const isValidUser =
      JSON.stringify(user._id) === JSON.stringify(deleteQuote.author);

    if (!isValidUser) {
      return res.json({
        success: false,
        mag: "Invalid user",
      });
    }

    let idx = user.quotes.indexOf(quoteID);
    user.quotes.splice(idx, 1);
    await user.save();

    deleteQuote.likes.forEach(async (userid) => {
      let tempUser = await UserModel.findById(userid);
      let idx = tempUser.likeQuotes.indexOf(deleteQuote._id);
      tempUser.likeQuotes.splice(idx, 1);
      await tempUser.save();
    });

    await deleteQuote.remove();
    res.json({
      success: true,
      msg: "Quotes Deleted Successfully...",
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const updateQuote = async (req, res) => {
  const user = req.user;
  const { quoteID } = req.params;
  console.log(quoteID);
  const { quote } = req.body;
  try {
    if (!quoteID) {
      return res.json({
        success: false,
        msg: "Invalid quote",
      });
    }

    let updateQuote = await QuotesModel.findById(quoteID);

    console.log(updateQuote);
    if (!updateQuote) {
      return res.json({
        success: false,
        msg: "Invalid quote",
      });
    }

    const isValidUser =
      JSON.stringify(user._id) === JSON.stringify(updateQuote.author);

    if (!isValidUser) {
      return res.json({
        success: false,
        msg: "Invalid User...",
      });
    }

    await QuotesModel.findByIdAndUpdate(quoteID, {
      $set: {
        quote,
      },
    });
    await updateQuote.save();
    res.json({
      success: false,
      msg: "Quote updated successfully...",
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const likeAndUnlikeQuote = async (req, res) => {
  const user = req.user;
  const { quoteID } = req.params;
  try {
    if (!quoteID) {
      return res.json({
        success: false,
        msg: "Invalid quote",
      });
    }
    const quote = await QuotesModel.findById(quoteID);

    if (!quote) {
      return res.json({
        success: false,
        msg: "Invalid quote",
      });
    }

    let idx = quote.likes.indexOf(user._id);

    if (idx !== -1) {
      quote.likes.splice(idx, 1);
      await quote.save();

      idx = user.likeQuotes.indexOf(quote._id);
      user.likeQuotes.splice(idx, 1);
      await user.save();

      res.json({
        success: true,
        msg: "Quote Unliked successfully...",
      });
    } else {
      quote.likes.push(user._id);
      await quote.save();

      user.likeQuotes.push(quote._id);
      await user.save();

      res.json({
        success: true,
        msg: "Quote Liked successfully...",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

export {
  geAllQuotes,
  createQuotes,
  deleteQuote,
  updateQuote,
  likeAndUnlikeQuote,
};
