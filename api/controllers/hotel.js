import Hotels from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotels(req.body);
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Delete User" });
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getallHotel = async (req, res, next) => {
  try {
    const hotels = await Hotels.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
// export const countByType = async (req, res, next) => {
//   console.log("Hello World");
//   try {
//     const hotelCount = await Hotels.countDocuments({ type: "Hotel" });
//     const apartmentCount = await Hotels.countDocuments({ type: "Apartment" });
//     const resortCount = await Hotels.countDocuments({ type: "Resort" });
//     const villaCount = await Hotels.countDocuments({ type: "Villa" });

//     res.status(200).json([
//       { type: "Hotel", count: hotelCount },
//       { type: "Apartment", count: apartmentCount },
//       { type: "Resort", count: resortCount },
//       { type: "Villa", count: villaCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };
