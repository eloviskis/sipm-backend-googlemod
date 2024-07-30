import mongoose, { Document, Schema } from 'mongoose';

interface IPermission extends Document {
  name: string;
  description: string;
}

const PermissionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export default mongoose.model<IPermission>('Permission', PermissionSchema);
