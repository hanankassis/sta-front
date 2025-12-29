import makeApiRequest from "./api";
const notifications ={
list: () => makeApiRequest({verb: 'get' , url: '/provider/notifications/'} ),
unreadCount: () => makeApiRequest({verb: 'get' , url: '/provider/notifications/unread-count'} ),
markAsRead: () => makeApiRequest({verb: 'patch' , url: '/provider/notifications/mark-as-read'} ),
}
export default notifications;