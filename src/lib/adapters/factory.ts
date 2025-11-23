import { DealSource } from "@/types";
import { MockAdapter } from "./mock";

export class AdapterFactory {
    static getAdapters(): DealSource[] {
        // In the future, we can conditionally return adapters based on env vars or query
        return [new MockAdapter()];
    }
}
