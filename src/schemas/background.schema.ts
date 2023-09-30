import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Background extends Document {
    // gestito automaticamente da mongoose
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: string;

    @Prop({ type: String, required: true })
    name: string;
}

export const BackgroundSchema = SchemaFactory.createForClass(Background);

BackgroundSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
    }
});