import mongoose, { Document, Schema } from 'mongoose';

interface IFeature {
  title: string;
  description: string;
  icon: string; // URL ou nome do ícone
}

interface IHomePageContent extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroImage: string; // URL da imagem do herói
  features: IFeature[];
}

const featureSchema = new Schema<IFeature>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

const homePageContentSchema = new Schema<IHomePageContent>({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroButtonText: { type: String, required: true },
  heroImage: { type: String, required: true },
  features: [featureSchema],
});

const HomePageContent = mongoose.model<IHomePageContent>('HomePageContent', homePageContentSchema);

export default HomePageContent;
