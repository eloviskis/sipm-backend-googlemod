import { Schema, model } from 'mongoose';

const HomePageContentSchema = new Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroButtonText: { type: String, required: true },
  features: [{ title: String, description: String, icon: String }],
});

const HomePageContent = model('HomePageContent', HomePageContentSchema);

export default HomePageContent;
