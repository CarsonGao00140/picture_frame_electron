interface Metadata {
    takenAt: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    camera: {
        make: string;
        model: string;
    };
}
