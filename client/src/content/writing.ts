import data from "./writing-reviewed.json";
import { WritingSnapshotSchema } from "./contracts";
export const reviewedWriting = WritingSnapshotSchema.parse(data);
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
