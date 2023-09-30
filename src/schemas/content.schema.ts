import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Content extends Document {
    // gestito automaticamente da mongoose
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: string;

    @Prop({ required: true })
    name: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

ContentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
    }
});