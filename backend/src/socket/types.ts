
export interface serverToClientEvents {
    // when a new message arrives we'll send the full message document.
    // the client side can define its own interface to match what's received.
    receive_message: (message: any) => void;
    user_typing: (data: { userId: string; groupId: string }) => void;
    user_stop_typing: (data: { userId: string; groupId: string }) => void;
    group_updated: (group: any) => void;
    online_users: (users: string[]) => void;
}

export interface clientToServerEvents {
    join_group: (groupId: string) => void;
    leave_group: (groupId: string) => void;
    send_message: (data: {
        groupId: string;
        content: string;
        type?: string;
    }) => void;
    typing: (groupId: string) => void;
    stop_typing: (groupId: string) => void;
    mark_read: (data: { groupId: string; messageId: string }) => void;
}