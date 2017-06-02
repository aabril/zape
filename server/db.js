import mongoose from 'mongoose'
import nconf from 'nconf'
mongoose.connect(nconf.get('MONGO_URI'));