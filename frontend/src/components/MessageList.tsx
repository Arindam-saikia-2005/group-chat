interface MessagesType {
    messages:any[]
}

export default function MessageList({messages} :MessagesType) {
    return (
        <div>
           {
            messages.map((msg,i) => (
                <div key={i}>
                  <b>{msg.sender?.name}</b> : {msg.content}
                </div>
            ))
           }
        </div>
    )
}