import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { Playlist } from "./playlist.schema";
import { Content } from "./content.schema";

@Schema({
    timestamps: true
})
export class Screen extends Document {
    // gestito automaticamente da mongoose
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }], default: [] })
    playlist: Playlist[] | string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Background', required: true })
    background: Content | string;
}

export const ScreenSchema = SchemaFactory.createForClass(Screen);

ScreenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
    }
});