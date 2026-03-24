export interface ServerToClientEvents {
    receive_message:(message:any) => void;
    user_typing:(data: {userId:string; username:string,groupId:string}) => void;
    user_stop_typing:(data:{userId:string;groupId:string}) => void;
    group_updated:(group:any) => void;
    online_users:(users:string[]) => void;
     message_deleted:(data:{messageId:string;groupId:string}) => void;
}

export interface ClientToServerEvents {
    join_group:(groupId:string) => void;
    leave_group:(groupId:string) => void;
    send_message:(data:{
        content:string;
        groupId:string;
        type?:string
    })=> void;
    typing:(groupId:string,username:string) => void;
    stop_typing:(groupId:string) => void;
    mark_read:(data:{groupId:string,messageId:string})=> void;
     delete_message:(data:{messageId:string; groupId:string}) => void;
    request_online_users: () => void;
}