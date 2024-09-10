import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  activity: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, required: true }
});

export const Activity = mongoose.model('Activity', activitySchema);

