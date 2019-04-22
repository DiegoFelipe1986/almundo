import * as express from 'express';
// ==============================================
// Database
// ==============================================
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./database/data.json');
// Allow CORS - because of the two servers (http-server and node server app)
const cors = require('cors');
const shortid = require('shortid');

class App {
  public express;
  public db;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.express.use(cors());

    this.initDatabase();
    this.mountRoutes();
  }
  // ==============================================
  // Set routes handle in the server
  // ==============================================
  private mountRoutes(): void {
    const router = express.Router();

    // ==============================================
    // Get all hotels
    // ==============================================
    router.get('/hotels', (req, res) => {
      let hotels;
      if (req.query.name && req.query.stars) {
        hotels = this.getHotelsByNameAndStars(req.query.name, this.getStarsFromQueryParam(req.query.stars));
      } else if (req.query.name && !req.query.stars) {
        hotels = this.getHotelsByName(req.query.name);
      } else if (!req.query.name && req.query.stars) {
        hotels = this.getHotelsByStars(this.getStarsFromQueryParam(req.query.stars))
      } else {
        hotels = this.getAllHotels();
      }

      res.json(hotels)
    });
    // ==============================================
    // Create a new hotel
    // ==============================================
    router.post('/hotel', (req, res) => {
      const newHotel = req.body;
      // ==============================================
      // Unique Id hotel generated
      // ==============================================
      newHotel.id = shortid.generate();
      const validationMessage = this.isHotelValid(newHotel);
      if (validationMessage === '') {
        this.db.get('hotels')
          .push(newHotel)
          .write();

        res.json({
          message: 'Great! Hotel created successfully'
        })
      } else {
        res.status(400).send({
          message: validationMessage
        });
      }
    });

    // ==============================================
    // Delete hotel
    // ==============================================
    router.delete('/hotel/:hotelId', (req, res) => {
      if (this.hotelExists(req.params.hotelId)) {
        this.db.get('hotels')
          .remove({ id: req.params.hotelId })
          .write()

        res.json({
          message: 'Hotel deleted successfully'
        })
      } else {
        res.status(400).send({
          message: `The hotel with id ${req.params.hotelId} does not exists`
        });
      }
    });

    // ==============================================
    // Create new hotel
    // ==============================================
    router.put('/hotel/:hotelId', (req, res) => {
      const hotelInfo = req.body;

      const validationMessage = this.isHotelValid(hotelInfo);

      if (this.hotelExists(req.params.hotelId) && validationMessage === '') {
        this.db.get('hotels')
          .find({ id: req.params.hotelId })
          .assign(hotelInfo)
          .write();

        res.json({
          message: 'Great! Hotel updated successfully'
        })
      } else {
        if (validationMessage !== '') {
          res.status(400).send({
            message: validationMessage
          });
        } else {
          res.status(400).send({
            message: `The hotel with id ${req.params.hotelId} does not exists`
          });
        }
      }
    })

    // ==============================================
    // Initialize router for the express application
    // ==============================================
    
    this.express.use('/', router);
  }

  /**
   * Initialize the database with the information in the json file
   */
  private initDatabase() {
    this.db = low(adapter);
  }

  /**
   * Get all Hotels from the database
   */
  private getAllHotels() {
    return this.db
      .get('hotels')
      .value();
  }

  private getHotelsByName(name: string) {
    return this.db
      .get('hotels')
      .filter((hotel) => {

        const hotelName = hotel.name.toLowerCase();
        name = name.toLowerCase();
        return hotelName.includes(name);
      })
      .value();
  }

  private getHotelsByStars(stars: Array<number>) {
    return this.db
      .get('hotels')
      .filter((hotel) => stars.indexOf(hotel.stars) !== -1)
      .value();
  }

  private getStarsFromQueryParam(starsQuery: string): Array<number> {
    const starsNumber = starsQuery.split(',').map((star: string) => {
      return parseInt(star, 10);
    });

    return starsNumber;
  }

  private getHotelsByNameAndStars(name: string, stars: Array<number>) {
    return this.db
      .get('hotels')
      .filter((hotel) => {
        const hotelName = hotel.name.toLowerCase();
        name = name.toLowerCase();
        return hotelName.includes(name) && (stars.indexOf(hotel.stars) !== -1);
      })
      .value();
  }

  private isHotelValid(hotel): string {

    if (!hotel.name || (typeof hotel.name !== 'string')) {
      return 'Check hotel name';
    } else if (!hotel.stars || (typeof hotel.stars !== 'number')) {
      return 'Check hotel stars';
    } else if (!hotel.price || (typeof hotel.price !== 'number')) {
      return 'Check hotel price';
    } else if (!hotel.image || (typeof hotel.image !== 'string')) {
      return 'Check hotel image';
    } else if (!hotel.amenities) {
      return 'Check hotel amenities';
    }

    return '';
  }

  private hotelExists(hotelId: string): boolean {
    const hotelResult = this.db
      .get('hotels')
      .filter((hotel) => hotel.id === hotelId)
      .value()

    if (hotelResult.length > 0) {
      return true;
    }
    return false;
  }
}

export default new App().express
