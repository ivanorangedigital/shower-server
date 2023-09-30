import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { Content } from "./content.schema";

@Schema({
    timestamps: true
})
export class Playlist extends Document {
    // gestito automaticamente da mongoose
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }], default: [] })
    content: Content[] | string[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);

PlaylistSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
    }
});