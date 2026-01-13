export type RSVP = {
    id: string
    name: string
    isGoing: boolean
    guests: {
        id: string
        name: string
    }[]
    message: string
    createdAt: Date
}