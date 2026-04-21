import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const { projectId, dataset } = client.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
