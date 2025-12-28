import makeApiRequest from "./api";
const notifications ={
unread: () => makeApiRequest({verb: 'get' , url: '/provider/unreadNotifications'} ),
}
export default notifications;