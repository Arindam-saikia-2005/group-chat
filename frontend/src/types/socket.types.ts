export interface ServerToClientEvents {
    receive_message:(message:any) => void;
    user_typing:(data: {userId:string; groupId:string}) => void;
    user_stop_typing:(data:{userId:string;groupId:string}) => void;
    group_updated:(group:any) => void;
    online_users:(users:string[]) => void;
}

export interface ClientToServerEvents {
    join_group:(groupId:string) => void;
    leave_group:(groupId:string) => void;
    send_message:(data:{
        content:string;
        groupId:string;
        type?:string
    })=> void;
    typing:(groupId:string) => void;
    stop_typing:(groupId:string) => void;
    mark_read:(data:{groupId:string,messageId:string})=> void;
}