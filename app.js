const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Code } = require("mongodb");
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
// Middleware
const db = 'mongodb+srv://Tablebookingapp:Tablebookingapp@cluster0.4bxgp95.mongodb.net/Tablebookingapp?retryWrites=true&w=majority'

// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const hotelSchema = new mongoose.Schema({
  HotelName: { type: String },
  Address: { type: String },
  City: { type: String },
  Postalcode: { type: String },
  image: { type: String },
  rating: { type: String }

});

const BookingSchema = new mongoose.Schema({
  userId: { type: String },
  HotelName: { type: String },
  name: { type: String },
  email: { type: String },
  date: { type: String },
  time: { type: String },
  guests: { type: String }
});

const adminuserSchema = new mongoose.Schema({

  HotelName: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});



const User = mongoose.model("User", userSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
const Booking = mongoose.model('Booking', BookingSchema);
const AdminUser = mongoose.model("AdminUser", adminuserSchema);

app.post("/addlist", async (request, response) => {
  const hotels = new Hotel(request.body);

  try {
    await hotels.save();

    response.send(hotels);

  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
});

app.get('/alllist', async (req, res) => {
  try {
    // Retrieve users from MongoDB
    const hotels = await Hotel.find();

    // Send users as a response
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/book', (req, res) => {
  const newBooking = new Booking(req.body);

  newBooking.save()
    .then(() => {
      res.status(201).json({ message: 'Booking created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

app.get('/allbookings', async (req, res) => {
  try {
    // Retrieve users from MongoDB
    const booking = await Booking.find();

    // Send users as a response
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/booking-details', (req, res) => {
  const { userId } = req.query;

  Booking.find({ userId })
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const isAdmin = email === "admin@gmail.com" && password === "admin"
    console.log(isAdmin)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (isAdmin) {
      const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey2');
      return res.json({ user, jwtToken });
    } else {
      const token = jwt.sign({ userId: user._id }, 'mysecretkey1');
      console.log(token)
      return res.json({ user, token });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });
    const userCreated = await newUser.save();
    return res.status(201).json({ message: 'Successfully Registered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/user', async (req, res) => {
  try {
    // Retrieve users from MongoDB
    const users = await User.find();
    // Send users as a response
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/admin/register', async (req, res) => {
  const { HotelName, password } = req.body;

  try {
    const existingUser = await AdminUser.findOne({ HotelName });

    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new AdminUser({
      HotelName,
      password: hashedPassword
    });

    const userCreate = await newUser.save();

    return res.status(201).json({ message: 'Successfully Registered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});



app.post('/adminlogin', async (req, res) => {
  const { HotelName, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ HotelName });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const jwtToken = jwt.sign({ userId: admin._id }, 'mysecretkey2');

    return res.json({ HotelName, jwtToken });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/adminbookings/:hotelName', async (req, res) => {
  try {
    const HotelName = req.params.hotelName; // Retrieve hotel name from query parameter

    if (!HotelName) {
      return res.status(400).json({ error: 'Hotel name is required' });
    }

    // Retrieve bookings for the specified hotel name
    const bookings = await Booking.find({ HotelName });

    // Send bookings as a response
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/alllist/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const result = await Hotel.findByIdAndDelete(itemId);
    if (!result) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the item.' });
  }
});






// GET request to fetch hotel details
app.get('/listall/:id', (req, res) => {
  const id = req.params.id;

  // Find the hotel document by _id
  Hotel.findById(id)
    .then(hotel => {
      if (!hotel) {
        res.status(404).json({ error: 'Hotel not found' });
      } else {
        res.json(hotel);
      }
    })
    .catch(err => {
      console.error('Error fetching hotel details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// PUT request to update hotel details
app.put('/listall/:id', (req, res) => {
  const id = req.params.id;
  const updatedHotel = req.body;

  // Update the hotel document by _id
  Hotel.findByIdAndUpdate(id, updatedHotel, { new: true })
    .then(hotel => {
      if (!hotel) {
        res.status(404).json({ error: 'Hotel not found' });
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      console.error('Error updating hotel details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
