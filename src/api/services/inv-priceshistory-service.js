const ztpricesHistory = require("../models/mongodb/ztpriceshistory");

//FIC: GET PRODUCT OR SERVICE BY ID
async function GetAllPricesHistory(req) {
  try {
    const IdPrice = parseInt(req.req.query?.IdPrice);
    const IniVolume = parseFloat(req.req.query?.IniVolume);
    const EndVolume = parseFloat(req.req.query?.EndVolume);
    //const { IdPrice } = req.req.query;
    //IdPrice = parseInt(IdPrice);

    let pricesHistory;
    if (IdPrice >= 0) {
      pricesHistory = await ztpricesHistory.findOne({ ID: IdPrice }).lean();
    } else if (IniVolume >= 0 && EndVolume >= 0) {
      pricesHistory = await ztpricesHistory
        .find({ VOLUME: { $gte: IniVolume, $lte: EndVolume } })
        .lean();
    } else {
      pricesHistory = await ztpricesHistory.find().lean();
    }
    return pricesHistory;
  } catch (error) {
    throw FAIL(error);
  } finally {
  }
}

// Add one and some
async function AddOnePricesHistory(req) {
  try {
    const newPrices = req.req.body.prices;

    let pricesHistory;
    pricesHistory = await ztpricesHistory.insertMany(newPrices, {
      order: true,
    });
    return JSON.parse(JSON.stringify(pricesHistory));
  } catch (error) {
    throw FAIL(error);
  } finally {
  }
}

module.exports = { GetAllPricesHistory, AddOnePricesHistory };
