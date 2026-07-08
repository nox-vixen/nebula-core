import { NebulaSearchResult } from "../media";

export interface NebulaHomeSection {
  title: string;
  type: string;
  items: NebulaSearchResult[];
}

export interface NebulaHome {
  provider: string;
  banner: NebulaSearchResult[];
  sections: NebulaHomeSection[];
}
