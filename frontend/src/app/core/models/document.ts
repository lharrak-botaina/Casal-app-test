export interface _Document {
    _id: string;
    name: string; 
    document : string;
}

export interface DocumentResult {
  totalCount: number;
  documents: _Document[];
}
