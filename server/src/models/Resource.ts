import { Schema, Date, type Document } from "mongoose";

import categorySchema from "./Category.js";
import type { CategoryDocument } from "./Category.js";

export interface ResourceDocument extends Document {
  resourceId: string;
  title: string;
  description: string;
  category: CategoryDocument[];
  url: string;
  createdOn: Date;
}

const resourceSchema = new Schema<ResourceDocument>({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  url: {
    type: String,
  },
  category: categorySchema,
});

export default resourceSchema;
