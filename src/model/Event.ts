interface Event {
    _id: string;
    title: string;
    description: string;
    receivers: string;
    type: 'Public' | 'Private' | 'Holiday';
    start: Date;
    end: Date;
}

export default Event