import moment from "moment"


export const prepareEvents = (events = []) => {

    return events.map(
        (e) => ({ 
            ...e,  
            start: moment(e.start).toDate(),
            end: moment(e.end).toDate(),
            user: {
                name: e.user.nombre,
                _id: e.user._id
            }
        })
    )
    
}
