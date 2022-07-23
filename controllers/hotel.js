const Hotel = require("../models/Hotel.js");
const Room = ("../models/Room.js");

module.exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
module.exports.updateHotel = async (req, res, next) => {
  try {
    console.log(req.body, req.params.id)
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
module.exports.getHotel = async (req, res, next) => {
  try {
    if(req.params.id != 'undefined'){
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } else {
      res.status(200).json({})
    }
    
  } catch (err) {
    console.log('disini error', req.params.id)
    next(err);
  }
};
module.exports.getHotels = async (req, res, next) => {
  const { title } = req.query;
  try {
    const params = {}

    if (title) {
      const titleRegex = new RegExp(title, 'i')
      params['title'] = titleRegex
    }

    console.log('ini params', params)

    const hotels = await Hotel.find(params)
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
module.exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
module.exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
