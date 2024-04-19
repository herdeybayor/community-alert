interface ILocation {
    latitude: number;
    longitude: number;
}

interface IFeed {
    id: string;
    title: string;
    description: string;
    category: string;
    location?: ILocation | null;
    image_url?: string;
    user_ref: string;
    created_at?: Date;
    updated_at?: Date;
}
