// alert.model.ts
export interface Alert {
  id: number;
  name: string;
  description: string;
  dates: {
    start: Date;
    end: Date;
  };
  location: string;
}
