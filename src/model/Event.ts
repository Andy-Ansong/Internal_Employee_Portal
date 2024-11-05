interface Event {
    _id: string;
    title: string;
    description: string;
    receivers: string;
    type: 'Public' | 'Private' | 'Holiday';
    start: Date;
    end: Date;
    createdBy?: {
        userId?: string,
        email?: string
    }
}

export default Event